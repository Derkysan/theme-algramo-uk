var console = window.console;

// Add your custom JS here.
import "./custom/swiper";
import "./custom/contact";
import "./custom/dropdown";
import "./custom/map";
import "./custom/dropdow-checkbox-multiselect";
import "./custom/components";

import gsap from "gsap";

(function ($) {

  // alert('testing custom.js');
  // console.log('testing custom.js');

  $(document).ready(function () {
    $('#loadingPage').addClass('animate__animated animate__fadeOut');
    setTimeout(function () {
      $('#loadingPage').fadeOut();
    }, 2000);
  });

  const logoAnimated = $('.logo-animated');
  $(window).scroll(function () {

    if ($(window).scrollTop() >= 100) {
      logoAnimated.addClass('scrolled');
    } else {
      logoAnimated.removeClass('scrolled');
    }
  });

  let marquee = document.querySelectorAll('.clipped-text');
  marquee.forEach(el => {
    let rate = 200;
    let distance = el.clientWidth;
    let style = window.getComputedStyle(el);
    let marginRight = parseInt(style.marginRight) || 0;
    let totalDistance = distance + marginRight;
    let time = totalDistance / rate;
    let container = el.parentElement;

    gsap.to(container, time, {
      repeat: -1,
      x: '-' + totalDistance,
      ease: 'linear',
    });
  });

  $('.btn-collapse').click(function () {
    const $this = $(this);
    const iconWrapper = $this.children('.collapse-icon');
    if ($this.hasClass('collapsed')) {
      iconWrapper.html('<i class="fa-solid fa-plus"></i>');
    } else {
      iconWrapper.html('<i class="fa-solid fa-minus"></i>');
    }
  });

  $('#langSelector').on('change', function () {
    let url = $(this).val(); // get selected value
    if (url) { // require a URL
      alert(url); // log it
      window.location = url; // redirect
    }
    return false;
  });


})(jQuery);