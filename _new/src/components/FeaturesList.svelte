<style>
  .features-list-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    margin-top: 1em;
  }

  section {
    width: 100%;
    margin-bottom: 1em;
    padding: 2em;
    border: 1px solid #E9E9E9;
    background-color: #fff;
    border-radius: 10px;
  }

  h3 {
    font-size: 1.375em;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: .5em 0;
  }
  
  .support {
    width: 2em;
    text-transform: uppercase;
    font-weight: bold;
  }

  .support-no {
    color: var(--theme-color);
  }

  @media screen and (min-width: 1024px) {
    section {
      width: unset;
      min-width: 16em;
    }
  }

  @media screen and (min-width: 1440px) {
    section {
      min-width: 24em;
    }
  }
</style>

<div class="features-list-container">
  <section>
    <h3>Camera & Microphone</h3>

    <ul>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-yes">Yes</span>
      </li>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-no">No</span>
      </li>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-yes">Yes</span>
      </li>
    </ul>
  </section>

  <section>
    <h3>Camera & Microphone</h3>

    <ul>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-no">No</span>
      </li>
      <li>
        <span>Audio Capture</span>
        <span class="support support-yes">Yes</span>
      </li>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-no">No</span>
      </li>
    </ul>
  </section>

  <section>
    <h3>Camera & Microphone</h3>

    <ul>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-yes">Yes</span>
      </li>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-yes">Yes</span>
      </li>
      <li>
        <span><a href="audio-video.html">Audio & Video Capture</a></span>
        <span class="support support-yes">Yes</span>
      </li>
    </ul>
  </section>
</div>
