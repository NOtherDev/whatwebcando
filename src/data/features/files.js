import {Feature} from "../../utils/feature.js";

export default new Feature({
  id: 'files',
  name: 'File Access',
  description: [
    `The <b>File API</b> gives Web applications an access to the filesystem-level read-only information about the files that the user decides to share
        with the application, i.e. size, MIME type, modification date, content, without sending the file to the server.`,
    `The <b>Native File System API</b>, available in Google Chrome via <a href="https://developers.chrome.com/origintrials/#/view_trial/3868592079911256065" target="_blank" rel="noopener">origin trial</a> in Spring 2020,
      aims to make it also possible to write into the file system to the handle chosen in the system-level file opening dialog by the user. The API is in its design phase, breaking changes are still expected.`
  ],
  api: `<p><b>File API</b></p>
    <dl>
      <dt><code>fileInputElement.files</code></dt>
      <dd>Returns a collection of file objects that were selected by the user using <code>&lt;input type="file"&gt;</code>DOM element.</dd>
      <dt><code>file.name</code></dt>
      <dd>Returns the original name of the file, without the path.</dd>
      <dt><code>file.size</code></dt>
      <dd>Returns the file size in bytes.</dd>
      <dt><code>file.type</code></dt>
      <dd>Returns the file's MIME type.</dd>
      <dt><code>file.lastModifiedDate</code></dt>
      <dd>Returns the file's last modification date.</dd>
      
      <dt><code>const fileReader = new FileReader()</code></dt>
      <dd>Creates an instance of a class responsible for reading the <code>file</code> content.</dd>
      <dt><code>fileReader.readAsText(file)</code></dt>
      <dd>Initiates a process of reading the file and encoding its content as text.</dd>
      <dt><code>fileReader.addEventListener('load', listener)</code></dt>
      <dd>An event fired when the reading operation has completed successfully. The data read is available via <code>fileReader.result</code> property.</dd>
      
      <dt><code>file.text()</code></dt>
      <dd>Modern alternative for reading the file and encoding its content as text. Returns a <code>Promise</code> resolved with <code>file</code> content string.</dd>
      <dt><code>file.arrayBuffer()</code></dt>
      <dd>Returns a <code>Promise</code> resolved with <code>file</code> content represented as <code>ArrayBuffer</code> instance.</dd>
    </dl>

    <p><b>Native File System API (experimental)</b></p>
    <dl>
      <dt><code>const handle = await window.chooseFileSystemEntries(options)</code></dt>
      <dd>Invokes the system-level file picker dialog for <code>options</code> given (i.e. for saving new file or picking files of specific type).
        Returns a <code>Promise</code> resolved with chosen file handle.</dd>
      <dt><code>const file = await handle.getFile()</code></dt>
      <dd>Returns a <code>Promise</code> resolved with chosen handle's <code>File</code> object, as in File API above.</dd>
      <dt><code>const writer = handle.createWriter()</code></dt>
      <dd>Returns a <code>Promise</code> resolved with handle's writer object, allowing to write data to the file.</dd>
      <dt><code>writer.write(start, content)</code></dt>
      <dd>Writes <code>content</code> to the stream.</dd>
      <dt><code>writer.close()</code></dt>
      <dd>Flushes the stream to the file system and closing it. Returns a <code>Promise</code> resolved when the stream has been closed.</dd>
    </dl>`,
  caniuse: 'fileapi',
  tests: [
    Feature.windowContains('File'),
    Feature.windowContains('chooseFileSystemEntries'),
  ],
  demo: {
    html: `<div class="columns">
  <div class="column">
    <button class="btn-file">
      Choose some files to read<br>(File API) <input type="file" onchange="readFiles(this.files)" multiple>
    </button>
    
    <p>Number of selected files: <b id="count">N/A</b></p>
  </div>
  <div class="column">
    <button class="btn-file" onclick="writeFile()">
      Choose file to create or overwrite<br>(Native File System API)
    </button>
  </div>
</div>

<ul id="target"></ul>`,
    css: `.btn-file {
    position: relative;
    overflow: hidden;
    margin: 10px;
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    opacity: 0;
    outline: none;
    background: #fff;
    cursor: inherit;
    display: block;
}`,
    js: `function getReadFile(reader, i) {
  return function () {
    var li = document.querySelector('[data-idx="' + i + '"]');

    li.innerHTML += 'File starts with "' + reader.result.substr(0, 25) + '"';
  }
}

function readFiles(files) {
  document.getElementById('count').innerHTML = files.length;

  var target = document.getElementById('target');
  target.innerHTML = '';

  for (var i = 0; i < files.length; ++i) {
    var item = document.createElement('li');
    item.setAttribute('data-idx', i);
    var file = files[i];

    var reader = new FileReader();
    reader.addEventListener('load', getReadFile(reader, i));
    reader.readAsText(file);

    item.innerHTML = '<b>' + file.name + '</b>, ' + file.type + ', ' + file.size + ' bytes, last modified ' + file.lastModifiedDate + '<br>';
    target.appendChild(item);
  };
}

async function writeFile() {
  if (!window.chooseFileSystemEntries) {
    alert('Native File System API not supported');
    return;
  }
  
  const target = document.getElementById('target');
  target.innerHTML = 'Opening file handle...';
  
  const handle = await window.chooseFileSystemEntries({
    type: 'saveFile',
  });
  
  const file = await handle.getFile()
  const writer = await handle.createWriter();
  await writer.write(0, 'Hello world from What Web Can Do!');
  await writer.close()
  
  target.innerHTML = 'Test content written to <b>' + file.name + '</b>.';
}`
  },
  links: [
    {url: 'https://w3c.github.io/FileAPI/', title: 'Specification Draft'},
    {url: 'https://web.dev/native-file-system/', title: 'The Native File System API: Simplifying access to local files'},
    {
      url: 'https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications',
      title: 'MDN: Using files from Web applications'
    },
    {
      url: 'http://www.html5rocks.com/en/tutorials/file/dndfiles/',
      title: 'Reading files in JavaScript using the File APIs'
    }
  ]
})
