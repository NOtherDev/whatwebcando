(() => {

  window.$$ = selector => {
    let result = document.querySelectorAll(selector);
    result.forEach = (callback, scope) => {
      for (let i = 0; i < result.length; i++) {
        callback.call(scope, result[i], i);
      }
    };
    return result;
  };

  window.outerHeight = el => {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  };

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

  window.cleanAndRunScript = script => {
    cleanScript('dynamicScript');
    runScript(script, 'dynamicScript');
  };

  window.runOneOffScript = script => {
    runScript(script, 'oneOffScript');
    cleanScript('oneOffScript');
  };

})();
