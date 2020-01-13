import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'recording',
  name: 'Recording Media',
  description: [`The <b>Media Recorder API</b> is a Web API allowing Web applications to record audio and video Media Streams, local and/or remote. It relies on the <code>mediaStream</code> object - see <a href="/camera-microphone.html">Audio & Video Capture</a>.`],
  api: `<dl>
        <dt><code>recorder = new MediaRecorder(mediaStream, options)</code></dt>
        <dd>Creates a media recorder out of a Media Stream. <code>options</code> selects e.g. the intended <code>MIME type</code> and/or the target bitrates.</dd>
        <dt><code>MediaRecorder.isMimeTypeSupported(mimeType)</code></dt>
        <dd>Static function checking if <code>mimeType</code> is, in principle, supported for recording.</dd>
        <dt><code>recorder.start(interval)</code></dt>
        <dd>Starts recording data, producing it as chunks in <code>ondataavailable</code>'s <code>event.data</code>, every <code>interval</code> ms, if explicited.</dd>
      </dl>`,
  tests: [Feature.windowContains('MediaRecorder')],
  caniuse: 'mediarecorder',
  demo: {
    html: `<video autoplay style="height:180px; width: 240px;" poster="https://image.freepik.com/free-icon/video-camera-symbol_318-40225.png"></video>
<p><button onclick="getStream()">Grab video & start recording</button></p>
<p><button onclick="download()">Download!</button></p>
  
<p><small>Demo by <a href="http://www.mcasas.tk/" target="_blank">Miguel Casas-Sanchez</a>.</small></p>`,
    cssHidden: `video {
  background-color: #fff;
}`,
    js: `function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;
var theRecorder;
var recordedChunks = [];

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {video: true, audio: true};
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
    try {
      recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    } catch (e) {
      console.error('Exception while creating MediaRecorder: ' + e);
      return;
    }
    theRecorder = recorder;
    console.log('MediaRecorder created');
    recorder.ondataavailable = recorderOnDataAvailable;
    recorder.start(100);
  }, function (err) {
    alert('Error: ' + err);
  });
}

function recorderOnDataAvailable(event) {
  if (event.data.size == 0) return;
  recordedChunks.push(event.data);
}

function download() {
  console.log('Saving data');
  theRecorder.stop();
  theStream.getTracks()[0].stop();

  var blob = new Blob(recordedChunks, {type: "video/webm"});
  var url = (window.URL || window.webkitURL).createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = 'test.webm';
  a.click();
  
  // setTimeout() here is needed for Firefox.
  setTimeout(function () {
      (window.URL || window.webkitURL).revokeObjectURL(url);
  }, 100); 
}`
  },
  links: [
    {url: 'https://w3c.github.io/mediacapture-record/MediaRecorder.html', title: 'Specification Draft'},
    {url: 'https://webrtc.github.io/samples/src/content/getusermedia/record/', title: 'Demo recording local data'}
  ]
})
