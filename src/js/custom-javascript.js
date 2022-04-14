// Add your custom JS here.
import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
import { CountUp } from '../../node_modules/countup.js/dist/countUp.min.js';

import AOS from 'aos';
AOS.init({ once: true });

(function ($) {

  const swiperMain = new Swiper('.swiper-main', {
    cssMode: true,
    mousewheel: true,
  });

  const swiper = new Swiper('.swiper-products', {
    cssMode: true,
    mousewheel: true,
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
    cssMode: true,
    mousewheel: true,
    slidesPerView: "auto",
    spaceBetween: 15,
  })
  const swiperGallery2 = new Swiper('.swiper-gallery-2', {
    cssMode: true,
    mousewheel: true,
    slidesPerView: "auto",
    spaceBetween: 15,
  })

  $(window).on('load', function () {
      $('#loadingPage').addClass('animate__animated animate__fadeOut');    
      setTimeout(function() {
        $('#loadingPage').fadeOut();
      } , 2000);

    const data1 = new CountUp('data-1', 2, { startVal: 100, suffix: 'M' });
    const data2 = new CountUp('data-2', 2, { startVal: 100, suffix: 'T', duration: 4 });
    const data4 = new CountUp('data-4', 430, { startVal: 50 });
    const data5 = new CountUp('data-5', 15, { startVal: 0 });
    const data6 = new CountUp('data-6', 356, { startVal: 65 });
    const data7 = new CountUp('data-7', 6, { startVal: 15 });
    document.addEventListener('aos:in:randomize', () => {
      data1.start();
      data2.start();
      data4.start();
      data5.start();
      data6.start();
      data7.start();
    });
 
    // Simular impacto
    const productsSelect = $('#products');
    const productsfrequency = $('#frequency');
  
    const simulaData1 = new CountUp('simulaData1', 7, { startVal: 0 });
    const simulaData2 = new CountUp('simulaData2', 2, { startVal: 10, suffix: 'gr' });
    const simulaData3 = new CountUp('simulaData3', 465, { startVal: 56, suffix: 'gr' });

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




})(jQuery);


