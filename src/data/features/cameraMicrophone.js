import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'camera-microphone',
  name: 'Audio & Video Capture',
  description: [`The <b>Media Capture API</b> allows authorized Web applications to access the streams from the device's audio and video capturing
        interfaces, i.e. to use the data available from the camera and the microphone. The streams exposed by the API can be bound directly to the HTML
        <code>&lt;audio&gt;</code> or <code>&lt;video&gt;</code> elements or read and manipulated in the code, including further more specific processing via <a href="/photos.html">Image Capture API</a>, <a href="/recording.html">Media Recorder API</a> or <a href="/realtime.html">Real-Time Communication</a>.`,
    `There is also a higher level alternative <a href="http://www.wufoo.com/html5/attributes/20-accept.html">built-in into mobile operating systems</a>
        like iOS and Android that doesn't require any JavaScript API - the basic HTML <code>&lt;input type="file" accept="image/*"&gt;</code> element allows
        launching any application that provides an image file, including camera.`],
  api: `<dl>
        <dt><code>navigator.mediaDevices.getUserMedia(constraints)</code></dt>
        <dd>Prompts user for an access to the media interface specified by the <code>constraints</code>
          and returns a <code>Promise</code> that is resolved with the interface's stream handler.</dd>
        <dt><code>stream.getAudioTracks()</code></dt>
        <dd>Returns a collection of audio tracks objects being provided by the device's microphone.</dd>
        <dt><code>stream.getVideoTracks()</code></dt>
        <dd>Returns a collection of video tracks objects being provided by the device's camera.</dd>
        <dt><code>mediaElement.srcObject = stream</code></dt>
        <dd>Sets a stream to be rendered into the provided <code>&lt;audio&gt;</code> or <code>&lt;video&gt;</code> DOM element.</dd>
      </dl>
      <p>Previous version of the standard, supported with vendor prefixes, contained the callback-based <code>getUserMedia</code> method directly within
      the <code>navigator</code> element:</p>
      <pre><code>navigator.webkitGetUserMedia(constraints, successCallback, errorCallback)</code></pre>`,
  caniuse: 'stream',
  tests: [
    Feature.navigatorContains('mediaDevices'),
    Feature.navigatorContains('getUserMedia'),
  ],
  demo: {
    html: `<div class="columns">
  <div class="column">
    <p><button type="button" onclick="getStream('video')">Grab video</button></p>
    
    <video controls autoplay style="height:180px; width: 240px;"></video>
  </div>
  <div class="column">
    <p><button type="button" onclick="getStream('audio')">Grab audio</button></p>
    
    <audio controls></audio>
  </div>
</div>`,
    js: `function getUserMedia(constraints) {
  // if Promise-based API is available, use it
  if (navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
    
  // otherwise try falling back to old, possibly prefixed API...
  var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
  if (legacyApi) {
    // ...and promisify it
    return new Promise(function (resolve, reject) {
      legacyApi.bind(navigator)(constraints, resolve, reject);
    });
  }
}

function getStream (type) {
  if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = {};
  constraints[type] = true;
  
  getUserMedia(constraints)
    .then(function (stream) {
      var mediaControl = document.querySelector(type);
      
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      
      mediaControl.play();
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });
}`
  },
  links: [
    {url: 'https://w3c.github.io/mediacapture-main/', title: 'Specification Draft'},
    {
      url: 'http://www.html5rocks.com/en/tutorials/getusermedia/intro/',
      title: 'HTML5 Rocks: Capturing Audio & Video in HTML5'
    },
    {
      url: 'http://blogs.windows.com/msedgedev/2015/05/13/announcing-media-capture-functionality-in-microsoft-edge/',
      title: 'Announcing media capture functionality in Microsoft Edge'
    },
    {
      url: 'https://dev.opera.com/blog/webcam-orientation-preview/',
      title: 'Native Webcam Support and Orientation Events — Technology Preview from Opera'
    },
    {
      url: 'http://www.sitepoint.com/face-proximity-detection-with-javascript/',
      title: 'SitePoint: Face Proximity Detection with JavaScript'
    }
  ]
})
