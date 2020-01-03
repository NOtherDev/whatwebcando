import * as sapper from '@sapper/app';

sapper.start({
  target: document.querySelector('#sapper')
});

const googleAnalytics = (gaID) => {
  window.dataLayer = window.dataLayer || []

  function gtag() {
    dataLayer.push(arguments)
  }

  gtag('js', new Date())

  window.gaPageView = function (path) {
    gtag('config', gaID, {
      'page_path': path,
      'anonymize_ip': true,
    })
  }

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaID}`
  document.body.appendChild(script)
}

googleAnalytics('UA-69397212-1')
