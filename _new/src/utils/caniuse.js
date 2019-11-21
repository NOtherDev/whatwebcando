import memoize from 'memoize.js'
import compareVersions from 'compare-versions'
import Chartist from 'chartist'
import 'chartist/dist/chartist.css'
// import 'chartist-plugin-axistitle'
// import 'chartist-plugin-tooltip'

const OTHERS_KEY = 'Others';
const MIN_USAGE_THRESHOLD = 2.0;

/* eslint-disable camelcase */
const BROWSERS = {
  ie: 'Internet Explorer',
  ios_saf: 'Safari (iOS)',
  op_mini: 'Opera Mini',
  and_chr: 'Chrome (Android)',
  and_uc: 'UC Browser (Android)'
};

/* eslint-enable camelcase */

function handleFetchErrors(response) {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

let capitalizeFirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);
let sum = arr => arr.reduce((x, y) => (x || 0) + (y || 0));

class CaniuseReport {
  constructor(feature, supportData, browserUsage) {
    this.$browserUsage = browserUsage;

    this.feature = feature;

    let allBrowsers = this.$compileBrowserReports(supportData);
    this.browsers = [...this.$rollupRarelyUsedBrowsers(allBrowsers)].reverse();
  }

  $compileBrowserReports(supportData) {
    let browserStats = (supportData || {}).stats;
    return Object.keys(browserStats)
      .map(browserKey => this.$getBrowserReport(browserKey, browserStats[browserKey], this.$browserUsage.usageOf(browserKey)));
  }

  $rollupRarelyUsedBrowsers(browsers) {
    let rollup = {
      browserName: OTHERS_KEY,
      noSupport: {share: 0},
      partialSupport: {share: 0},
      hasSupport: {share: 0}
    };

    let result = [];

    for (let report of browsers) {
      if (this.$browserUsage.isAboveThreshold(report.browserKey)) {
        result.push(report);
      } else {
        rollup.noSupport.share += report.noSupport.share || 0;
        rollup.partialSupport.share += report.partialSupport.share || 0;
        rollup.hasSupport.share += report.hasSupport.share || 0;
      }
    }

    result.push(rollup);
    return result;
  }

  static $normalizeSupportFlag(key) {
    return ['n', 'y'].indexOf(key) !== -1 ? key : 'p';
  }

  $getBrowserReport(browserKey, browserVersions, versionsUsage) {
    let info = {};

    // workaround for https://github.com/Fyrd/caniuse/issues/1939
    let useSingleVersionWorkaround = Object.keys(browserVersions).length === 1;

    for (let version of Object.keys(browserVersions)) {
      let flag = CaniuseReport.$normalizeSupportFlag(browserVersions[version]);

      // collect total share values
      info[flag] = info[flag] || {min: version, max: version, share: 0};
      info[flag].share += versionsUsage[version] || (useSingleVersionWorkaround && versionsUsage['0']) || 0;

      // find min and max version with given support flag
      if (compareVersions(info[flag].min, version) === 1) {
        info[flag].min = version;
      } else if (compareVersions(info[flag].max, version) === -1) {
        info[flag].max = version;
      }
    }

    return {
      browserKey,
      browserName: BROWSERS[browserKey] || capitalizeFirst(browserKey),
      noSupport: info.n || {},
      partialSupport: info.p || {},
      hasSupport: info.y || {}
    };
  }

  static $seriesValue(label, supportData) {
    let series = {value: 0, meta: label};

    if (supportData) {
      if (supportData.share) {
        series.value += supportData.share;
      }
      if (supportData.min && supportData.max) {
        if (supportData.min === supportData.max) {
          series.meta += ` in version ${supportData.min}`;
        } else {
          series.meta += ` in versions ${supportData.min} - ${supportData.max}`;
        }
      }
    }

    return series;
  }

  $initBrowsersChart(selector) {
    let chartData = {
      labels: this.browsers.map(browserInfo => browserInfo.browserName),
      series: [
        this.browsers.map(browserInfo => CaniuseReport.$seriesValue('No support', browserInfo.noSupport)),
        this.browsers.map(browserInfo => CaniuseReport.$seriesValue('Partial support', browserInfo.partialSupport)),
        this.browsers.map(browserInfo => CaniuseReport.$seriesValue('Supported', browserInfo.hasSupport))
      ]
    };

    let chartOptions = {
      horizontalBars: true,
      stackBars: true,
      plugins: [
        // Chartist.plugins.tooltip({
        //   tooltipFnc: (meta, value) => `${meta}<br/>Market share: ${parseFloat(value).toFixed(2)}%`
        // }),
        // Chartist.plugins.ctAxisTitle({
        //   axisX: {
        //     axisTitle: `Market share (${this.$browserUsage.regionName}, %)`,
        //     offset: {x: 0, y: 30}
        //   }
        // })
      ],
      axisY: {
        showGrid: false
      }
    };

    return new Chartist.Bar(selector, chartData, chartOptions);
  }

  $initOverallChart(selector) {
    let shares = [
      sum(this.browsers.map(b => b.noSupport.share)),
      sum(this.browsers.map(b => b.partialSupport.share)),
      sum(this.browsers.map(b => b.hasSupport.share))
    ];

    let createLabel = (info, share) => share > 0 ? `${info} - ${share.toFixed(2)}%` : '';

    let chartData = {
      series: shares,
      labels: [
        createLabel('No support', shares[0]),
        createLabel('Partial support', shares[1]),
        createLabel('Supported', shares[2])
      ]
    };

    return new Chartist.Pie(selector, chartData, {ignoreEmptyValues: true});
  }

  initVisuals() {
    this.$initBrowsersChart('.browsers-chart');
    this.$initOverallChart('.overall-chart');
  }
}

class CaniuseBrowserUsage {
  constructor(rawData = {}) {
    this.$data = rawData.data || {};
    this.regionName = rawData.name;
  }

  usageOf(browser) {
    return this.$data[browser];
  }

  isAboveThreshold(browser) {
    return sum(Object.values(this.$data[browser])) >= MIN_USAGE_THRESHOLD;
  }
}

const fetchCaniuseBrowserUsage = async () => {
  const locale = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  const [, countryCode] = locale.split('-');
  const jsonCode = countryCode ? countryCode.toUpperCase() : 'alt-ww';

  const result = handleFetchErrors(await fetch(`https://cdn.jsdelivr.net/gh/Fyrd/caniuse/region-usage-json/${jsonCode}.json`))
  return new CaniuseBrowserUsage(await result.json())
}

const usageReport = fetchCaniuseBrowserUsage()

export class CaniuseReportFetch {
  constructor(feature) {
    this.$feature = feature;
  }

  async fetch() {
    try {
      const result = handleFetchErrors(await fetch(`https://cdn.jsdelivr.net/gh/Fyrd/caniuse/features-json/${this.$feature.caniuseKey}.json`))
      return new CaniuseReport(this.$feature.caniuseKey, await result.json(), await usageReport)
    } catch (err) {
      console.warn(err);
      throw err;
    }
  }
}

