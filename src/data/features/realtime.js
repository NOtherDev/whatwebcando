import {Feature} from "../../utils/feature";

export default  new Feature({
  id: 'realtime',
  name: 'Real-Time Communication',
  description: [`Real-Time Communication in the Web, <b>WebRTC</b> in short, is a set of APIs allowing Web applications to send and receive streaming real-time video, audio and data to/from remote peers, without relying it through the centralized server. The server, implementing one of the specific signalling protocols, is needed for initial discovery and connection handshake, though. The APIs rely on the <code>mediaStream</code> object - see <a href="/camera-microphone.html">Audio & Video Capture</a>.`],
  api: `<dl>
        <dt><code>connection = new RTCPeerConnection(configuration)</code></dt>
        <dd>Creates a connection object that will be used to establish serverless connection between peers. The <code>configuration</code> may include the set of <code>iceServers</code> that will be used for discovery and connection handshake.</dd>
        <dt><code>connection.addEventListener('icecandidate', listener)</code></dt>
        <dd>An event fired when the signalling server registers a remote peer with which the connection may be established.</dd>
        <dt><code>connection.addStream(localMediaStream)</code></dt>
        <dd>Adds an existing local Media Stream (e.g. the local Web cam) to the remote peer connection.</dd>
        <dt><code>connection.onaddstream = event => video.src = URL.createObjectURL(event.stream)</code></dt>
        <dd>Registers an <code>onaddstream</code> event handler that, if and when called, retrieves the remote party's Media Stream and plugs it into a &lt;video> tag <code>video</code>.</dd>
        <dt><code>connection.createOffer(options)</code></dt>
        <dd>Returns a <code>Promise</code> resolved when the remote peer connects to the connections and streams offered.</dd>
        <dt><code>connection.createAnswer(options)</code></dt>
        <dd>Accepts the connection offerred by the remote peer. Returns a <code>Promise</code> resolved when the connection is established.</dd>
        <dt><code>dataChannel = connection.createDataChannel(label, configuration)</code></dt>
        <dd>Opens a data channel for the connection, allowing it to transmit arbitrary types of data.</dd>
        <dt><code>dataChannel.send(data)</code>
        <dd>Sends the data over the data channel to the remote peer.</dd>
        <dt><code>dataChannel.addEventListener('message', listener)</code></dt>
        <dd>An event fired when the data has been received via the data channel.</dd>
      </dl>`,
  tests: [Feature.windowContains('RTCPeerConnection')],
  caniuse: 'rtcpeerconnection',
  demo: {
    html: `
<p><button onclick="getStream()">Grab video & start local peer connection</button></p>

<p>Local video</p>
<video autoplay id="localVideo" style="height:180px; width: 240px;" poster="https://image.freepik.com/free-icon/video-camera-symbol_318-40225.png"></video>

<p>Remote video</p>
<video autoplay id="remoteVideo" style="height:180px; width: 240px;"></video>

<p><small>Demo by <a href="http://www.mcasas.tk/" target="_blank" rel="noopener">Miguel Casas-Sanchez</a>.</small></p>`,
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

var pc1;
var pc2;
var theStreamB;

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
    addStreamToVideoTag(stream, 'localVideo');

    // RTCPeerConnection is prefixed in Blink-based browsers.
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    pc1 = new RTCPeerConnection(null);
    pc1.addStream(stream);
    pc1.onicecandidate = event => {
      if (event.candidate == null) return;
      pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
    };

    pc2 = new RTCPeerConnection(null);
    pc2.onaddstream = event => {
      theStreamB = event.stream;
      addStreamToVideoTag(event.stream, 'remoteVideo');
    };
    pc2.onicecandidate = event => {
      if (event.candidate == null) return;
      pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
    };

    pc1.createOffer({offerToReceiveVideo: 1})
      .then(desc => {
        pc1.setLocalDescription(desc);
        pc2.setRemoteDescription(desc);
        return pc2.createAnswer({offerToReceiveVideo: 1});
      })
      .then(desc => {
        pc1.setRemoteDescription(desc);
        pc2.setLocalDescription(desc);
      })
      .catch(err => {
        console.error('createOffer()/createAnswer() failed ' + err);
      });
  }, function (err) {
    alert('Error: ' + err);
  });
}

function addStreamToVideoTag(stream, tag) {
  var mediaControl = document.getElementById(tag);
  if ('srcObject' in mediaControl) {
    mediaControl.srcObject = stream;
  } else if (navigator.mozGetUserMedia) {
    mediaControl.mozSrcObject = stream;
  } else {
    mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
  }
}`
  },
  links: [
    {url: 'https://w3c.github.io/webrtc-pc/', title: 'Specification Draft'},
    {
      url: 'http://www.html5rocks.com/en/tutorials/webrtc/basics/',
      title: 'HTML5 Rocks: Getting started with WebRTC'
    },
    {
      url: 'https://webrtc.github.io/samples/#peerconnection',
      title: 'WebRTC RTCPeerConnection and RTCDataChannel samples'
    },
    {
      url: 'https://webrtc.github.io/samples/src/content/peerconnection/pc1/',
      title: 'Simple demo with loopback connection'
    }
  ]
})
