import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'shape-detection',
  name: 'Shape Detection',
  description: [
    `The <b>Shape Detection API</b> is a set of services exposing image processing like OCR (text detection), barcode/QR scanning or face detection
      capabilities of the underlying system to the Web applications. The availability and quality of the detection varies on the OS & hardware – 
      the API exposes those services as-is.`,
    `The API as of Spring 2020 is at the early experimentation phase. Barcode scanning is available only in Google Chrome 83+. OCR and face detection 
      is available only in Google Chrome via "Experimental Web Platform Features" flag.`,
  ],
  api: `<p><b>Text Detection API</b></p>
    <dl>
      <dt><code>const textDetector = new TextDetector()</code></dt>
      <dd>Instantiates the new <code>TextDetector</code>, exposing OCR processing.</dd>
      <dt><code>const texts = await textDetector.detect(image)</code></dt>
      <dd>Returns a <code>Promise</code> resolved with text fragments metadata detected within <code>image</code> provided.</dd>
    </dl>
    <p><b>Barcode Detection API</b></p>
    <dl>
      <dt><code>const barcodeDetector = new BarcodeDetector({formats})</code></dt>
      <dd>Instantiates the new <code>BarcodeDetector</code>, exposing barcode reader expecting to read <code>formats</code> specified.</dd>
      <dt><code>BarcodeDetector.getSupportedFormats()</code></dt>
      <dd>Returns a <code>Promise</code> resolved with a list of barcode formats supported by the underlying system.</dd>
      <dt><code>const barcodes = await barcodeDetector.detect(image)</code></dt>
      <dd>Returns a <code>Promise</code> resolved with barcodes metadata detected within <code>image</code> provided.</dd>
    </dl>
    <p><b>Face Detection API</b></p>
    <dl>
      <dt><code>const faceDetector = new FaceDetector({maxDetectedFaces, fastMode})</code></dt>
      <dd>Instantiates the new <code>FaceDetector</code>, exposing face detection service.</dd>
      <dt><code>const faces = await faceDetector.detect(image)</code></dt>
      <dd>Returns a <code>Promise</code> resolved with faces metadata detected within <code>image</code> provided.</dd>
    </dl>`,
  demo: {
    html: `<p>Upload an image: <input type="file" id="file" accept="image/*" /></p>
<div>
  <button onclick="detectText()">Detect Text</button>
  <button onclick="detectBarcode()">Detect Barcode</button>
  <button onclick="detectFace()">Detect Face</button>
</div>
<div id="target"></div>`,
    js: `function writeLog(message) { 
  const newState = document.createElement('p');
  newState.innerHTML = message;
  document.getElementById('target').appendChild(newState);
}

function detectText() {
  if (!('TextDetector' in window)) {
    alert('TextDetector is not available');
    return;
  }
  
  const file = document.getElementById('file').files[0]
  if (!file) {
    alert('No image - upload a file first.');
    return;
  }
  
  document.getElementById('target').innerHTML = '';
  const detector = new TextDetector();
  
  createImageBitmap(file)
    .then((image) => detector.detect(image))
    .then((results) => {
      if (results.length) {
        results.forEach((result) => {
          writeLog(\`Detected text "<b>\${result.rawValue}</b>" at (\${Math.round(result.boundingBox.x)},\${Math.round(result.boundingBox.y)})\`);
        })
      } else {
        writeLog('No texts detected.');
      }
    })
    .catch((err) => writeLog('Text detection error: ' + err));
}

function detectBarcode() {
  if (!('BarcodeDetector' in window)) {
    alert('BarcodeDetector is not available');
    return;
  }
  
  const file = document.getElementById('file').files[0]
  if (!file) {
    alert('No image - upload a file first.');
    return;
  }
  
  document.getElementById('target').innerHTML = '';
  const detector = new BarcodeDetector();
  
  createImageBitmap(file)
    .then((image) => detector.detect(image))
    .then((results) => {
      if (results.length) {
        results.forEach((result) => {
          writeLog(\`Detected text "<b>\${result.rawValue}</b>" at (\${Math.round(result.boundingBox.x)},\${Math.round(result.boundingBox.y)})\`);
        })
      } else {
        writeLog('No barcodes detected.');
      }
    })
    .catch((err) => writeLog('Barcode detection error: ' + err));
}

function detectFace() {
  if (!('FaceDetector' in window)) {
    alert('FaceDetector is not available');
    return;
  }
  
  const file = document.getElementById('file').files[0]
  if (!file) {
    alert('No image - upload a file first.');
    return;
  }
  
  document.getElementById('target').innerHTML = '';
  const detector = new FaceDetector();
  
  createImageBitmap(file)
    .then((image) => detector.detect(image))
    .then((results) => {
      if (results.length) {
        results.forEach((result) => {
          writeLog(\`Detected face with <b>\${result.landmarks.map((l) => l.type).join()}</b> at (\${Math.round(result.boundingBox.x)},\${Math.round(result.boundingBox.y)})\`);
        })
      } else {
        writeLog('No faces detected.');
      }
    })
    .catch((err) => writeLog('Face detection error: ' + err));
}`,
  },
  tests: [
    Feature.windowContains('TextDetector'),
    Feature.windowContains('BarcodeDetector'),
    Feature.windowContains('FaceDetector'),
  ],
  links: [
    {url: 'https://wicg.github.io/shape-detection-api/', title: 'Specification Draft'},
    {
      url: 'https://web.dev/shape-detection/',
      title: 'The Shape Detection API: a picture is worth a thousand words, faces, and barcodes'
    },
  ]
})
