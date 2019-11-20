<style>

  .container {
    margin-top: 2em;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background-color: #000;
    color: #fff;
  }

  h2 {
    font-size: 1.125em;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
    padding: 2em;
    display: flex;
    justify-content: center;
  }

  li {
    display: block;
    padding: 0 2vw;
  }

  .icon {
    width: 48px;
    height: 48px;
    background: #000 no-repeat center center;
    border-radius: 50%;
    display: inline-block;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  .mail-icon {
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 14 14"> <path fill="white" d="M14 5.547v6.203q0 0.516-0.367 0.883t-0.883 0.367h-11.5q-0.516 0-0.883-0.367t-0.367-0.883v-6.203q0.344 0.383 0.789 0.68 2.828 1.922 3.883 2.695 0.445 0.328 0.723 0.512t0.738 0.375 0.859 0.191h0.016q0.398 0 0.859-0.191t0.738-0.375 0.723-0.512q1.328-0.961 3.891-2.695 0.445-0.305 0.781-0.68zM14 3.25q0 0.617-0.383 1.18t-0.953 0.961q-2.937 2.039-3.656 2.539-0.078 0.055-0.332 0.238t-0.422 0.297-0.406 0.254-0.449 0.211-0.391 0.070h-0.016q-0.18 0-0.391-0.070t-0.449-0.211-0.406-0.254-0.422-0.297-0.332-0.238q-0.711-0.5-2.047-1.426t-1.602-1.113q-0.484-0.328-0.914-0.902t-0.43-1.066q0-0.609 0.324-1.016t0.926-0.406h11.5q0.508 0 0.879 0.367t0.371 0.883z"></path> </svg>');
  }

  .twitter-icon {
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 13 14"> <path fill="white" d="M12.656 3.188q-0.523 0.766-1.266 1.305 0.008 0.109 0.008 0.328 0 1.016-0.297 2.027t-0.902 1.941-1.441 1.645-2.016 1.141-2.523 0.426q-2.117 0-3.875-1.133 0.273 0.031 0.609 0.031 1.758 0 3.133-1.078-0.82-0.016-1.469-0.504t-0.891-1.246q0.258 0.039 0.477 0.039 0.336 0 0.664-0.086-0.875-0.18-1.449-0.871t-0.574-1.605v-0.031q0.531 0.297 1.141 0.32-0.516-0.344-0.82-0.898t-0.305-1.203q0-0.688 0.344-1.273 0.945 1.164 2.301 1.863t2.902 0.777q-0.062-0.297-0.062-0.578 0-1.047 0.738-1.785t1.785-0.738q1.094 0 1.844 0.797 0.852-0.164 1.602-0.609-0.289 0.898-1.109 1.391 0.727-0.078 1.453-0.391z"></path> </svg> ');
  }

  .linkedin-icon {
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 12 14"> <path fill="white" d="M2.727 4.883v7.742h-2.578v-7.742h2.578zM2.891 2.492q0.008 0.57-0.395 0.953t-1.059 0.383h-0.016q-0.641 0-1.031-0.383t-0.391-0.953q0-0.578 0.402-0.957t1.051-0.379 1.039 0.379 0.398 0.957zM12 8.187v4.437h-2.57v-4.141q0-0.82-0.316-1.285t-0.988-0.465q-0.492 0-0.824 0.27t-0.496 0.668q-0.086 0.234-0.086 0.633v4.32h-2.57q0.016-3.117 0.016-5.055t-0.008-2.313l-0.008-0.375h2.57v1.125h-0.016q0.156-0.25 0.32-0.438t0.441-0.406 0.68-0.34 0.895-0.121q1.336 0 2.148 0.887t0.813 2.598z"></path> </svg>');
  }

  .github-icon {
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 12 14"> <path fill="white" d="M6 1q1.633 0 3.012 0.805t2.184 2.184 0.805 3.012q0 1.961-1.145 3.527t-2.957 2.168q-0.211 0.039-0.312-0.055t-0.102-0.234q0-0.023 0.004-0.598t0.004-1.051q0-0.758-0.406-1.109 0.445-0.047 0.801-0.141t0.734-0.305 0.633-0.52 0.414-0.82 0.16-1.176q0-0.93-0.617-1.609 0.289-0.711-0.062-1.594-0.219-0.070-0.633 0.086t-0.719 0.344l-0.297 0.187q-0.727-0.203-1.5-0.203t-1.5 0.203q-0.125-0.086-0.332-0.211t-0.652-0.301-0.664-0.105q-0.352 0.883-0.062 1.594-0.617 0.68-0.617 1.609 0 0.664 0.16 1.172t0.41 0.82 0.629 0.523 0.734 0.305 0.801 0.141q-0.305 0.281-0.383 0.805-0.164 0.078-0.352 0.117t-0.445 0.039-0.512-0.168-0.434-0.488q-0.148-0.25-0.379-0.406t-0.387-0.187l-0.156-0.023q-0.164 0-0.227 0.035t-0.039 0.090 0.070 0.109 0.102 0.094l0.055 0.039q0.172 0.078 0.34 0.297t0.246 0.398l0.078 0.18q0.102 0.297 0.344 0.48t0.523 0.234 0.543 0.055 0.434-0.027l0.18-0.031q0 0.297 0.004 0.691t0.004 0.426q0 0.141-0.102 0.234t-0.312 0.055q-1.812-0.602-2.957-2.168t-1.145-3.527q0-1.633 0.805-3.012t2.184-2.184 3.012-0.805zM2.273 9.617q0.023-0.055-0.055-0.094-0.078-0.023-0.102 0.016-0.023 0.055 0.055 0.094 0.070 0.047 0.102-0.016zM2.516 9.883q0.055-0.039-0.016-0.125-0.078-0.070-0.125-0.023-0.055 0.039 0.016 0.125 0.078 0.078 0.125 0.023zM2.75 10.234q0.070-0.055 0-0.148-0.062-0.102-0.133-0.047-0.070 0.039 0 0.141t0.133 0.055zM3.078 10.562q0.062-0.062-0.031-0.148-0.094-0.094-0.156-0.023-0.070 0.062 0.031 0.148 0.094 0.094 0.156 0.023zM3.523 10.758q0.023-0.086-0.102-0.125-0.117-0.031-0.148 0.055t0.102 0.117q0.117 0.047 0.148-0.047zM4.016 10.797q0-0.102-0.133-0.086-0.125 0-0.125 0.086 0 0.102 0.133 0.086 0.125 0 0.125-0.086zM4.469 10.719q-0.016-0.086-0.141-0.070-0.125 0.023-0.109 0.117t0.141 0.062 0.109-0.109z"></path> </svg>');
  }


</style>

<div class="container" aria-label="Website footer">
  <div class="contact text-center">
    <h2>Get in touch</h2>
    <ul>
      <li><a href="mailto:hi@adambar.pl" class="icon mail-icon">Mail</a></li>
      <li><a href="https://twitter.com/WhatWebCanDo" target="_blank" class="icon twitter-icon">Twitter</a></li>
      <li><a href="https://linkedin.com/in/adamrbar" target="_blank" class="icon linkedin-icon">LinkedIn</a></li>
      <li><a href="https://github.com/NOtherDev/whatwebcando" target="_blank" class="icon github-icon">GitHub</a></li>
    </ul>
  </div>

  <footer role="contentinfo">
    <p class="text-left"><a href="/privacy.html">Privacy Policy</a></p>
    <p class="text-right">
      Created by <a href="https://adambar.pl">Adam Bar</a><br/>
      Licenced under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a>
    </p>
  </footer>
</div>
