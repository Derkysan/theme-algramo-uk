<?php /* Template Name: Template Nuestros servicios */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="header-page">
    <img src="<?php echo get_theme_file_uri(); ?>/images/text-graph-1.svg" class="graph d-none d-md-inline-flex" alt="text graph" data-aos="fade-right" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out" style="width: 200px; left: 5em; bottom: -5em;">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">
        <div class="col-12 col-md-7">

          <h1 class="text-center fw-bold">
            <?php _e('Recarga en'); ?><span class="text-primary"> <?php _e('todas partes'); ?></span>
          </h1>

        </div>
      </div>
    </div>
  </section>

  <section class="bg-white">

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">

          <div class="services-thumb-list-wrapper">
            <h5 class="text-center mb-3">
              <?php _e('Selecciona tu lugar de recarga:'); ?>
            </h5>

            <ul class="services-thumb-list d-none d-md-flex">
              <li>
                <a href="#lider" style="background-color: #0072D2;">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-lider.svg" alt="logo">
                </a>
              </li>
              <li>
                <a href="#acuenta" style="background-color: #C22026;">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-acuenta.svg" alt="logo">
                </a>
              </li>
              <li>
                <a href="#sodimac" style="background-color: #0072CE;">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-sodimac.svg" alt="logo">
                </a>
              </li>
            </ul>
          </div>

          <div class="carousel-brands position-relative d-block d-md-none">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="#lider" style="background-color: #0072D2;">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-lider.svg" alt="logo">
                </a>
              </div>
              <div class="swiper-slide">
                <a href="#acuenta" style="background-color: #C22026;">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-acuenta.svg" alt="logo">
                </a>
              </div>
              <div class="swiper-slide">
                <a href="#sodimac" style="background-color: #0072CE;">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-sodimac.svg" alt="logo">
                </a>
              </div>
            </div>
          </div>

          <?php if ( have_rows( 'cta' ) ) : ?>
            <?php while ( have_rows( 'cta' ) ) : the_row(); ?>
              
              <?php $enlace = get_sub_field( 'enlace' ); ?>
              <?php if ( $enlace ) : ?>
                <div class="cta-btn my-5">
                  <a href="<?php echo esc_url( $enlace); ?>">
                    <?php the_sub_field( 'cta_texto' ); ?> <span><i class="fa-solid fa-angle-right"></i></span>
                  </a>
                </div>
              <?php endif; ?>

            <?php endwhile; ?>
          <?php endif; ?>

        </div>
      </div>
    </div>

  </section>

  <section class="bg-white py-5">

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-7">

          <div id="lider" class="service-wrapper">
            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h2 class="text-center">
              <?php _e('Supermercados Lider'); ?>
            </h2>
            <p class="text-center">
              <?php _e('Encuentra nuestras estaciones de recarga '); ?></br> <?php _e('mientras haces tus compras de supermercado.'); ?>
            </p>
            <div class="image-collapse-wrapper">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-1" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-2" data-aos="fade-left" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <div class="service-image">
                <img src="<?php echo get_theme_file_uri(); ?>/images/supermercados_lider_fondo_gris.png" alt="service img">
                <div class="tooltips-wrapper lider  d-none d-md-block">
                  <div class="tooltip-item dot-1">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p>
                        <?php _e('Necesitarás usar uno de nuestros envases inteligentes para tu primera recarga. Los encontrarás junto al dispensador y se pagan solo la primera vez.'); ?>
                      </p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-2">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p>
                        <?php _e('El proceso de recarga lo controlas tú mismo desde la pantalla. Es muy fácil y cómodo.'); ?>
                      </p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-3">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p>
                        <?php _e('Antes de retirar tu envase, recuerda retirar tu ticket, con él debes pagar en caja.'); ?>
                      </p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-4">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p><?php _e('Aquí insertas el envase para iniciar tu recarga. Es importante que tu envase se encuentre limpio y vacío.'); ?></p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <?php if ( have_rows( 'cta:_lider' ) ) : ?>
              <?php while ( have_rows( 'cta:_lider' ) ) : the_row(); ?>

                <?php $enlace = get_sub_field( 'enlace' ); ?>
                <?php if ( $enlace ) : ?>
                  <div class="cta-btn my-5">
                    <a href="<?php echo esc_url( $enlace); ?>">
                      <?php the_sub_field( 'cta_texto' ); ?>
                      <span><i class="fa-solid fa-angle-right"></i></span>
                    </a>
                  </div>
                <?php endif; ?>


              <?php endwhile; ?>
            <?php endif; ?>

            
          </div>

          <div id="acuenta" class="service-wrapper">
            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h2 class="text-center">
              <?php _e('SuperBodega Acuenta'); ?>
            </h2>
            <p class="text-center">
              <?php _e('Encuentra nuestras estaciones de recarga '); ?></br> <?php _e('mientras haces tus compras de supermercado.'); ?>
            </p>
            <div class="image-collapse-wrapper">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-1" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-2" data-aos="fade-left" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <div class="service-image">
                <img src="<?php echo get_theme_file_uri(); ?>/images/superbodega_cuenta_fondo_gris.png" alt="service img">
                <div class="tooltips-wrapper acuenta d-none d-md-block">
                  <div class="tooltip-item dot-1">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p><?php _e('Necesitarás usar uno de nuestros envases inteligentes para tu primera recarga. Los encontrarás junto al dispensador y se pagan solo la primera vez.'); ?></p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-2">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p><?php _e('El proceso de recarga lo controlas tú mismo desde la pantalla. Es muy fácil y cómodo.'); ?></p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-3">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p><?php _e('Aquí insertas el envase para iniciar tu recarga. Es importante que tu envase se encuentre limpio y vacío.'); ?></p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-4">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p><?php _e('Antes de retirar tu envase, recuerda retirar tu ticket, con él debes pagar en caja.'); ?></p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <?php if ( have_rows( 'cta:_acuenta' ) ) : ?>
              <?php while ( have_rows( 'cta:_acuenta' ) ) : the_row(); ?>

                <?php $enlace = get_sub_field( 'enlace' ); ?>
                <?php if ( $enlace ) : ?>
                  <div class="cta-btn my-5">
                    <a href="<?php echo esc_url( $enlace); ?>">
                      <?php the_sub_field( 'cta_texto' ); ?>
                      <span><i class="fa-solid fa-angle-right"></i></span>
                    </a>
                  </div>
                <?php endif; ?>


              <?php endwhile; ?>
            <?php endif; ?>
          </div>

          <div id="sodimac" class="service-wrapper">
            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h2 class="text-center">
              <?php _e('Sodimac'); ?>
            </h2>
            <p class="text-center">
              <?php _e('Encuentra nuestras estaciones de recarga mientras'); ?></br> <?php _e('haces tus compras del hogar.'); ?>
            </p>
            <div class="image-collapse-wrapper">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-1" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-2" data-aos="fade-left" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <div class="service-image">
                <img src="<?php echo get_theme_file_uri(); ?>/images/sodimac_fondo_gris.png" alt="service img">
                <div class="tooltips-wrapper sodimac d-none d-md-block">
                  <div class="tooltip-item dot-1">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p><?php _e('Aquí insertas el envase para iniciar tu recarga. Es importante que tu envase se encuentre limpio y vacío.'); ?></p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-2">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p>
                        <?php _e('El proceso de recarga lo controlas tú mismo desde la pantalla. Es muy fácil y cómodo.'); ?>
                      </p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-3">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p>
                        <?php _e('Necesitarás usar uno de nuestros envases inteligentes para tu primera recarga. Los encontrarás junto al dispensador y se pagan solo la primera vez.'); ?>
                      </p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                  <div class="tooltip-item dot-4">
                    <i class="fa-solid fa-plus"></i>
                    <div class="tooltip-content">
                      <p>
                        <?php _e('Antes de retirar tu envase, recuerda retirar tu ticket, con él debes pagar en caja.'); ?>
                      </p>
                      <div class="triangle-left"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <?php if ( have_rows( 'cta:_sodimac' ) ) : ?>
              <?php while ( have_rows( 'cta:_sodimac' ) ) : the_row(); ?>

                <?php $enlace = get_sub_field( 'enlace' ); ?>
                <?php if ( $enlace ) : ?>
                  <div class="cta-btn my-5">
                    <a href="<?php echo esc_url( $enlace); ?>">
                      <?php the_sub_field( 'cta_texto' ); ?>
                      <span><i class="fa-solid fa-angle-right"></i></span>
                    </a>
                  </div>
                <?php endif; ?>


              <?php endwhile; ?>
            <?php endif; ?>
          </div>

        </div>
      </div>
    </div>
  </section>

  <section class="delivery-wrapper">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="delivery-graph" alt="asterisk img">
    <div class="container">
      <?php if (have_rows('algramo_a_domicilio')) : ?>
        <?php while (have_rows('algramo_a_domicilio')) : the_row(); ?>

          <div class="row align-items-center gx-5">
            <div class="col-12 col-md-5">
              <div class="image-collapse-wrapper">
                <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-delivery" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
                <div class="service-image">
                  <?php if (get_sub_field('imagen')) : ?>
                    <img src="<?php the_sub_field('imagen'); ?>" />
                  <?php endif ?>
                  <div class="tooltips-wrapper a-domicilio d-none d-md-block">
                    <div class="tooltip-item dot-1">
                      <i class="fa-solid fa-plus"></i>
                      <div class="tooltip-content">
                        <p><?php _e('Los envases inteligentes vendrán incluidos en tu primer pedido. Después tienes que  encargarte de cuidarlos y tenerlos limpios para tu próxima recarga.'); ?></p>
                        <div class="triangle-left"></div>
                      </div>
                    </div>
                    <div class="tooltip-item dot-2">
                      <i class="fa-solid fa-plus"></i>
                      <div class="tooltip-content">
                        <p><?php _e('Nuestro equipo se encargará de recargar tus envases. Si no estarás en tu casa para recibirnos, puedes dejar tus envases con tu conserje o con algún vecino.'); ?></p>
                        <div class="triangle-left"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-7">
              <h2>
                <?php the_sub_field('titulo'); ?>
              </h2>
              <p class="mb-3">
                <?php the_sub_field('texto'); ?>
              </p>
              <?php $cta_mapa = get_sub_field('cta_mapa'); ?>
              <?php if ($cta_mapa) : ?>
                <div class="cta-btn mb-5 text-start">
                  <a href="<?php echo esc_url($cta_mapa); ?>">
                    <?php _e('Ver estaciones y productos disponibles'); ?> 
                    <span><i class="fa-solid fa-angle-right"></i></span>
                  </a>
                </div>
              <?php endif; ?>
            </div>
          </div>

        <?php endwhile; ?>
      <?php endif; ?>
    </div>
  </section>

  <?php if (have_rows('locaciones')) : ?>
    <?php while (have_rows('locaciones')) : the_row(); ?>

      <section class="locations-wrapper bg-white">
        <div class="container">
          <div class="row">
            <h4 class="fw-bolder text-center mb-5"><?php _e('Próximamente'); ?></h4>
            <?php if (have_rows('locacion')) : ?>
              <?php while (have_rows('locacion')) : the_row(); ?>

                <div class="col-12 col-md-4 mb-5 mb-md-0">
                  <div class="location-img">
                    <?php if (get_sub_field('imagen_locacion')) : ?>
                      <img src="<?php the_sub_field('imagen_locacion'); ?>" />
                    <?php endif ?>
                  </div>
                  <p><?php the_sub_field('nombre_locacion'); ?></p>
                </div>

              <?php endwhile; ?>
            <?php else : ?>
              <?php // No rows found 
              ?>
            <?php endif; ?>

          </div>
        </div>
      </section>
    <?php endwhile; ?>
  <?php endif; ?>

</div>

<?php get_footer(); ?>