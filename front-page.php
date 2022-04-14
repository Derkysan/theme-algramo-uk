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
    <div class="img-spin rotate">
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
                    <div class="slider-img">
                      <?php if (get_sub_field('imagen')) : ?>
                        <img src="<?php the_sub_field('imagen'); ?>" />
                      <?php endif ?>
                    </div>
                    <div class="container-fluid h-100 px-5">
                      <div class="row h-100 align-items-center">
                        <div class="col">

                          <div class="row justify-content-center">
                            <div class="col-12 col-md-10">
                              <h1>
                                <?php the_sub_field('texto'); ?>
                              </h1>
                            </div>
                          </div>

                        </div>
                        <div class="col"></div>
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

      <section class="py-5">
        <div class="graph-1 text-center">
          <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" alt="asterisk img">
          <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-img" alt="grid image">
          <img src="<?php echo get_theme_file_uri(); ?>/images/algramo-es-la-nueva-forma-de-reutilizar.svg" class="text-graph-1" alt="Algramo es la nueva forma de reutilizar.">
        </div>
        <div class="container">
          <div class="row justify-content-center mt-5 pt-3">
            <div class="col-12 col-md-7 text-center">
              <div class="mt-5 mb-5">
                <?php the_sub_field('bloque_texto'); ?>
              </div>
              <h3 class="text-primary mb-0 fw-bold"><?php the_sub_field('frase_destacada'); ?> 👋🏻</h3>
            </div>
          </div>
        </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>

  <section class="pt-2 pb-5">
    <div class="wrapper-carousel pb-5">
      <div class="swiper swiper-products">
        <div class="swiper-wrapper">
          <?php if (have_rows('carousel_grid')) : ?>
            <?php while (have_rows('carousel_grid')) : the_row(); ?>

              <?php if (have_rows('slide')) : ?>
                <?php while (have_rows('slide')) : the_row(); ?>

                  <div class="swiper-slide">
                    <div class="item">
                      <div class="thumb">
                        <?php if (get_sub_field('imagen')) : ?>
                          <img src="<?php the_sub_field('imagen'); ?>" />
                        <?php endif ?>
                      </div>
                      <div class="info">
                        <?php the_sub_field('texto'); ?>
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
      </div>
    </div>
  </section>

  <?php if (have_rows('cita')) : ?>
    <?php while (have_rows('cita')) : the_row(); ?>

      <section class="wrapper-quote bg-primary text-white py-5">
        <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal-white.png" class="asterisk" alt="asterisk img">
        <?php if (get_sub_field('imagen')) : ?>
          <img src="<?php the_sub_field('imagen'); ?>" class="quote-img" />
        <?php endif ?>
        <div class="container">
          <div class="row">
            <div class="col-6 col-md-8">
              <h3 class="pe-4">"<?php the_sub_field('cita_texto'); ?>"</h3>
              <p><?php the_sub_field('cita_info'); ?></p>
            </div>
            <div class="col-6 col-md-4">
            </div>
          </div>
        </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>


  <?php if (have_rows('compra_inteligente')) : ?>
    <?php while (have_rows('compra_inteligente')) : the_row(); ?>

      <section class="py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-8">
              <h2 class="mb-5 text-center"><?php the_sub_field('titulo'); ?></h2>

              <?php if (have_rows('item_1')) : ?>
                <?php while (have_rows('item_1')) : the_row(); ?>

                  <div class="card-items">
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <div class="item-card mb-5">
                          <h5 class="fw-bold"><?php the_sub_field('titulo'); ?></h5>
                          <div class="thumb">
                            <?php if (get_sub_field('imagen')) : ?>
                              <img src="<?php the_sub_field('imagen'); ?>" />
                            <?php endif ?>
                          </div>
                          <div class="info circular-light"><?php the_sub_field('contenido'); ?> </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="item-card mb-5">
                          <h5 class="fw-bold">Más sustentable 🌳</h5>
                          <div class="thumb">
                            <div class="img-spin rotate">
                              <img src="<?php echo get_theme_file_uri(); ?>/images/recarga-reutiliza-repite.svg" class="" alt="Recarga, reutiliza, repite">
                            </div>
                            <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                          </div>
                          <div class="info circular-light">Recárgalo una y mil veces, cada recarga lo vale, cada una de ellas significa un desecho menos sobre el planeta. Verás el gran impacto que tienen tus pequeñas acciones, cuánto le ahorras al planeta en CO2, plástico y agua. Es de verdad hermoso.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                <?php endwhile; ?>
              <?php endif; ?>

            </div>
          </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>


  <section class="py-5 bg-white store-btn-wrapper">
    <!-- <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal-green-cut.png" class="cut-asterisk" alt="asterisk img"> -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 text-center">
          <?php the_field('store'); ?>

          <div class="store-btn-list mt-4">
            <a href="http://" class="d-block" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_theme_file_uri(); ?>/images/store-google.svg" style="height: 40px;" alt="">
            </a>

            <a href="http://" class="d-block" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_theme_file_uri(); ?>/images/store-apple.svg" style="height: 40px;" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <?php if (have_rows('claves_para_mi_primera_recarga')) : ?>
    <?php while (have_rows('claves_para_mi_primera_recarga')) : the_row(); ?>

      <section class="wrapper-recharge">
        <div class="container">
          <div class="row">
            <div class="col">
              <h3 class="text-center mb-5"><?php the_sub_field('titulo'); ?> </h3>

              <div class="row">
                <div class="d-none d-md-inline-flex col-md-1"></div>
                <div class="d-none d-md-inline-flex col-md-3">
                  <div class="recharge-img">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/recharge-img.png" class="recharge-img-1" alt="recharge-img">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg-2.png" class="recharge-img-2" alt="recharge-bg">
                  </div>
                </div>
                <div class="col col-md-8">

                  <?php if (have_rows('pasos')) : ?>
                    <?php while (have_rows('pasos')) : the_row(); ?>

                      <div class="row">
                        <div class="col-4 col-md-3 ps-5">
                          <img src="<?php echo get_theme_file_uri(); ?>/images/paso-1.png" class="step-img" alt="step-1">
                        </div>
                        <div class="col">
                          <?php the_sub_field('paso_1'); ?>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-4 col-md-3 pe-5">
                          <img src="<?php echo get_theme_file_uri(); ?>/images/paso-2.png" class="step-img" alt="step-2">
                        </div>
                        <div class="col">
                          <?php the_sub_field('paso_2'); ?>
                        </div>
                      </div>

                      <div class="row mb-5">
                        <div class="col-4 col-md-3">...</div>
                        <div class="col">
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

  <section class="gallery-carousel-wrapper py-5">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal-green.png" class="asterisk" alt="asterisk img">
    <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-carousel" alt="grid image">
    <div class="container-fluid">
      <div class="row mb-5">
        <div class="col">
          <h2 class="text-center mb-5">Todo lo que podrás encontrar</h2>

          <div class="wrapper-carousel">

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
        <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="cut-asterisk" alt="asterisk img">
        <div class="container">

          <h2 class="mb-5 text-center"><?php the_sub_field('titulo_de_seccion'); ?></h2>

          <div class="row">
            <div class="col-12 col-md-6">

              <?php if (have_rows('tarjeta_1')) : ?>
                <?php while (have_rows('tarjeta_1')) : the_row(); ?>

                  <div class="link-item">
                    <div class="thumb">
                      <?php if (get_sub_field('imagen')) : ?>
                        <img src="<?php the_sub_field('imagen'); ?>" />
                      <?php endif ?>
                    </div>
                    <h5 class="my-4"><?php the_sub_field('titulo'); ?></h5>

                    <?php if (have_rows('enlace')) : ?>
                      <?php while (have_rows('enlace')) : the_row(); ?>

                        <a href="<?php the_sub_field('url'); ?>"><?php the_sub_field('texto'); ?></a>

                      <?php endwhile; ?>
                    <?php endif; ?>
                  </div>

                <?php endwhile; ?>
              <?php endif; ?>

            </div>

            <div class="col-12 col-md-6">

              <?php if (have_rows('tarjeta_2')) : ?>
                <?php while (have_rows('tarjeta_2')) : the_row(); ?>

                  <div class="link-item">
                    <div class="thumb">
                      <?php if (get_sub_field('imagen')) : ?>
                        <img src="<?php the_sub_field('imagen'); ?>" />
                      <?php endif ?>
                    </div>
                    <h5 class="my-4"><?php the_sub_field('titulo'); ?></h5>

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

          <h2 class="mb-5 text-center">Impacto que hemos generado juntos</h2>

          <div class="wrapper-carousel">
            <div class="swiper swiper-data">
              <div class="swiper-wrapper">

                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-1" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p>Envases Reutilizados</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-2" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p>Co2 Evitado</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div class="main">Lts</div>
                      <p>Agua Ahorrada</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-4" class="main" data-aos="fade-in" data-aos-id="randomize"></div>
                      <p>Tones de Plástico</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-5" class="main"></div>
                      <p>Productos</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-6" class="main"></div>
                      <p>Dispensadores</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="data-7" class="main"></div>
                      <p>Países</p>
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

      <?php if ( have_rows( 'carousel_impacto' ) ) : ?>
        <?php while ( have_rows( 'carousel_impacto' ) ) : the_row(); ?>
          <?php $simular_impacto = get_sub_field( 'simular_impacto' ); ?>
          <?php if ( $simular_impacto ) : ?>
            <div class="text-center mt-5">
              <a href="<?php echo esc_url( $simular_impacto) ; ?>" class="btn btn-primary btn-lg bg-white text-primary py-3" style="font-size: 1em; border-radius: 10px;">Simula tu impacto </a>
            </div>
          <?php endif; ?>
        <?php endwhile; ?>
      <?php endif; ?>
      
    </div>
  </section>



  <section class="py-5">
    <h1>Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro. </h1>
    <div class="d-flex justify-content-center mb-5">
      <div class="recharge-img-wrapper">
        <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="recharge-img">
      </div>
    </div>
  </section>
</div>

<?php
get_footer();
