(function (window, $) {

  $('.ripple').on('mousedown', function (event) {
    let $div = $('<div/>'),
      btnOffset = $(this).offset(),
      height = $(this).height(),
      xPos = event.pageX - btnOffset.left,
      yPos = event.pageY - btnOffset.top;

    $div.addClass('ripple-effect');

    //noinspection JSSuspiciousNameCombination
    const css = {
      height: height,
      width: height,
      top: yPos - (height / 2),
      left: xPos - (height / 2)
    };

    $div.css(css).appendTo($(this));

    window.setTimeout(() => $div.remove(), 2000);
  });

})(window, jQuery);
