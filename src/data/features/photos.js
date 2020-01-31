import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'photos',
  name: 'Advanced Camera Controls',
  description: [`The <b>Image Capture API</b> allows Web applications to control the advanced settings of the device's camera, such as zoom, white balance, ISO or focus points and take photos based on these settings. It relies on the <code>streamVideoTrack</code> object that might be obtained from the <code>stream</code> - see <a href="/camera-microphone.html">Audio & Video Capture</a>.`],
  api: `<dl>
        <dt><code>capturer = ImageCapture(streamVideoTrack)</code></dt>
        <dd>Creates an image capturer out of the Media Stream Video Track.</dd>
        <dt><code>capturer.takePhoto()</code></dt>
        <dd>Returns a <code>Promise</code> resolved with the photo taken with the current settings.</dd>
        <dt><code>capturer.setOptions(photoSettings)</code></dt>
        <dd>Configures the <code>photoSettings</code> for subsequent captures; if visible, the effects of the configuration can be seen in the Track used as input.</dd>
      </dl>`,
  tests: [Feature.windowContains('ImageCapture')],
  demo: {
    html: `<p><button onclick="getStream()">Grab video</button></p>
<p><video autoplay style="height: 180px; width: 240px;"></video></p>
<p><button onclick="takePhoto()">Take Photo!</button></p>
<p><img id="imageTag" width="240" height="180"></p>

<p><small>Demo by <a href="http://www.mcasas.tk/" target="_blank" rel="noopener">Miguel Casas-Sanchez</a>.</small></p>`,
    js: `function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {
    video: true
  };

  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    theStream = stream;
  }, function (err) {
    alert('Error: ' + err);
  });
}

function takePhoto() {
  if (!('ImageCapture' in window)) {
    alert('ImageCapture is not available');
    return;
  }
  
  if (!theStream) {
    alert('Grab the video stream first!');
    return;
  }
  
  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer.takePhoto()
    .then(blob => {
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch(err => alert('Error: ' + err));
}`
  },
  // caniuse: 'mdn-api_imagecapture',
  links: [
    {url: 'https://w3c.github.io/mediacapture-image/', title: 'W3C Specification Draft'},
    {
      url: 'https://developers.google.com/web/updates/2016/12/imagecapture',
      title: 'Google Developers: Take Photos and Control Camera Settings'
    },
    {url: 'https://rawgit.com/Miguelao/demos/master/imagecapture.html', title: 'Demo'}
  ]
})
