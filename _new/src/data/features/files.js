import {Feature} from "../../utils/feature";

export default new Feature({
  id: 'files',
  name: 'File Access',
  description: `The <b>File API</b> gives Web applications an access to the filesystem-level information about the files that the user decides to share
        with the application, i.e. size, MIME type, modification date, content, without sending the file to the server.`,
  api: `<dl>
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
        <dt><code>fileReader.readAsText(file)</code></dt>
        <dd>Initiates a process of reading the file and encoding its content as text.</dd>
        <dt><code>fileReader.addEventListener('load', listener)</code></dt>
        <dd>An event fired when the reading operation has completed successfully. The data read is available via <code>fileReader.result</code> property.</dd>
      </dl>`,
  caniuse: 'fileapi',
  tests: [Feature.windowContains('File')],
  demo: {
    html: `<button class="btn-file">
    Choose some files <input type="file" onchange="handleFiles(this.files)" multiple>
</button>

<p>Number of selected files: <b id="count">N/A</b></p>

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

function handleFiles(files) {
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
}`
  },
  links: [
    {url: 'https://w3c.github.io/FileAPI/', title: 'Specification Draft'},
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
