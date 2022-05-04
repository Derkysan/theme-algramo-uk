// Add your custom JS here.
import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
import { CountUp } from '../../node_modules/countup.js/dist/countUp.min.js';

import gsap from "gsap";

import AOS from 'aos';
AOS.init({
  once: true,
  duration: 1000,
});

(function ($) {

  const swiperMain = new Swiper('.swiper-main', {
    cssMode: true,
    mousewheel: true,
  });

  const swiper = new Swiper('.swiper-products', {
    autoplay: true,
    grabCursor: true,
    mousewheel: false,
    slidesPerView: "auto",
    spaceBetween: 15,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  const swiperData = new Swiper('.swiper-data', {
    cssMode: true,
    mousewheel: true,
    slidesPerView: "auto",
    spaceBetween: 15,
  })
  const swiperGallery = new Swiper('.swiper-gallery', {
    autoplay: true,
    grabCursor: true,
    mousewheel: false,
    slidesPerView: "auto",
    spaceBetween: 15,
  })
  const swiperGallery2 = new Swiper('.swiper-gallery-2', {
    autoplay: true,
    grabCursor: true,
    mousewheel: false,
    slidesPerView: "auto",
    spaceBetween: 15,
  })

  $(window).on('load', function () {
    $('#loadingPage').addClass('animate__animated animate__fadeOut');
    setTimeout(function () {
      $('#loadingPage').fadeOut();
    }, 2000);

    let marquee = document.querySelectorAll('.clipped-text');
    marquee.forEach(el => {
      // set a default rate, the higher the value, the faster it is
      let rate = 200;
      // get the width of the element
      let distance = el.clientWidth;
      // get the margin-right of the element
      let style = window.getComputedStyle(el);
      let marginRight = parseInt(style.marginRight) || 0;
      // get the total width of the element
      let totalDistance = distance + marginRight;
      // get the duration of the animation 
      // for a better explanation, see the quoted codepen in the first comment
      let time = totalDistance / rate;
      // get the parent of the element
      let container = el.parentElement;

      gsap.to(container, time, {
        repeat: -1,
        x: '-' + totalDistance,
        ease: 'linear',
      });
    });

    const data1 = new CountUp('data-1', 275631, { startVal: 100000, duration: 25 });
    const data2 = new CountUp('data-2', 9022706, { startVal: 100000, duration: 25 });
    const data3 = new CountUp('data-3', 6597655, { startVal: 100000, duration: 25 });
    const data4 = new CountUp('data-4', 35663, { startVal: 50000, duration: 25 });
    // const data5 = new CountUp('data-5', 15, { startVal: 0 });
    const data6 = new CountUp('data-6', 80, { startVal: 0, duration: 25 });
    const data7 = new CountUp('data-7', 4, { startVal: 0, duration: 25 });
    document.addEventListener('aos:in:randomize', () => {
      data1.start();
      data2.start();
      data3.start();
      data4.start();
      // data5.start();
      data6.start();
      data7.start();
    });

    // Simular impacto
    const productsSelect = $('#products');
    const productsfrequency = $('#frequency');

    const simulaData1 = new CountUp('simulaData1', 0, { startVal: 0 });
    const simulaData2 = new CountUp('simulaData2', 0, { startVal: 0, suffix: 'gr' });
    const simulaData3 = new CountUp('simulaData3', 0, { startVal: 0, suffix: 'gr' });

    simulaData1.start();
    simulaData2.start();
    simulaData3.start();


    productsSelect.on('change', function () {

      // if (productsfrequency.val() === '0' || productsSelect.val() === '0') return;

      switch (productsSelect.val()) {
        case '0':
          break;
        case '1':
          simulaData2.update(150);
          simulaData3.update(465);
          break;
        case '2':
          simulaData2.update(49);
          simulaData3.update(143);
          break;
        case '3':
          simulaData2.update(48);
          simulaData3.update(231);
          break;
        case '4':
          simulaData2.update(44);
          simulaData3.update(151);
          break;
        case '5':
          simulaData2.update(52);
          simulaData3.update(151);
          break;

        default:
          break;
      }

    });

    productsfrequency.on('change', function () {

      // if (productsSelect.val() === '0' || productsfrequency.val() === '0') return;

      switch (productsfrequency.val()) {
        case '0':
          break;
        case '1':
          simulaData1.update(17);
          break;
        case '2':
          simulaData1.update(11);
          break;
        case '3':
          simulaData1.update(5);
          break;
        case '4':
          simulaData1.update(3);
          break;
        case '5':
          simulaData1.update(1);
          break;

        default:
          break;
      }

    });
  })


  

  // added event listener because it doesn't get the right width
  // addEventListener("load", function () {
    
  // });


})(jQuery);


