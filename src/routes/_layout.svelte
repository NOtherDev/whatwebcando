<script>
  import { stores } from '@sapper/app';

  import Header from '../components/Header.svelte';
  import Loader from '../components/Loader.svelte';
  import Footer from '../components/Footer.svelte';

  export let segment;

  const { page } = stores();

  page.subscribe(async ({ path }) => {
    if (process.browser && window.gaPageView) {
      window.gaPageView(path)
    }

    // detect the pending refresh and fire it on navigation
    if (process.browser && 'serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration && registration.waiting) {
        registration.waiting.postMessage('refresh')
      }
    }
  })
</script>

<style type="text/scss" global>
  :global() {
    body {
      margin: 0;
      font-size: 16px;
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 400;
      background-color: #fff;
      color: #000;

      --primary-color: #104A70;
      --primary-dark-color: #0C3652;
      --inverse-color: #92ACBE;
      --primary-background: #F8F8F8;
      --primary-border: #E9E9E9;
    }

    main, aside {
      position: relative;
      box-sizing: border-box;
    }

    main {
      padding: 1em;
    }

    @media screen and (min-width: 768px) {
      aside {
        padding: 1em;
      }
    }

    .page {
      margin: 0 auto;
      max-width: 85em;

      h2, h3 {
        margin: 1.5em 0 .5em;
      }
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 700;
      margin: 0 0 0.5em 0;
    }

    a:not(.button) {
      color: var(--primary-color);
      text-decoration: none;
    }

    a:not(.button):hover {
      text-decoration: underline;
    }

    p {
      margin: 0 0 .5em;
    }

    figure {
      margin: 0;
    }

    .text-left {
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }

    .pull-left {
      float: left;
    }
    .pull-right {
      float: right;
    }

    .button {
      padding: .5em 3em;
      background: var(--primary-color);
      border-radius: 50px;
      color: #fff;
      text-transform: uppercase;
      text-decoration: none;
      font-weight: bold;
      transition: background-color ease .2s;

      &:hover {
        background: var(--primary-dark-color);
      }
    }

    section {
      clear: both;
    }

    pre {
      border: 1px solid var(--primary-border);
      border-radius: 4px;
    }

    dt, dd {
      line-height: 1.5;
    }

    dt code {
      word-wrap: break-word;
      white-space: pre-wrap;
      display: inline-block;
      width: 100%;
    }

    dt code.token.function {
      display: inline-block;
    }

    dd {
      margin-left: 40px;
    }

    code {
      padding: 2px 4px;
      font-size: 90%;
      color: #c7254e;
      border-radius: 4px;
      overflow-wrap: break-word !important;
    }

    .bg-success {
      background-color: #dff0d8;
    }

    .bg-warning {
      background-color: #fcf8e3;
    }

    .bg-danger {
      background-color: #f2dede;
    }

    .breadcrumb {
      user-select: none;

      ul {
        display: flex;
        padding: 0;
        border-bottom: 1px solid var(--primary-border)
      }

      li {
        align-items: center;
        display: flex;

        a {
          padding: .75em;
        }
      }

      li:first-child a {
        padding-left: 0;
      }

      li + li::before {
        color: var(--primary-color);
        content: "\0002f";
      }

      li.is-active a {
        color: #000;
        cursor: default;
        pointer-events: none;
      }
    }

    #carbonads {
      margin: 1em;
      padding: 1em;
      position: relative;
      border: 1px solid var(--primary-border);
      border-radius: 10px;

      .carbon-wrap {
        display: flex;
        align-items: start;
      }

      .carbon-text {
        margin-left: 1em;
        color: black;
      }

      .carbon-poweredby {
        position: absolute;
        bottom: 1em;
        right: 1em;
        font-size: .6em;
        display: inline-block;
      }
    }

    .mdi:before {
      display: inline-block;
      position: relative;
      top: 1px;
      font: normal normal normal 24px/1 "Material Design Icons";
      font-size: inherit;
      text-rendering: auto;
      line-height: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .mdi-check:before {
      content: "\e8a7";
    }
    .mdi-cross:before {
      content: "\e8aa";
    }

    .mdi-action-3d-rotation:before {
      content: "\e600";
    }
    .mdi-action-alarm:before {
      content: "\e60b";
    }
    .mdi-action-account-box:before {
      content: "\e604";
    }
    .mdi-action-backup:before {
      content: "\e617";
    }
    .mdi-action-explore:before {
      content: "\e628";
    }
    .mdi-action-flip-to-front:before {
      content: "\e630";
    }
    .mdi-action-get-app:before {
      content: "\e631";
    }
    .mdi-action-group-work:before {
      content: "\e633";
    }
    .mdi-action-list:before {
      content: "\e641";
    }
    .mdi-action-lock-open:before {
      content: "\e642";
    }
    .mdi-action-lock:before {
      content: "\e644";
    }
    .mdi-action-lock-open:before {
      content: "\e642";
    }
    .mdi-action-payment:before {
      content: "\e64c";
    }
    .mdi-action-settings-applications:before {
      content: "\e662";
    }
    .mdi-device-serial:before {
      content: "\e669";
    }
    .mdi-action-settings-overscan:before {
      content: "\e66d";
    }
    .mdi-action-settings-phone:before {
      content: "\e66e";
    }
    .mdi-av-mic:before {
      content: "\e6b1";
    }
    .mdi-av-videocam:before {
      content: "\e6d1";
    }
    .mdi-communication-message:before {
      content: "\e6ee";
    }
    .mdi-content-content-paste:before {
      content: "\e708";
    }
    .mdi-content-gesture:before {
      content: "\e70e";
    }
    .mdi-device-battery-80:before {
      content: "\e72a";
    }
    .mdi-device-bluetooth:before {
      content: "\e73a";
    }
    .mdi-device-brightness-low:before {
      content: "\e73d";
    }
    .mdi-device-gps-fixed:before {
      content: "\e743";
    }
    .mdi-device-nfc:before {
      content: "\e74b";
    }
    .mdi-device-screen-lock-rotation:before {
      content: "\e750";
    }
    .mdi-device-screen-rotation:before {
      content: "\e751";
    }
    .mdi-device-sd-storage:before {
      content: "\e752";
    }
    .mdi-device-signal-cellular-connected-no-internet-3-bar:before {
      content: "\e75c";
    }
    .mdi-device-usb:before {
      content: "\e773";
    }
    .mdi-device-wifi-tethering:before {
      content: "\e775";
    }
    .mdi-hardware-memory:before {
      content: "\e7d1";
    }
    .mdi-hardware-mouse:before {
      content: "\e7d2";
    }
    .mdi-hardware-tv:before {
      content: "\e7de";
    }
    .mdi-image-camera-alt:before {
      content: "\e7f0";
    }
    .mdi-image-camera-roll:before {
      content: "\e7f3";
    }
    .mdi-image-leak-add:before {
      content: "\e836";
    }
    .mdi-navigation-arrow-back:before {
      content: "\e8a1";
    }
    .mdi-notification-folder-special:before {
      content: "\e8be";
    }
    .mdi-notification-sim-card-alert:before {
      content: "\e8cb";
    }
    .mdi-notification-system-update:before {
      content: "\e8d1";
    }
    .mdi-notification-tap-and-play:before {
      content: "\e8d2";
    }
    .mdi-notification-vibration:before {
      content: "\e8d4";
    }
    .mdi-maps-local-play:before {
      content: "\e88d";
    }
  }

  @import "../charts/charts.scss";
</style>

<Header {segment}/>

<slot></slot>

<Loader/>

<Footer/>
