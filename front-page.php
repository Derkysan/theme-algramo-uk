<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

?>

<div class="animate__animated animate__fadeIn">

  <section class="main-slider">

    <div class="img-spin rotate d-none d-md-block">
      <img src="<?php echo get_theme_file_uri(); ?>/images/recarga-reutiliza-repite.svg" class="" alt="Recarga, reutiliza, repite">
    </div>

    <!-- Slider main container -->
    <div class="swiper-main">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <?php if (have_rows('slider_principal')) : ?>
          <?php while (have_rows('slider_principal')) : the_row(); ?>

            <?php if (have_rows('slide')) : ?>
              <?php while (have_rows('slide')) : the_row(); ?>

                <div class="swiper-slide">
                  <div class="slide-wrapper">
                    <div class="slider-img d-none d-md-block">
                      <video width="100%" height="100%" autoplay muted loop>
                        <?php $video = get_sub_field('video'); ?>
                        <?php if ($video) : ?>
                          <!-- <a href="<?php echo esc_url($video['url']); ?>"><?php echo esc_html($video['filename']); ?></a> -->
                          <?php if (get_sub_field('video')) : ?>
                            <source src="<?php echo esc_url($video['url']); ?>" type="video/mp4">
                            <source src="<?php echo esc_url($video['url']); ?>" type="video/ogg">
                          <?php endif ?>
                          Your browser does not support HTML video.
                        <?php endif; ?>

                      </video>
                    </div>
                    <div class="slider-img d-block d-md-none">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/ajuste-video-home.gif" alt="Gif home">
                    </div>
                    <div class="container-fluid h-100 px-4">
                      <div class="row h-100 align-items-end align-items-md-center">
                        <div class="col slide-txt-wrapper">

                          <div class="row justify-content-center">
                            <div class="col-12 col-md-11">
                              <h1>
                                <?php the_sub_field('texto'); ?>
                              </h1>
                            </div>
                          </div>

                        </div>
                        <div class="col d-none d-md-block"></div>
                      </div>
                    </div>
                  </div>
                </div>

              <?php endwhile; ?>
            <?php endif; ?>


          <?php endwhile; ?>
        <?php else : ?>
          <?php // No rows found 
          ?>
        <?php endif; ?>
      </div>

      <!-- If we need navigation buttons -->
      <!-- <div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div> -->
    </div>
  </section>



  <?php if (have_rows('bloque_reutilizar')) : ?>
    <?php while (have_rows('bloque_reutilizar')) : the_row(); ?>

      <section class="py-5 position-relative">
        <div class="marquee-wrapper home-1">
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text">
                Algramo es la nueva forma de reutilizar.
              </span>
              <span class="clipped-text">
                Algramo es la nueva forma de reutilizar.
              </span>
            </div>
          </div>
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text lineal">
                Algramo es la nueva forma de reutilizar.
              </span>
              <span class="clipped-text lineal">
                Algramo es la nueva forma de reutilizar.
              </span>
            </div>
          </div>
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text lineal">
                Algramo es la nueva forma de reutilizar.
              </span>
              <span class="clipped-text lineal">
                Algramo es la nueva forma de reutilizar.
              </span>
            </div>
          </div>
        </div>

        <div class="graph-1 text-center">
          <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
          <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-img" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
          <!-- <img src="<?php echo get_theme_file_uri(); ?>/images/algramo-es-la-nueva-forma-de-reutilizar.svg" class="text-graph-1" data-aos="fade-left" data-aos-delay="50" data-aos-offset="200" data-aos-easing="ease-in-out" alt="Algramo es la nueva forma de reutilizar."> -->
        </div>
        <div class="container">
          <div class="row justify-content-center mt-5 pt-3">
            <div class="col-12 col-md-7 text-center">
              <div class="mt-5 mb-5" class="text-graph-1" data-aos="fade-up" data-aos-delay="50" data-aos-offset="200" data-aos-easing="ease-in-out">
                <?php the_sub_field('bloque_texto'); ?>
              </div>
              <h3 class="text-primary mb-0 fw-bold" data-aos="fade-up" data-aos-delay="50" data-aos-offset="200" data-aos-easing="ease-in-out">
                <?php the_sub_field('frase_destacada'); ?>
                <span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-hand.png" style="width: 24px" alt="emoji"></span>
              </h3>
            </div>
          </div>
        </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>

  <section class="pt-2 pb-5">
    <div class="wrapper-carousel pb-5" data-aos="fade-in" data-aos-delay="250" data-aos-offset="200" data-aos-easing="ease-in-out">
      <div class="swiper swiper-products">
        <div class="swiper-wrapper">
          <?php if (have_rows('carousel_grid')) : ?>
            <?php while (have_rows('carousel_grid')) : the_row(); ?>

              <?php if (have_rows('slide')) : ?>
                <?php while (have_rows('slide')) : the_row(); ?>

                  <?php if (get_sub_field('imagen')) : ?>
                    <div class="swiper-slide">
                      <div class="item">
                        <div class="thumb">
                          <img src="<?php the_sub_field('imagen'); ?>" />
                        </div>
                        <div class="info">
                          <?php the_sub_field('texto'); ?>
                        </div>
                      </div>
                    </div>
                  <?php endif ?>

                <?php endwhile; ?>
              <?php endif; ?>

            <?php endwhile; ?>
          <?php else : ?>
            <?php // No rows found 
            ?>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

  <?php if (have_rows('cita')) : ?>
    <?php while (have_rows('cita')) : the_row(); ?>

      <?php if (get_sub_field('imagen')) : ?>
        <section class="wrapper-quote bg-primary text-white py-5">
          <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal-white.png" class="asterisk" data-aos="fade-in" data-aos-delay="50" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
          <img src="<?php the_sub_field('imagen'); ?>" class="quote-img" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" />
          <div class="container quote-txt-wrapper h-100">
            <div class="row h-100 align-items-start align-items-md-center">
              <div class="col-12 col-md-8">
                <h3 class="pe-4" data-aos="fade-right" data-aos-delay="50" data-aos-offset="200" data-aos-easing="ease-in-out"><?php the_sub_field('cita_texto'); ?></h3>
                <p data-aos="fade-right" data-aos-delay="150" data-aos-offset="0" data-aos-easing="ease-in-out"><?php the_sub_field('cita_info'); ?></p>
              </div>
              <div class="d-none d-md-inline-flex col-md-4">
              </div>
            </div>
          </div>
        </section>
      <?php endif ?>

    <?php endwhile; ?>
  <?php endif; ?>

  <?php if (have_rows('compra_inteligente')) : ?>
    <?php while (have_rows('compra_inteligente')) : the_row(); ?>

      <section class="smart-buy py-5">
        <img src="<?php echo get_theme_file_uri(); ?>/images/text-graph-1.svg" class="graph d-none d-md-inline-flex" alt="text graph" data-aos="fade-right" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out">

        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-8">
              <h2 class="mb-5 text-center" data-aos="fade-up" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out">
                <?php the_sub_field('titulo'); ?>
              </h2>


              <div class="card-items">
                <div class="row">
                  <?php if (have_rows('item_1')) : ?>
                    <?php while (have_rows('item_1')) : the_row(); ?>
                      <?php if (get_sub_field('imagen')) : ?>
                        <div class="col-12 col-md-6">
                          <div class="item-card mb-5" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                            <h5 class="fw-bold"><?php the_sub_field('titulo'); ?> <span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-money.png" style="width: 24px" alt="emoji"></span></h5>
                            <div class="thumb">
                              <img src="<?php the_sub_field('imagen'); ?>" />
                            </div>
                            <div class="info circular-light"><?php the_sub_field('contenido'); ?> </div>
                          </div>
                        </div>
                      <?php endif ?>
                    <?php endwhile; ?>
                  <?php endif; ?>

                  <?php if (have_rows('item_2')) : ?>
                    <?php while (have_rows('item_2')) : the_row(); ?>
                      <?php if (get_sub_field('imagen')) : ?>
                        <div class="col-12 col-md-6">
                          <div class="item-card mb-5" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                            <h5 class="fw-bold"><?php the_sub_field('titulo'); ?><span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-tree.png" style="width: 24px" alt="emoji"></span></h5>
                            <div class="thumb">
                              <img src="<?php the_sub_field('imagen'); ?>" />
                            </div>
                            <div class="info circular-light"><?php the_sub_field('contenido'); ?> </div>
                          </div>
                        </div>
                      <?php endif ?>
                    <?php endwhile; ?>
                  <?php endif; ?>


                </div>
              </div>


            </div>
          </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>


  <section class="py-5 bg-white store-btn-wrapper">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal-green-cut-top.png" class="cut-asterisk d-none d-md-inline-flex" data-aos="fade-down-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="asterisk img">

    <div class="phone-1 d-none d-md-block" data-aos="fade-left" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out">
      <img src="<?php echo get_theme_file_uri(); ?>/images/phone-1.png" alt="phone">
      <div class="text">
        <img src="<?php echo get_theme_file_uri(); ?>/images/arrow.svg" class="arrow d-none d-md-inline-flex" alt="arrow">
        Compra el último envase de tu vida y <span style="color: #00ABB1; ">deja de generar desechos</span>
      </div>
    </div>

    <div class="phone-2 d-none d-md-block" data-aos="fade-up" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out">
      <img src="<?php echo get_theme_file_uri(); ?>/images/phone-2.png" alt="phone">
      <img src="<?php echo get_theme_file_uri(); ?>/images/shine-1.svg" class="shine-1" alt="shine">
      <img src="<?php echo get_theme_file_uri(); ?>/images/shine-2.svg" class="shine-2" alt="shine">
      <div class="text">Examina y <span style="color: #f1c756;">gestiona tus envases</span></div>
    </div>

    <div class="phone-3 d-none d-md-block" data-aos="fade-right" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out">
      <img src="<?php echo get_theme_file_uri(); ?>/images/phone-3.png" alt="phone">
      <div class="text">
        <img src="<?php echo get_theme_file_uri(); ?>/images/happy-face.svg" class="emoji d-none d-md-inline-flex" w alt="happy emoji">
        <?php _e('Revisa el impacto <span style="color: #f1c756;">que has generado</span>') ?>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 text-center" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
          <?php the_field('store'); ?>

          <div class="store-btn-list mt-4">
            <a href="http://" class="d-block" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_theme_file_uri(); ?>/images/store-google.png" style="height: 40px;" alt="google store">
            </a>

            <a href="http://" class="d-block" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_theme_file_uri(); ?>/images/store-apple.png" style="height: 40px;" alt="apple store">
            </a>
          </div>
        </div>
      </div>
      <div class="row d-inline-flex d-md-none mt-5">
        <div class="col-12">
          <div class="phone-1 mb-5">
            <img src="<?php echo get_theme_file_uri(); ?>/images/phone-1.png" alt="phone">
            <div class="text">
              <img src="<?php echo get_theme_file_uri(); ?>/images/arrow.svg" class="arrow d-none d-md-inline-flex" alt="arrow">
              Compra el último envase de tu vida y <span style="color: #00ABB1; ">deja de generar desechos</span>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="phone-2 mb-5">
            <img src="<?php echo get_theme_file_uri(); ?>/images/phone-2.png" alt="phone">
            <img src="<?php echo get_theme_file_uri(); ?>/images/shine-1.svg" class="shine-1" alt="shine">
            <img src="<?php echo get_theme_file_uri(); ?>/images/shine-2.svg" class="shine-2" alt="shine">
            <div class="text">Examina y <span style="color: #f1c756;">gestiona tus envases</span></div>
          </div>
        </div>
        <div class="col-12">
          <div class="phone-3">
            <img src="<?php echo get_theme_file_uri(); ?>/images/phone-3.png" alt="phone">
            <div class="text">
              <img src="<?php echo get_theme_file_uri(); ?>/images/happy-face.svg" class="emoji d-none d-md-inline-flex" w alt="happy emoji">
              Revisa el impacto <span style="color: #f1c756;">que has generado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="fullpage">
    <div id="block-1" class="section">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 col-md-6">
            <p class="fw-bold">Claves para tu primera recarga 👀 </p>
            <h2>Antes de empezar</h2>
            <p style="font-weight: 100;">Descarga la app y recuerda que no tienes que traer tus envases, nosotros te entregamos uno inteligente en tu primera compra.</p>
          </div>
          <div class="col-12 col-md-6 h-100">

            <div id="v-slider" class="v-slider d-none d-md-block">
              <!-- Slider main container -->
              <div class="swiper swiper-v">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                  <!-- Slides -->
                  <div class="swiper-slide">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/v-slide-1.png" width="300px" alt="slide 1">
                    <!-- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, eos quam. Facere voluptatem deserunt omnis reiciendis debitis asperiores alias reprehenderit. -->
                  </div>
                  <div class="swiper-slide">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/v-slide-2.png" width="300px" alt=" slide 2">
                    <!-- ipsum dolor sit amet consectetur adipisicing elit. Earum, eos quam. Facere voluptatem deserunt omnis reiciendis debitis asperiores alias reprehenderit. -->
                  </div>
                  <div class="swiper-slide">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/v-slide-3.png" width="300px" alt=" slide 3">
                    <!-- dolor sit amet consectetur adipisicing elit. Earum, eos quam. Facere voluptatem deserunt omnis reiciendis debitis asperiores alias reprehenderit. -->
                  </div>
                </div>
                <!-- If we need pagination -->
                <!-- <div class="swiper-pagination"></div> -->
                <div class="pager">
                  <span id="slide-idx"></span>
                  <span class="pagerline">
                    <span class="bullet"></span>
                    <span class="bullet"></span>
                    <span class="bullet"></span>
                  </span>
                  <span>03</span>
                </div>

              </div>
            </div>

            <img class="d-block d-md-none" src="<?php echo get_theme_file_uri(); ?>/images/v-slide-1.png" alt="slide 1">


          </div>
        </div>
      </div>
    </div>
    <div id="block-2" class="section bg-white">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 col-md-6">
            <p class="fw-bold">Claves para tu primera recarga 😎 </p>
            <h2>Listo para empezar</h2>
            <p style="font-weight: 100;">Pon tu envase inteligente en el dispensador y comienza a recargar el futuro.</p>
          </div>
          <div class="col-12 col-md-6">
            <img class="d-block d-md-none" src="<?php echo get_theme_file_uri(); ?>/images/v-slide-2.png" alt="slide 2">
          </div>
        </div>
      </div>
    </div>
    <div id="block-3" class="section">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 col-md-6">
            <p class="fw-bold">Claves para tu primera recarga 🔄 </p>
            <h2>¡Repite!</h2>
            <p style="font-weight: 100;">Recuerda siempre volver con tu envase inteligente. ¡El planeta te lo agradecerá!</p>
          </div>
          <div class="col-12 col-md-6">
            <img class="d-block d-md-none" src="<?php echo get_theme_file_uri(); ?>/images/v-slide-3.png" alt="slide 3">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white py-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="mb-5 text-center aos-init aos-animate">Todo lo que podrás recargar</h2>
        </div>
      </div>
    </div>
    <div class="rechargeable-products">
      <div class="item">
        <div class="item-hover" style="background-color: rgba(0, 143, 255, 0.7);">
          <ul>
            <li>Omo líquido</li>
            <li>Soft</li>
            <li>Quiz</li>
            <li>Cif</li>
          </ul>
        </div>
        <div class="graph">
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/rechargeable-1.svg" alt="rechargeable-1">
        </div>
        <p style="color: rgba(0, 143, 255, 1);">Limpieza</p>
      </div>
      <div class="item">
        <div class="item-hover" style="background-color: rgba(29, 185, 84, 0.7);">
          <ul>
            <li>Dog Chow</li>
            <li>Raza grande</li>
            <li>y pequeña</li>
          </ul>
        </div>
        <div class="graph">
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/rechargeable-2.svg" alt="rechargeable-2">
        </div>
        <p style="color: rgba(29, 185, 84, 1);">Mascotas</p>
      </div>
      <div class="item">
        <div class="item-hover" style="background-color: rgba(0,0,0,0.6);">
          <ul>
            <li><b>Proximamente</b></li>
          </ul>
        </div>
        <div class="graph">
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/rechargeable-3.svg" alt="rechargeable-3">
        </div>
        <p style="color: rgba(0,0,0,1);">Bebidas</p>
      </div>
      <div class="item">
        <div class="item-hover" style="background-color: rgba(0,0,0,0.6);">
          <ul>
            <li><b>Proximamente</b></li>
          </ul>
        </div>
        <div class="graph">
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/rechargeable-4.svg" alt="rechargeable-4">
        </div>
        <p style="color: rgba(0,0,0,1);">Snacks</p>
      </div>
      <div class="item">
        <div class="item-hover" style="background-color: rgba(0,0,0,0.6);">
          <ul>
            <li><b>Proximamente</b></li>
          </ul>
        </div>
        <div class="graph">
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/rechargeable-5.svg" alt="rechargeable-5">
        </div>
        <p style="color: rgba(0,0,0,1);">Higiene</p>
      </div>
    </div>
  </section>

  <?php if (have_rows('claves_para_mi_primera_recarga')) : ?>
    <?php while (have_rows('claves_para_mi_primera_recarga')) : the_row(); ?>

      <section class="wrapper-recharge d-none">
        <div class="container">
          <div class="row">
            <div class="col">
              <h3 class="text-center mb-5"><?php the_sub_field('titulo'); ?> </h3>

              <div class="row">
                <div class="d-none d-md-inline-flex col-md-1"></div>
                <div class="d-none d-md-inline-flex col-md-3">
                  <div class="recharge-img">
                    <!-- <img src="<?php echo get_theme_file_uri(); ?>/images/recharge-img.png" class="recharge-img-1" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="recharge-img"> -->
                    <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg-2.png" class="recharge-img-2" data-aos="fade-right" data-aos-delay="350" data-aos-offset="350" data-aos-easing="ease-in-out" alt="recharge-bg">
                  </div>
                </div>
                <div class="col col-md-8">

                  <?php if (have_rows('pasos')) : ?>
                    <?php while (have_rows('pasos')) : the_row(); ?>

                      <div class="row">
                        <div class="col-4 col-md-3 d-flex justify-content-center ps-5">
                          <img src="<?php echo get_theme_file_uri(); ?>/images/step-1.svg" class="step-img" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="step-1">
                        </div>
                        <div class="col" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                          <?php the_sub_field('paso_1'); ?>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-4 col-md-3 d-flex justify-content-center pe-5">
                          <img src="<?php echo get_theme_file_uri(); ?>/images/step-2.svg" class="step-img" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="step-2">
                        </div>
                        <div class="col" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                          <?php the_sub_field('paso_2'); ?>
                        </div>
                      </div>

                      <div class="row mb-5">
                        <div class="col-4 col-md-3 d-flex justify-content-center">
                          <img src="<?php echo get_theme_file_uri(); ?>/images/step-3.svg" class="step-img" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" style="width: 40px; height: 50px;" alt="step-3">
                        </div>
                        <div class="col" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                          <?php the_sub_field('paso_3'); ?>
                        </div>
                      </div>

                    <?php endwhile; ?>
                  <?php endif; ?>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>

  <section class="gallery-carousel-wrapper py-5 d-none">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal-green.png" class="asterisk rotate" data-aos="flip-left" data-aos-delay="250" data-aos-offset="250" data-aos-easing="ease-in-out" alt="asterisk img">
    <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-carousel" data-aos="flip-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="grid image">
    <div class="container-fluid">
      <div class="row mb-5">
        <div class="col">
          <h2 class="text-center mb-5" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">Todo lo que podrás encontrar</h2>

          <div class="wrapper-carousel" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">

            <div class="swiper swiper-gallery">
              <div class="swiper-wrapper">

                <?php if (have_rows('carousel_de_imagenes')) : ?>
                  <?php while (have_rows('carousel_de_imagenes')) : the_row(); ?>

                    <div class="swiper-slide">
                      <div class="item">
                        <div class="thumb">
                          <?php if (get_sub_field('item')) : ?>
                            <img src="<?php the_sub_field('item'); ?>" />
                          <?php endif ?>
                        </div>
                      </div>
                    </div>

                  <?php endwhile; ?>
                <?php else : ?>
                  <?php // No rows found 
                  ?>
                <?php endif; ?>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

  <?php if (have_rows('recargar')) : ?>
    <?php while (have_rows('recargar')) : the_row(); ?>

      <section class="how-to-wrapper py-5">
        <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="cut-asterisk" data-aos="zoom-out-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="asterisk img">
        <div class="container">

          <h2 class="mb-5 text-center" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out"><?php the_sub_field('titulo_de_seccion'); ?></h2>

          <div class="row">
            <div class="col-12 col-md-6" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">

              <?php if (have_rows('tarjeta_1')) : ?>
                <?php while (have_rows('tarjeta_1')) : the_row(); ?>

                  <div class="link-item">
                    <div class="thumb">
                      <?php if (get_sub_field('imagen')) : ?>
                        <img src="<?php the_sub_field('imagen'); ?>" />
                      <?php endif ?>
                    </div>
                    <h5 class="my-4"><?php the_sub_field('titulo'); ?>
                      <!-- <span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-hand.png" style="width: 24px" alt="emoji"></span>  -->
                    </h5>

                    <?php if (have_rows('enlace')) : ?>
                      <?php while (have_rows('enlace')) : the_row(); ?>

                        <a href="<?php the_sub_field('url'); ?>"><?php the_sub_field('texto'); ?></a>

                      <?php endwhile; ?>
                    <?php endif; ?>
                  </div>

                <?php endwhile; ?>
              <?php endif; ?>

            </div>

            <div class="col-12 col-md-6" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">

              <?php if (have_rows('tarjeta_2')) : ?>
                <?php while (have_rows('tarjeta_2')) : the_row(); ?>

                  <div class="link-item">
                    <div class="thumb">
                      <?php if (get_sub_field('imagen')) : ?>
                        <img src="<?php the_sub_field('imagen'); ?>" />
                      <?php endif ?>
                    </div>
                    <h5 class="my-4"><?php the_sub_field('titulo'); ?>
                      <!-- <span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-hand.png" style="width: 24px" alt="emoji"></span>  -->
                    </h5>

                    <?php if (have_rows('enlace')) : ?>
                      <?php while (have_rows('enlace')) : the_row(); ?>

                        <a href="<?php the_sub_field('url'); ?>"><?php the_sub_field('texto'); ?></a>

                      <?php endwhile; ?>
                    <?php endif; ?>
                  </div>

                <?php endwhile; ?>
              <?php endif; ?>

            </div>
          </div>

        </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>

  <section class="py-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col">

          <h2 class="mb-5 text-center" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out"><?php _e('Impacto que hemos generado juntos'); ?></h2>

          <div class="wrapper-carousel" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
            <div class="swiper swiper-data">
              <div class="swiper-wrapper">

                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-1" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p><?php _e('Envases Reutilizados'); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-2" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p><?php _e('kg de Co2 evitado'); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-3" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p><?php _e('lt. de Agua Ahorrada '); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-4" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p><?php _e('Kg de plástico ahorrados'); ?></p>
                    </div>
                  </div>
                </div>
                <!-- <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-5" class="main"></div>
                      <p><?php _e('Productos'); ?></p>
                    </div>
                  </div>
                </div> -->
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-6" class="main"></div>
                      <p><?php _e('Dispensadores'); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-7" class="main"></div>
                      <p><?php _e('Países'); ?></p>
                    </div>
                  </div>
                </div>

                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/giph-impacto.gif" style="object-position: left;" alt="gif impacto">
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <?php if (have_rows('carousel_impacto')) : ?>
        <?php while (have_rows('carousel_impacto')) : the_row(); ?>
          <?php $simular_impacto = get_sub_field('simular_impacto'); ?>
          <?php if ($simular_impacto) : ?>
            <div class="text-center mt-5" data-aos="zoom-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
              <a href="<?php echo esc_url($simular_impacto); ?>" class="btn btn-primary btn-lg bg-white text-primary py-3" style="font-size: 1em; border-radius: 10px;"><?php _e('Simula tu impacto') ?> </a>
            </div>
          <?php endif; ?>
        <?php endwhile; ?>
      <?php endif; ?>

    </div>
  </section>

  <section class="py-5 position-relative">
    <div class="marquee-wrapper home-2">
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
            Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro.
          </span>
          <span class="clipped-text lineal">
            Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro.
          </span>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
            Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro.
          </span>
          <span class="clipped-text lineal">
            Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro.
          </span>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
            Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro.
          </span>
          <span class="clipped-text lineal">
            Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro.
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10 col-md-6">

          <div class="graph-wrapper text-center">
            <!-- <img src="<?php echo get_theme_file_uri(); ?>/images/recarguemos-futuro.svg" class="text-graph-5" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="recarguemos-futuro"> -->
            <div class="d-flex justify-content-center mb-5">
              <div class="recharge-img-wrapper" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <img src="<?php echo get_theme_file_uri(); ?>/images/gify-home.gif" alt="gif home">
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


  </section>
</div>

<?php
get_footer();
