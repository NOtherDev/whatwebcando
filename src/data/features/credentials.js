import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'credentials',
  name: 'Credentials',
  description: [
    `The <b>Credential Management API</b> allows authorized Web applications to store and request user credentials (like login and password
        or federated login data) programmatically on behalf of the user. The API offers a replacement for browser built-in or 3rd-party password stores
        which allows the Web application to instrument when and how the credentials are stored and read, for example to offer automatic sign-in capability.`,
    `When retrieving the previously stored credential, the Web application may decide if the user mediation is expected. When <code>mediation</code>
       flag is set to <code>silent</code>, the credential will only be resolved if the user had previously stored the single credential for this application.
       With <code>optional</code> option set, the UI to choose the credential will appear unless there's a single credential stored. Finally, with
       <code>required</code> option, the UI will always be shown, regardless of the previously stored credentials existence.`,
    `As of early 2020, there is also a proposal for the API to address delivering one-time passwords to be used in multiple factor authentication schemes. 
      The earlier version of this API addition was experimentally implemented in Chrome 78-80 for Android within <code>navigator.sms</code> interface.
      The API relies on the specific message content convention – the message is expected to contain the requesting app's URL. Right now it only defines SMS as a message transport.`
  ],
  api: `<dl>
        <dt><code>credential = new PasswordCredential(form)</code></dt>
        <dd>Creates the credential object based on the username and password data detected in a HTML <code>&lt;form&gt;</code> element.</dd>
        <dt><code>credential = new PasswordCredential({id, password, name, iconURL})</code></dt>
        <dd>Creates the credential object manually based on the data provided.</dd>
        <dt><code>credential = new FederatedCredential({id, name, iconURL, provider, protocol})</code></dt>
        <dd>Creates the credential object based on the federated login service specified with <code>provider</code> and <code>protocol</code> options.</dd>
        <dt><code>navigator.credentials.store(credential)</code></dt>
        <dd>Stores the credential provided for future access. Returns a <code>Promise</code> resolved when the credential is successfully persisted by the browser.</dd>
        <dt><code>navigator.credentials.get({mediation})</code></dt>
        <dd>Retrieves the previously stored credential from the browser, optionally with user mediation (UI). Returns a <code>Promise</code> resolved with fetched credential or <code>null</code>.</dd>
        <dt><code>navigator.credentials.preventSilentAccess()</code></dt>
        <dd>Ensures the user mediation is required on the next credential access request, effectively "logging out" the user.</dd>
      </dl>

      <p><b>Web OTP API (proposal)</b></p>

      <dl>
        <dt><code>navigator.credentials.get({otp: {transport: ['sms']}})</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the one-time password (code) when the device receives the OTP SMS message containing the requesting URL and the code.</dd>
      </dl>`,
  tests: [
    Feature.asyncRawTest('navigator', 'credentials', () => {
      if (typeof(navigator) === 'undefined' || !navigator.credentials) {
        return Promise.resolve(false)
      }

      return navigator.credentials.get({mediation: 'silent', unmediated: true})
        .then(() => true)
        .catch(() => false)
    }),
    Feature.windowContains('OTPCredential'),
  ],
  caniuse: 'credential-management',
  demo: {
    html: `<div class="columns">
  <div class="column">
    <form id="credential-form" onsubmit="storeCredential(event)">
      <h2>Credentials Management API</h2>
      <p><b>Store your credentials:</b></p>
      <p>
        <label>login: <input type="text" name="username" required autocomplete="username"></label>
        <label>password: <input type="password" name="password" required autocomplete="current-password"></label>
      </p>
      <p><button type="submit">Store credential</button></p>
    
      <p class="user-mediation">
        <b>User mediation:</b><br/>
        <label><input type="radio" name="mediation" value="silent"> silent</label>
        <label><input type="radio" name="mediation" value="optional" checked> optional</label>
        <label><input type="radio" name="mediation" value="required"> required</label>
      </p>
      <p><button type="button" onclick="requestCredential()">Request credential</button></p>
      <p><button type="button" onclick="preventSilentAccess()">Prevent silent access (logout)</button></p>
      
      <hr>
      
      <h2>Web OTP API</h2>
      <p><button type="button" onclick="waitForSms()">Wait for OTP SMS</button></p>
    </form>
  </div>
  <div class="column" id="result"></div>
</div>`,
    js: `function storeCredential() {
  event.preventDefault();

  if (!navigator.credentials) {
    alert('Credential Management API not supported');
    return;
  }
  
  let credentialForm = document.getElementById('credential-form');
  let credential = new PasswordCredential(credentialForm);
  navigator.credentials.store(credential)
    .then(() => log('Storing credential for <b>' + credential.id + '</b> (result cannot be checked by the website).'))
    .catch((err) => log('Error storing credentials: ' + err));
}

function requestCredential() {
  if (!navigator.credentials) {
    alert('Credential Management API not supported');
    return;
  }
  
  let mediationValue = document.getElementById('credential-form').mediation.value;
  navigator.credentials.get({password: true, mediation: mediationValue})
    .then(credential => {
      let result = 'none';
      if (credential) {
        result = credential.id + ', ' + credential.password.replace(/./g, '*');
      }
      log('Credential read: <b>' + result + '</b>');
    })
    .catch((err) => log('Error reading credentials: ' + err));
}

function preventSilentAccess() {
  if (!navigator.credentials) {
    alert('Credential Management API not supported');
    return;
  }
  
  navigator.credentials.preventSilentAccess()
    .then(() => log('Silent access prevented (mediation will be required for next credentials.get() call).'))
    .catch((err) => log('Error preventing silent access: ' + err));
}

function waitForSms() {
  if ('OTPCredential' in window) {
    log('Waiting for SMS. Try sending yourself a following message:\\n\\n' +
        '<pre>Your verification code is: 123ABC\\n\\n<br>' +
        '@whatwebcando.today #123ABC</pre>');
  
    navigator.credentials.get({otp: {transport: ['sms']}})
      .then((code) => log('Code received: ' + code))
      .catch((error) => log('SMS receiving error: ' + error));
  } else {
    alert('Web OTP API not supported');
  }
}

function log(info) {
  var logTarget = document.getElementById('result');
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newInfo = document.createElement('p');
  newInfo.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + info;
  logTarget.appendChild(newInfo);
}`,
    cssHidden: `.column {
  flex: 1 1;
}
.user-mediation label {
  margin-right: 1em;
}`
  },
  links: [
    {url: 'https://w3c.github.io/webappsec-credential-management/', title: 'Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2016/04/credential-management-api',
      title: 'Google Developers: Streamlining the Sign-in Flow Using Credential Management API'
    },
    {
      url: 'https://medium.com/dev-channel/sign-in-on-the-web-credential-management-api-and-best-practices-d21aed14b6fe',
      title: 'Sign-in on the Web — Credential Management API and Best Practices'
    },
    {url: 'https://polykart-credential-payment.appspot.com/', title: 'Auto sign-in demo'},
    {url: 'https://wicg.github.io/WebOTP/', title: 'Web OTP proposal Specification Draft'},
  ]
})
