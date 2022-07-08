import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
import { CountUp } from '../../../node_modules/countup.js/dist/countUp.min.js';
import AOS from 'aos';

AOS.init({
  once: true,
  duration: 1000,
});

(function ($) {

  // var console = window.console;
  // alert('testing swiper.js');
  // console.log('testing swiper.js');

  $(document).ready(function () {

    const swiperMain = new Swiper('.swiper-main', {
      cssMode: true,
      mousewheel: true,
    });

    // if ( $('.swiper-products') ) {
      const swiper = new Swiper('.swiper-products', {
        autoplay: false,
        grabCursor: true,
        mousewheel: false,
        slidesPerView: "auto",
        spaceBetween: 15,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    // }

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
    

    const data1 = new CountUp('data-1', 691284, { startVal: 100000, duration: 25 });
    const data2 = new CountUp('data-2', 255453, { startVal: 100000, duration: 25 });
    const data3 = new CountUp('data-3', 2541038, { startVal: 100000, duration: 25 });
    const data4 = new CountUp('data-4', 87622, { startVal: 50000, duration: 25 });
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

    let productVal = '0';
    let frequencyVal = '0';

    $('#products').on('change', function () {

      productVal = $('#products option').filter(':selected').val();

      if (this.value === '0' && frequencyVal === '0') return;

      if (frequencyVal === '1') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(23 * 152);
            simulaData3.update(23 * 465);
            break;
          case '2':
            simulaData1.update(23);
            simulaData2.update(23 * 49);
            simulaData3.update(23 * 143);
            break;
          case '3':
            simulaData1.update(23);
            simulaData2.update(23 * 48);
            simulaData3.update(23 * 231);
            break;
          case '4':
            simulaData1.update(23);
            simulaData2.update(23 * 44);
            simulaData3.update(23 * 151);
            break;
          case '5':
            simulaData1.update(23);
            simulaData2.update(23 * 52);
            simulaData3.update(23 * 151);
            break;
          case '6':
            simulaData1.update(23);
            // simulaData2.update(23 * 345);
            simulaData2.update(5 * 345);
            // simulaData3.update(23 * 1141);
            simulaData3.update(5 * 1141);
            break;

          default:
            simulaData1.update(0);
            break;
        };

      }
      if (frequencyVal === '2') {

        switch (this.value) {
          case '1':
            simulaData1.update(11);
            simulaData2.update(11 * 152);
            simulaData3.update(11 * 465);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(11 * 49);
            simulaData3.update(11 * 143);
            break;
          case '3':
            simulaData1.update(11);
            simulaData2.update(11 * 48);
            simulaData3.update(11 * 231);
            break;
          case '4':
            simulaData1.update(11);
            simulaData2.update(11 * 44);
            simulaData3.update(11 * 151);
            break;
          case '5':
            simulaData1.update(11);
            simulaData2.update(11 * 52);
            simulaData3.update(11 * 151);
            break;
          case '6':
            simulaData1.update(11);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;

          default:
            simulaData1.update(0);
            break;
        };

      }
      if (frequencyVal === '3') {

        switch (this.value) {
          case '1':
            simulaData1.update(5);
            simulaData2.update(5 * 152);
            simulaData3.update(5 * 465);
            break;
          case '2':
            simulaData1.update(5);
            simulaData2.update(5 * 143);
            simulaData3.update(5 * 143);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 48);
            simulaData3.update(5 * 231);
            break;
          case '4':
            simulaData1.update(5);
            simulaData2.update(5 * 44);
            simulaData3.update(5 * 151);
            break;
          case '5':
            simulaData1.update(5);
            simulaData2.update(5 * 52);
            simulaData3.update(5 * 151);
            break;
          case '6':
            simulaData1.update(5);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;

          default:
            simulaData1.update(0);
            break;
        };

      }
      if (frequencyVal === '4') {

        switch (this.value) {
          case '1':
            simulaData1.update(3);
            simulaData2.update(3 * 152);
            simulaData3.update(3 * 465);
            break;
          case '2':
            simulaData1.update(3);
            simulaData2.update(3 * 49);
            simulaData3.update(3 * 143);
            break;
          case '3':
            simulaData1.update(3);
            simulaData2.update(3 * 48);
            simulaData3.update(3 * 231);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(3 * 44);
            simulaData3.update(3 * 151);
            break;
          case '5':
            simulaData1.update(3);
            simulaData2.update(3 * 52);
            simulaData3.update(3 * 151);
            break;
          case '6':
            simulaData1.update(3);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;

          default:
            simulaData1.update(0);
            break;
        };

      }
      if (frequencyVal === '5') {

        switch (this.value) {
          case '1':
            simulaData1.update(1);
            simulaData2.update(1 * 152);
            simulaData3.update(1 * 465);
            break;
          case '2':
            simulaData1.update(1);
            simulaData2.update(1 * 49);
            simulaData3.update(1 * 143);
            break;
          case '3':
            simulaData1.update(1);
            simulaData2.update(1 * 48);
            simulaData3.update(1 * 231);
            break;
          case '4':
            simulaData1.update(1);
            simulaData2.update(1 * 44);
            simulaData3.update(1 * 151);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(1 * 52);
            simulaData3.update(1 * 151);
            break;
          case '6':
            simulaData1.update(1);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;

          default:
            simulaData1.update(0);
            break;
        };

      }

    });

    $('#frequency').on('change', function () {

      frequencyVal = $('#frequency option').filter(':selected').val();

      if (this.value === '0' && productVal === '0') return;

      if (productVal === '1') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(23 * 152);
            simulaData3.update(23 * 465);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(11 * 152);
            simulaData3.update(11 * 465);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 152);
            simulaData3.update(5 * 465);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(3 * 152);
            simulaData3.update(3 * 465);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(1 * 152);
            simulaData3.update(1 * 465);
            break;

          default:
            simulaData1.update(0);
            break;
        }

      }
      if (productVal === '2') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(23 * 49);
            simulaData3.update(23 * 143);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(11 * 49);
            simulaData3.update(11 * 143);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 49);
            simulaData3.update(5 * 143);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(3 * 49);
            simulaData3.update(3 * 143);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(1 * 49);
            simulaData3.update(1 * 143);
            break;

          default:
            simulaData1.update(0);
            break;
        }

      }
      if (productVal === '3') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(23 * 48);
            simulaData3.update(23 * 231);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(11 * 48);
            simulaData3.update(11 * 231);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 48);
            simulaData3.update(5 * 231);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(3 * 48);
            simulaData3.update(3 * 231);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(1 * 48);
            simulaData3.update(1 * 231);
            break;

          default:
            simulaData1.update(0);
            break;
        }

      }
      if (productVal === '4') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(23 * 44);
            simulaData3.update(23 * 151);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(11 * 44);
            simulaData3.update(11 * 151);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 44);
            simulaData3.update(5 * 151);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(3 * 44);
            simulaData3.update(3 * 151);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(1 * 44);
            simulaData3.update(1 * 151);
            break;

          default:
            simulaData1.update(0);
            break;
        }

      }
      if (productVal === '5') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(23 * 52);
            simulaData3.update(23 * 151);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(11 * 52);
            simulaData3.update(11 * 151);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 52);
            simulaData3.update(5 * 151);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(3 * 52);
            simulaData3.update(3 * 151);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(1 * 52);
            simulaData3.update(1 * 151);
            break;

          default:
            simulaData1.update(0);
            break;
        }

      }
      if (productVal === '6') {

        switch (this.value) {
          case '1':
            simulaData1.update(23);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;
          case '2':
            simulaData1.update(11);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;
          case '3':
            simulaData1.update(5);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;
          case '4':
            simulaData1.update(3);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;
          case '5':
            simulaData1.update(1);
            simulaData2.update(5 * 345);
            simulaData3.update(5 * 1141);
            break;

          default:
            simulaData1.update(0);
            break;
        }

      }

    });


    const swiperVertical = new Swiper('.swiper-v', {
      direction: "vertical",
      allowTouchMove: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: false,
      },
    });

    const sectionH = $('.section').height() / 2;
    const firstBlock = $('#block-1');
    const secondBlock = $('#block-2');
    const thirdBlock = $('#block-3');

    let slideIndex = $('#slide-idx').text('01');

    const firstBlockTopDistance = firstBlock?.offset()?.top;
    const secondBlockTopDistance = secondBlock?.offset()?.top;
    const thirdBlockTopDistance = thirdBlock?.offset()?.top;
    const $window = $(window);
    const vSlider = $('#v-slider');

    let allBullets = $('.pagerline').find('.bullet');

    let vSlideActive = 1;

    $window.scroll(function () {

      if ($(window).scrollTop() >= firstBlockTopDistance && $(window).scrollTop() < thirdBlockTopDistance) {
        vSlider.addClass('active fixed');
      } else if ($(window).scrollTop() >= thirdBlockTopDistance || $(window).scrollTop() < firstBlockTopDistance) {
        vSlider.removeClass('active fixed');
      }

      if ($(window).scrollTop() >= thirdBlockTopDistance) {
        vSlider.addClass('bottom');
      } else {
        vSlider.removeClass('bottom');
      }

      if ($(window).scrollTop() >= (firstBlockTopDistance - sectionH) && $(window).scrollTop() < (secondBlockTopDistance - sectionH)) {
        vSlideActive = 1;
        slideIndex.text('01');
        swiperVertical.slideTo(0, 500);
        allBullets[0].classList.add('active');
        allBullets[1].classList.remove('active');
      };
      if ($(window).scrollTop() >= (secondBlockTopDistance - sectionH) && $(window).scrollTop() <= (thirdBlockTopDistance - sectionH)) {
        vSlideActive = 2;
        slideIndex.text('02');
        swiperVertical.slideTo(1, 500);
        allBullets[1].classList.add('active');
        allBullets[2].classList.remove('active');

      };
      if ($(window).scrollTop() >= (thirdBlockTopDistance - sectionH)) {
        vSlideActive = 3;
        slideIndex.text('03');
        swiperVertical.slideTo(2, 500);
        allBullets[2].classList.add('active');
      };

    });

    const swiperParallax = new Swiper('.swiper-parallax', {
      direction: 'vertical',
      parallax: true,
      cssMode: true,
      mousewheel: true,
      navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next',
      },
    });


    // timeline carousel
    var swiperTimeline = new Swiper('.timeline-swiper', {
      // cssMode: true,
      grabCursor: true,
      mousewheel: false,
      slidesPerView: "auto",
      navigation: {
        nextEl: '.swiper-tl-button-next',
        prevEl: '.swiper-tl-button-prev',
      }
    });

    let swiperTeam = new Swiper('.swiper-team', {
      autoplay: false,
      grabCursor: true,
      mousewheel: false,
      slidesPerView: "auto",
      spaceBetween: 25,
    });
    
  });


})(jQuery);