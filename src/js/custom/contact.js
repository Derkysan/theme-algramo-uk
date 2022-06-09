(function ($) {

  const subject1 = $('#subject-1');
  const subject2 = $('#subject-2');
  const subject3 = $('#subject-3');
  const subject4 = $('#subject-4');

  subject1.click(function () {
    $('#change-image').attr('src', '/wp-content/uploads/2018/09/black.jpg');
  });
  subject2.click(function () {
    $('#change-image').attr('src', '/wp-content/uploads/2018/09/red.jpg');
  });
  subject3.click(function () {
    $('#change-image').attr('src', '/wp-content/uploads/2018/09/blue.jpg');
  });
  subject4.click(function () {
    $('#change-image').attr('src', '/wp-content/uploads/2018/09/green.jpg');
  });

  subject4.attr('tabindex', -1);

  $(".text-selector").click(function () {
    $(".text-selector").removeClass("active");
    $(this).addClass("active");
    $("#subject").val($(this).data('val')).trigger('change');
  });

})(jQuery);