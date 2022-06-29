(function ($) {

  if ($(".text-selector")) {

    // subject4.attr('tabindex', -1);

    let console = window.console;
    let subjectActive = 0;

    $(".text-selector").click(function () {
      $(".text-selector").removeClass("active");
      $(this).addClass("active");
      subjectActive = $(this).attr("data-val");

      switch (subjectActive) {
        case "Postular":
          $(".subject-img").removeClass("active");
          $(".subject-1").addClass("active");
          $("#subject").val("Postular").trigger('change');
          break;
        case "Colaborar":
          $(".subject-img").removeClass("active");
          $(".subject-2").addClass("active");
          $("#subject").val("Colaborar").trigger('change');
          break;
        case "Comprar":
          $(".subject-img").removeClass("active");
          $(".subject-3").addClass("active");
          $("#subject").val("Comprar").trigger('change');
          break;
        case "Molestar":
          $(".subject-img").removeClass("active");
          $(".subject-4").addClass("active");
          $("#subject").val("Molestar").trigger('change');
          break;

        default:
          $(".subject-img").removeClass("active");
          $(".subject-1").addClass("active");
          break;
      }
    });

  } else return

})(jQuery);