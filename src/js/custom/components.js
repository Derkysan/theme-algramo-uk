(function ($) {

  let console = window.console;
  
  $(document).ready(function() {

    $('.tooltip-item').click(function(e) {
        if ($(this).hasClass('active')) {
          $('.tooltip-item.active').removeClass("active");
        } else {
          $('.tooltip-item.active').removeClass("active");
          $(this).addClass("active");
        }
      });
      
      $(document).on('keyup', function(e) {
        if (e.key == "Escape") {
        $('.tooltip-item.active').removeClass("active");
      }
    });

    // $('.close-modal').click(function (e) { 
    //   $('#memberModal').hide();
    // });
    // $('.member').click( ()=>{
    //   $('#memberModal').show();
    // });


  });

})(jQuery);