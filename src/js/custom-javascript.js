// Add your custom JS here.
import "./custom/swiper";
import "./custom/contact";
import "./custom/dropdown";

import gsap from "gsap";

var console = window.console;

( function( $ ){
  
  $('#loadingPage').addClass('animate__animated animate__fadeOut');
  setTimeout(function () {
    $('#loadingPage').fadeOut();
  }, 2000);

  const logoAnimated = $('.logo-animated');
  $(window).scroll(function () {

    console.log($(window).scrollTop());
    if ($(window).scrollTop() >= 100) {
      // alert('scrolltop')
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

  
})( jQuery );