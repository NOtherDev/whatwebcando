import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'contacts',
  name: 'Contacts',
  description: [`The <b>Contacts API</b> gives privileged Web applications a programmatic access to the user's address book maintained in the system.`,
    `The only implementation as of early 2020 is available in Google Chrome 80+. It targets 
         specifically the read-only scenario of picking the contacts to be used within the client application only – no modification is to be supported by the API. 
         It invokes platform-level contact picker and exposes to the querying application only the data selected by the user. It is only available on Android`,
    `The initial version of the API was created for Firefox OS back in 2013 and implemented in Firefox. It allowed reading & modifying the contacts through the vCard-like format.
         It was soon <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=927869" target="_blank" rel="noopener">disabled</a> due to implementation flaws, though.`,
    `Regardless from the programmatic access to the contacts API availability, the Web applications might ask for pre-filling the form data from the device address book with the help of 
         <a href="https://www.w3.org/TR/html51/sec-forms.html#element-attrdef-autocompleteelements-autocomplete" target="_blank" rel="noopener">form elements' <code>autocomplete</code> attribute values</a>.`],
  api: `<p><b>Google Chrome proposal (2018)</b></p>
      <dl>
        <dt><code>navigator.contacts.select(properties, options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the array of contact properties from the address book selected by the user.</dd>
      </dl>
      <p><b>Firefox OS API (2013)</b></p>
      <dl>
        <dt><code>navigator.contacts.find(filterAndSortOptions)</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the array of contacts from the address book according to the criteria specified.</dd>
        <dt><code>navigator.contacts.save(new Contact())</code></dt>
        <dd>Returns a <code>Promise</code> resolved when the newly created contact is inserted into the address book.</dd>
        <dt><code>navigator.contacts.remove(contact)</code></dt>
        <dd>Returns a <code>Promise</code> resolved when the contact is removed from the address book.</dd>
        <dt><code>navigator.contacts.addEventListener('contactschange', listener)</code></dt>
        <dd>An event fired when the address book data has changed, containing all the added, removed and changed contact entries.</dd>
      </dl>`,
  tests: [
    Feature.containedIn('navigator.contacts', typeof(window) !== 'undefined' && window.navigator && window.navigator.contacts, 'select'), // Chrome API
    Feature.containedIn('navigator.contacts', typeof(window) !== 'undefined' && window.navigator && (window.navigator.contacts || window.navigator.mozContacts), 'oncontactschange', false) // Firefox OS API
  ],
  demo: {
    html: `<p>
  <button onclick="readContacts()">Read Contacts</button>
</p>

<pre id="log"></pre>
`,
    js: `function readContacts() {
  var api = (navigator.contacts || navigator.mozContacts);
    
  if (api && !!api.select) { // new Chrome API
    api.select(['name', 'email'], {multiple: true})
      .then(function (contacts) {
        consoleLog('Found ' + contacts.length + ' contacts.');
        if (contacts.length) {
          consoleLog('First contact: ' + contacts[0].name + ' (' + contacts[0].email + ')');
        }
      })
      .catch(function (err) {
        consoleLog('Fetching contacts failed: ' + err.name);
      });
      
  } else if (api && !!api.find) { // old Firefox OS API
    var criteria = {
      sortBy: 'familyName',
      sortOrder: 'ascending'
    };

    api.find(criteria)
      .then(function (contacts) {
        consoleLog('Found ' + contacts.length + ' contacts.');
        if (contacts.length) {
          consoleLog('First contact: ' + contacts[0].givenName[0] + ' ' + contacts[0].familyName[0]);
        }
      })
      .catch(function (err) {
        consoleLog('Fetching contacts failed: ' + err.name);
      });
      
  } else {
    consoleLog('Contacts API not supported.');
  }
}

function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += data + '\\n';
}`
  },
  links: [
    {url: 'https://web.dev/contact-picker/', title: 'A contact picker for the web'},
    {url: 'https://wicg.github.io/contact-api/spec/', title: 'Unofficial Specification Proposal Draft'},
    {
      url: 'https://cloudfour.com/thinks/autofill-what-web-devs-should-know-but-dont/',
      title: 'Article about auto-fill attribute values support'
    },
    {url: 'https://www.w3.org/TR/contacts-manager-api/', title: 'Specification Draft (pre-2015)'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Contacts_API',
      title: 'MDN: Contacts API (Firefox OS version)'
    }
  ]
})
