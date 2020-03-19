import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'speech-recognition',
  name: 'Speech Recognition',
  description: [`The speech recognition part of the <b>Web Speech API</b> allows authorized Web applications to access the device's microphone
        and produces a transcript of the voice being recorded. This allows Web applications to use voice as one of the input & control method,
        similar to touch or keyboard.`,
    `Technically, the speech recognition functionality can also be achieved by <a href="/camera-microphone.html">accessing the microphone</a>
        and processing the audio stream using <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noopener">Web Audio API</a>.
        An examplary library that takes such an approach is <a href="http://syl22-00.github.io/pocketsphinx.js/" target="_blank" rel="noopener">pocketsphinx.js</a>.`],
  api: `<dl>
        <dt><code>let recognition = new SpeechRecognition()</code></dt>
        <dd>Creates an object used to configure the recognition process and to receive events about the recognition results.</dd>
        <dt><code>recognition.continuous</code></dt>
        <dd>A boolean property indicating whether the process should stop after the first final transcripts received (when <code>false</code>, the default)
          or send multiple events, until the process is explicitly stopped (when <code>true</code>).</dd>
        <dt><code>recognition.interimResults</code></dt>
        <dd>A boolean property indicating whether interim (not-yet-final) transcripts should be provided, <code>false</code> by default.</dd>
        <dt><code>recognition.lang</code></dt>
        <dd>A property to set up the language for the recognition.</dd>
        <dt><code>recognition.addEventListener('result', listener)</code></dt>
        <dd>An event fired when the process has produced the transcripts for the piece of audio recorded. The listener is called with an array of results,
          each containing a boolean <code>final</code> flag indicating whether the result might be updated in the future event (when <code>false</code>)
          or not and the collection of alternative transcripts, each with <code>transcript</code> itself and a <code>confidence</code> value.</dd>
        <dt><code>recognition.addEventListener('nomatch', listener)</code></dt>
        <dd>An event fired when the process has not produced any transcripts for the piece of audio recorded with the confidence exceeding the minimal
          threshold, i.e. it is not possible to provide the transcription.</dd>
        <dt><code>recognition.start()</code></dt>
        <dd>Starts the recognition process.</dd>
        <dt><code>recognition.stop()</code></dt>
        <dd>Stops the recognition process; useful when <code>recognition.continuous</code> is set to <code>true</code>.</dd>
      </dl>`,
  caniuse: 'speech-recognition',
  tests: [Feature.windowContains('SpeechRecognition')],
  links: [
    {url: 'https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section', title: 'Specification'},
    {url: 'http://www.sitepoint.com/introducing-web-speech-api/', title: 'SitePoint: Introducing the Web Speech API'},
    {
      url: 'https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API',
      title: 'Voice Driven Web Apps: Introduction to the Web Speech API'
    },
    {url: 'https://shaungallagher.github.io/say_restyle/', title: 'Demo - Edit the webpage with your voice'}
  ]
})
