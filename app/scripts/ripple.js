(function () {

  document.addEventListener('mousedown', function (event) {
    if (event.target &&
      event.target.className &&
      event.target.className.indexOf &&
      event.target.className.indexOf('ripple') !== -1) {
      let $div = document.createElement('div'),
        btnRect = event.target.getBoundingClientRect(),
        height = event.target.clientHeight,
        xPos = event.pageX - (btnRect.left + window.pageXOffset),
        yPos = event.pageY - (btnRect.top + window.pageYOffset);

      $div.className = 'ripple-effect';
      $div.style.height = `${height}px`;
      //noinspection JSSuspiciousNameCombination
      $div.style.width = `${height}px`;
      $div.style.top = `${yPos - (height / 2)}px`;
      $div.style.left = `${xPos - (height / 2)}px`;

      event.target.appendChild($div);

      window.setTimeout(() => event.target.removeChild($div), 2000);
    }
  });

})();
