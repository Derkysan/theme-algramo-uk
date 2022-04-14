<?php /* Template Name: Template Simula tu impacto */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="banner-header simular-impacto py-5">

    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center mb-5 text-center">
        <div class="col">

          <div class="row align-items-center justify-content-center h-100">
            <div class="col text-center">
              <?php if (get_field('banner')) : ?>
                <?php the_field('banner'); ?>
              <?php endif; ?>
            </div>
          </div>

          <div class="row justify-content-center mt-5">
            <div class="col-12 col-md-8">

              <div class="row">
                <div class="col">
                  <select id="products" class="form-select" aria-label="Default select example">
                    <option selected value="0">Producto</option>
                    <option class="circular-book" value="1">Detergente</option>
                    <option value="2">Lavalozas</option>
                    <option value="3">Limpiapisos</option>
                    <option value="4">Suavizante</option>
                    <option value="5">Antigrasa</option>
                    <option value="6">Todos los productos de limpieza</option>
                  </select>
                </div>
                <div class="col">
                  <select id="frequency" class="form-select" aria-label="Default select example">
                    <option selected value="0">Frecuencia de compra</option>
                    <option class="circular-book" value="1">Una vez cada 15 días</option>
                    <option value="2">Una vez al mes</option>
                    <option value="3">Una vez cada 2 meses</option>
                    <option value="4">Una vez cada 3 meses</option>
                    <option value="5">Una vez cada 6 meses</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>

  </section>

  <section class="py-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col">

          <div class="wrapper-carousel data-2">
            <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-carousel" alt="grid image">
            <div class="swiper swiper-data">
              <div class="swiper-wrapper">

                <div class="swiper-slide">
                  <div class="item">
                    <div class="data">
                      <div id="simulaData1" class="main"></div>
                      <p>Envases Reutilizados</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide" style="background-color: #5484EC;">
                  <div class="item">
                    <div class="data">
                      <div id="simulaData2" class="main"></div>
                      <p>de plástico ahorrado</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide" style="background-color: #8A25F5;">
                  <div class="item">
                    <div class="data">
                      <div id="simulaData3" class="main"></div>
                      <p>Co2 Evitado</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/giph-impacto-2.gif" style="object-position: left;" alt="gif impacto">
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

  <section class="py-5">
    <div class="container">

      <?php if ( have_rows( 'texto-imagen' ) ) : ?>
        <?php while ( have_rows( 'texto-imagen' ) ) : the_row(); ?>

          <div class="row justify-content-center text-center">
            <div class="col-12 col-md-8 pt-3">

              <?php the_sub_field( 'texto' ); ?>

            </div>
          </div>

          <div class="row mb-5 pb-5">
            <div class="col">
              <div class="graph-wrapper text-center mt-3">
                <img src="<?php echo get_theme_file_uri(); ?>/images/cada-recarga-cuenta-sumate-a-recargar-el-futuro.svg" class="text-graph-4" alt="cada-recarga-cuenta-sumate-a-recargar-el-futuro">
                <div class="graph-img">
                  <?php if ( get_sub_field( 'imagen' ) ) : ?>
                    <img src="<?php the_sub_field( 'imagen' ); ?>" />
                  <?php endif ?>
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