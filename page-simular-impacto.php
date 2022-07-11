<?php /* Template Name: Template Simula tu impacto */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="banner-header simular-impacto">

    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center text-center">
        <div class="col">

          <div class="row align-items-center justify-content-center h-100">
            <div class="col text-center">
              <?php if (get_field('banner')) : ?>
                <?php the_field('banner'); ?>
              <?php endif; ?>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-12 col-md-8">

              <div class="row">
                <div class="col-12 col-md-6">
                  <select id="products" class="form-select mb-3 mb-md-0" aria-label="products selector">
                    <option selected disabled value="0"><?php _e('Producto'); ?></option>
                    <option class="circular-book" value="1"><?php _e('Detergente'); ?></option>
                    <option value="2"><?php _e('Lavalozas'); ?></option>
                    <option value="3"><?php _e('Limpiapisos'); ?></option>
                    <option value="4"><?php _e('Suavizante'); ?></option>
                    <option value="5"><?php _e('Antigrasa'); ?></option>
                    <option value="6"><?php _e('Todos los productos de limpieza'); ?></option>
                  </select>
                </div>
                <div class="col-12 col-md-6 mb-5 mb-md-0">
                  <select id="frequency" class="form-select" aria-label="frequency selector">
                    <option selected disabled value="0"><?php _e('Frecuencia de compra'); ?></option>
                    <option class="circular-book" value="1"><?php _e('Una vez cada 15 días'); ?></option>
                    <option value="2"><?php _e('Una vez al mes'); ?></option>
                    <option value="3"><?php _e('Una vez cada 2 meses'); ?></option>
                    <option value="4"><?php _e('Una vez cada 3 meses'); ?></option>
                    <option value="5"><?php _e('Una vez cada 6 meses'); ?></option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>

  </section>

  <section class="pb-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col">

          <div class="wrapper-carousel data-2" data-aos="fade-in" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out">
            <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-carousel" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="grid image">
            <div class="swiper swiper-data">
              <div class="swiper-wrapper">

                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="simulaData1" class="main"></div>
                      <p><?php _e('Envases Reutilizados'); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide" style="background-color: #5484EC;">
                  <div class="item">
                    <div class="data">
                      <div id="simulaData2" class="main"></div>
                      <p><?php _e('de plástico ahorrado'); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide" style="background-color: #8A25F5;">
                  <div class="item">
                    <div class="data">
                      <div id="simulaData3" class="main"></div>
                      <p><?php _e('Co2 Evitado'); ?></p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/gif/giph-impacto-2.gif" style="object-position: left;" alt="gif impacto">
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>

  <section class="py-5 position-relative simular-impacto-gif">
    <div class="marquee-wrapper simula">
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text ">
              <?php _e('Cada recarga cuenta, súmate a recargar el futuro. Cada recarga cuenta, súmate a recargar el futuro.')?>
          </span>
          <span class="clipped-text ">
              <?php _e('Cada recarga cuenta, súmate a recargar el futuro. Cada recarga cuenta, súmate a recargar el futuro.')?>
          </span>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
              <?php _e('Cada recarga cuenta, súmate a recargar el futuro. Cada recarga cuenta, súmate a recargar el futuro.')?>
          </span>
          <span class="clipped-text lineal">
              <?php _e('Cada recarga cuenta, súmate a recargar el futuro. Cada recarga cuenta, súmate a recargar el futuro.')?>
          </span>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
              <?php _e('Cada recarga cuenta, súmate a recargar el futuro. Cada recarga cuenta, súmate a recargar el futuro.')?>
          </span>
          <span class="clipped-text lineal">
              <?php _e('Cada recarga cuenta, súmate a recargar el futuro. Cada recarga cuenta, súmate a recargar el futuro.')?>
          </span>
        </div>
      </div>
    </div>
        
    <div class="container">

      <?php if (have_rows('texto-imagen')) : ?>
        <?php while (have_rows('texto-imagen')) : the_row(); ?>

          <div class="row justify-content-center text-center">
            <div class="col-10 col-md-8 pt-3">

              <div data-aos="fade-down" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <?php the_sub_field('texto'); ?>
              </div>

            </div>
          </div>

          <div class="row mb-5 pb-5">
            <div class="col">
              <div class="graph-wrapper text-center mt-3">
                <div class="d-flex justify-content-center mb-5">
                  <div class="recharge-img-wrapper" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/gif/salem.gif" alt="salem">
                  </div>
                </div>
              </div>
            </div>
          </div>

        <?php endwhile; ?>
      <?php endif; ?>

    </div>
  </section>

</div>

<?php get_footer(); ?>