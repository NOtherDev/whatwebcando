import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'payments',
  name: 'Payments',
  description: [`The <b>Payment Request API</b> allows Web applications to delegate the payment checkout process to the operating system, allowing
      it to use whatever methods and payment providers are natively available for the platform and configured for the user. This approach takes away the burden of handling
      complex checkout flows at the application side, reduces the scope of the payment provider integration and ensures better familiarity for the user.`,
    `With <code>supportedMethods</code> parameter the API allows the Web application to select the supported payment methods - for example only to allow credit card payments or
      payments processed by a specific 3rd-party provider - as well as configure its parameters. Methods are specified by the predefined identifier or by
      the 3rd-party URL. Note that the behaviors of the payment methods might vary. For example, the <code>basic-card</code> predefined provider does not
      process any actual payments - its role is reduced to collecting the credit card details and returning it to the requesting Web application. 
      Although 3rd-party providers might as well proceed with the actual money transfer as a part of the flow.`,
    `With <code>details</code> parameter the Web application should specify the total amount and currency of the payment. It also allows setting up
      the order summary information including the subtotals, order items and shipping options.`,
    `With <code>options</code> parameter the Web application might specify what kind of customer data it requires to be able to fulfill the request.
      It may require a shipping address (<code>requestShipping</code>), email (<code>requestPayerEmail</code>), phone (<code>requestPayerPhone</code>) 
      or name (<code>requestPayerName</code>).`,
    `The only payment method available on iOS devices is <a href="https://www.apple.com/apple-pay/" target="_blank" rel="noopener">Apple Pay</a> and it is only functional on devices with fingerprint authentication (Touch ID). It is accessible both via the standard Payment Request API described here as well as the older proprietary non-standard <code>ApplePaySession</code> API. The <code>basic-card</code> payments are not supported.`],
  api: `<dl>
        <dt><code>paymentRequest = new PaymentRequest(paymentMethods, details, options)</code></dt>
        <dd>Creates a payment request object with the requested amounts, currencies and methods configured.</dd>
        <dt><code>paymentRequest.canMakePayment()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the value indicating if it is possible to conduct a payment using any of the <code>paymentMethods</code> specified.</dd>
        <dt><code>paymentRequest.show()</code></dt>
        <dd>Presents the checkout confirmation UI to the user or redirects to the system-defined application that accepts payments by a method selected.
          Returns a <code>Promise</code> resolved with the <code>response</code> object when the payment is successfully confirmed by the payment provider.
          Note that it may or may not already denote the money being transferred - it depends on the selected payment method implementation.</dd>
        <dt><code>request.addEventListener('shippingaddresschange', listener)</code></dt>
        <dd>An event fired when the user changes the shipping address data, allowing updating the request's <code>details</code> using <code>event.updateWith()</code> method.</dd>
        <dt><code>request.addEventListener('shippingoptionchange', listener)</code></dt>
        <dd>An event fired when the user changes the shipping options (delivery vs. pickup etc.), allowing updating the request's <code>details</code> using <code>event.updateWith()</code> method.</dd>
        <dt><code>event.updateWith(promise)</code></dt>
        <dd>Waits for a <code>promise</code> to resolve with the new payment details and puts it into the request's <code>details</code>.</dd>
        <dt><code>response.toJSON()</code></dt>
        <dd>A convenience method that serializes the payment response (including the requested payment details and the data returned by the provider) into JSON intended to be sent to server-side for order processing.</dd>
        <dt><code>response.complete(result)</code></dt>
        <dd>Signals the browser that the app-specific steps of payment processing (like sending the order data to the server-side) has completed. Returns a <code>Promise</code> resolved when the Payment Request UI is cleared.</dd>
      </dl>`,
  tests: [
    Feature.windowContains('PaymentRequest'),
    Feature.windowContains('ApplePaySession', false)
  ],
  caniuse: 'payment-request',
  demo: {
    html: `<p><button onclick="donate()">Donate 10€ to What Web Can Do 😉</button> (demo only, no actual payment is processed)</p>

<p id="log"></p>

<p><small>Demo based on <a href="https://googlechrome.github.io/samples/paymentrequest/credit-cards/">Google Chrome GitHub repository</a>.</small></p>`,
    js: `/**
 * Builds PaymentRequest for credit cards, but does not show any UI yet.
 */
function initPaymentRequest() {
  let networks = ['amex', 'jcb', 'visa', 'maestro', 'mastercard'];
  
  let supportedInstruments = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: networks, 
      supportedTypes: ['debit', 'credit', 'prepaid']
    }
  }, {
    supportedMethods: 'https://apple.com/apple-pay',
    data: {
        version: 2,
        supportedNetworks: networks,
        countryCode: 'US',
        merchantIdentifier: 'whatwebcando.today.sample',
        merchantCapabilities: ['supportsDebit', 'supportsCredit', 'supports3DS']
    }
  }];

  let details = {
    total: {label: 'Donation', amount: {currency: 'EUR', value: '10.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'EUR', value: '15.00'}
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'EUR', value: '-5.00'}
      }
    ]
  };

  return new PaymentRequest(supportedInstruments, details);
}

/**
 * Invokes PaymentRequest for credit cards.
 */
function onBuyClicked(request) {
  request.show()
    .then(instrumentResponse => sendPaymentToServer(instrumentResponse))
    .catch(err => document.getElementById('log').innerText = err);
}

/**
 * Simulates processing the payment data on the server.
 */
function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  
  window.setTimeout(function () {
    instrumentResponse.complete('success')
        .then(() => document.getElementById('log').innerHTML = resultToTable(instrumentResponse))
        .catch(err => document.getElementById('log').innerText = err);
  }, 2000);
}

/**
 * Converts the payment instrument into a JSON string.
 */
function resultToTable(result) {
  return '<table class="table table-striped">' +
    '<tr><td>Method name</td><td>' + result.methodName + '</td></tr>' +
    '<tr><td>Billing address</td><td>' + (result.details.billingAddress || {}).addressLine + ', ' + (result.details.billingAddress || {}).city + '</td></tr>' +
    '<tr><td>Card number</td><td>' + result.details.cardNumber + '</td></tr>' +
    '<tr><td>Security code</td><td>' + result.details.cardSecurityCode + '</td></tr>' +
    '<tr><td>Cardholder name</td><td>' + result.details.cardholderName + '</td></tr>' +
    '<tr><td>Expiry date</td><td>' + result.details.expiryMonth + '/' + result.details.expiryYear + '</td></tr>' +
    '</table>';
}

function donate() {
  if (!window.PaymentRequest) {
    alert('This browser does not support Web Payments API');
    return;
  }
    
  let request = initPaymentRequest();
  onBuyClicked(request);
}`
  },
  links: [
    {url: 'https://www.w3.org/TR/payment-request/', title: 'Specification'},
    {
      url: 'https://developers.google.com/web/fundamentals/payments/',
      title: 'Google Developers: Introducing the Payment Request API'
    },
    {
      url: 'https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request',
      title: 'Google Developers: Deep Dive into the Payment Request API'
    }
  ]
})
