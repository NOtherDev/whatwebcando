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
