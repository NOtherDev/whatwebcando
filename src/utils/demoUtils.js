const cleanScript = id => {
  const prevScript = document.getElementById(id);
  if (prevScript) {
    prevScript.parentNode.removeChild(prevScript);
  }
};

const runScript = (script, id) => {
  const scriptElement = document.createElement('script');
  scriptElement.setAttribute('id', id);
  scriptElement.setAttribute('type', 'text/javascript');
  scriptElement.innerHTML = script;
  document.body.appendChild(scriptElement);
};

export function cleanAndRunScript(script) {
  cleanScript('dynamicScript');
  runScript(script, 'dynamicScript');
}

export function runOneOffScript(script) {
  runScript(script, 'oneOffScript');
  cleanScript('oneOffScript');
}
