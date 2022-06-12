(function ($) {

  const templateUrl = '<?php echo get_theme_file_uri(); ?>';

  const subject1 = $('#subject-1');
  const subject2 = $('#subject-2');
  const subject3 = $('#subject-3');
  const subject4 = $('#subject-4');

  subject1.click(function () {
    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/postular.gif');
  });
  subject2.click(function () {
    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/colaborar.gif');
  });
  subject3.click(function () {
    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/comprar.gif');
  });
  subject4.click(function () {
    $('#change-image').attr('src', 'http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/molestar.gif');
  });

  subject4.attr('tabindex', -1);

  $(".text-selector").click(function () {
    $(".text-selector").removeClass("active");
    $(this).addClass("active");
    $("#subject").val($(this).data('val')).trigger('change');
  });

})(jQuery);