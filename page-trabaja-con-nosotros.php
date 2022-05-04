<?php /* Template Name: Template Trabaja con nosotros */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="banner-header pt-5">

    <div class="container h-100">
      <div class="row align-items-center justify-content-center h-100">
        <div class="col-12 col-md-7 text-center">
          <?php if (get_field('banner')) : ?>
            <?php the_field('banner'); ?>
          <?php endif; ?>
        </div>
      </div>
    </div>

  </section>

  <?php if (have_rows('galeria_de_imagenes')) : ?>

    <section class="py-5">

      <div class="wrapper-carousel" data-aos="fade-in" data-aos-delay="50" data-aos-offset="100" data-aos-easing="ease-in-out">
        <div class="container-fluid">
          <div class="swiper swiper-gallery-2">
            <div class="swiper-wrapper">

              <?php while (have_rows('galeria_de_imagenes')) : the_row(); ?>

                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <?php if (get_sub_field('slide')) : ?>
                        <img src="<?php the_sub_field('slide'); ?>" />
                      <?php endif ?>
                    </div>
                  </div>
                </div>

              <?php endwhile; ?>

            </div>
          </div>
        </div>

      </div>

    </section>

  <?php else : ?>
    <?php // No rows found 
    ?>
  <?php endif; ?>


  <?php if (have_rows('beneficios')) : ?>
    <?php while (have_rows('beneficios')) : the_row(); ?>

      <section class="benefits-wrapper bg-white py-5">
        <div class="container text-center">
          <div class="row justify-content-center">
            <div class="col-12 col-md-8">

              <div class="mb-3">
                <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="rotate" alt="vector-solid">
              </div>
              <div data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <?php the_sub_field('texto'); ?>
              </div>

            </div>
          </div>

          <?php if (have_rows('listado')) : ?>
            <?php while (have_rows('listado')) : the_row(); ?>
              <div class="row justify-content-center pt-5 pb-0">
                <div class="col-12 col-md-11">

                  <div class="row">
                    <div class="col-12 col-md-3 mb-5" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                      <?php the_sub_field('beneficio_1'); ?>
                    </div>
                    <div class="col-12 col-md-3 mb-5" data-aos="fade-up" data-aos-delay="150" data-aos-offset="250" data-aos-easing="ease-in-out">
                      <?php the_sub_field('beneficio_2'); ?>
                    </div>
                    <div class="col-12 col-md-3 mb-5" data-aos="fade-up" data-aos-delay="250" data-aos-offset="250" data-aos-easing="ease-in-out">
                      <?php the_sub_field('beneficio_3'); ?>
                    </div>
                    <div class="col-12 col-md-3 mb-5" data-aos="fade-up" data-aos-delay="350" data-aos-offset="250" data-aos-easing="ease-in-out">
                      <?php the_sub_field('beneficio_4'); ?>
                    </div>
                  </div>

                  <p class="text-center text-primary mb-0" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">Y muchooos más</p>

                </div>
              </div>
            <?php endwhile; ?>
          <?php endif; ?>
        </div>
      </section>

    <?php endwhile; ?>
  <?php endif; ?>

  <?php if (have_rows('modalidad')) : ?>
    <?php while (have_rows('modalidad')) : the_row(); ?>

      <section class="pt-5">
        <div class="txt-img-block">
          <div class="block-1">
            <div class="txt-wrapper" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
              <?php the_sub_field('texto'); ?>
            </div>
          </div>
          <div class="block-2">
            <div class="img-wrapper" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
              <?php if (get_sub_field('imagen')) : ?>
                <img src="<?php the_sub_field('imagen'); ?>" />
              <?php endif ?>
            </div>
          </div>
        </div>

      </section>

    <?php endwhile; ?>
  <?php endif; ?>



  <section class="pb-5 position-relative">
    <div class="marquee-wrapper trabaja-con-nosotros">
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text ">
              <?php _e('Nuestra cultura Nuestra cultura')?>
          </span>
          <span class="clipped-text ">
              <?php _e('Nuestra cultura Nuestra cultura')?>
          </span>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
              <?php _e('Nuestra cultura Nuestra cultura')?>
          </span>
          <span class="clipped-text lineal">
              <?php _e('Nuestra cultura Nuestra cultura')?>
          </span>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee">
          <span class="clipped-text lineal">
              <?php _e('Nuestra cultura Nuestra cultura')?>
          </span>
          <span class="clipped-text lineal">
              <?php _e('Nuestra cultura Nuestra cultura')?>
          </span>
        </div>
      </div>
    </div>

    <div class="text-center py-5">
      <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="rotate" alt="vector-solid">
    </div>

    <?php if (have_rows('cultura')) : ?>
      <?php while (have_rows('cultura')) : the_row(); ?>

        <div class="container">
          <div class="row justify-content-center">
            <div class="col-10 col-md-6">

              <div class="graph-wrapper text-center">
                <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-img" data-aos="fade-down" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="grid image">
                <div class="d-flex justify-content-center mb-5">
                  <div class="recharge-img-wrapper" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/gif-trabaja-con-nosotros.gif" alt="gif trabaja con nosotros">
                  </div>
                </div>
              </div>
              <div class="mb-5" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <?php the_sub_field('texto'); ?>
              </div>

            </div>
          </div>
        </div>

      <?php endwhile; ?>
    <?php endif; ?>

    <?php if (have_rows('galeria_cultura')) : ?>

      <div class="wrapper-carousel" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">


        <div class="swiper swiper-gallery-2">
          <div class="swiper-wrapper">

            <?php while (have_rows('galeria_cultura')) : the_row(); ?>

              <div class="swiper-slide">
                <div class="item">
                  <div class="thumb">
                    <?php if (get_sub_field('slide')) : ?>
                      <img src="<?php the_sub_field('slide'); ?>" />
                    <?php endif ?>
                  </div>
                </div>
              </div>

            <?php endwhile; ?>

          </div>
        </div>

      </div>

    <?php else : ?>
      <?php // No rows found 
      ?>
    <?php endif; ?>

  </section>

  <section class="values-wrapper py-5">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="cut-asterisk rotate" alt="asterisk img">

    <?php if (have_rows('valores')) : ?>
      <?php while (have_rows('valores')) : the_row(); ?>

        <div class="container-fluid px-5">
          <div class="row">
            <div class="col-12 col-md-4" data-aos="fade-right" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
              <h2><?php the_sub_field('titulo_de_seccion'); ?></h2>
            </div>
            <div class="col-12 col-md-5">

              <div class="collapsible-wrapper" data-aos="fade-in" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-img" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="grid image" />
              <?php if (have_rows('desplegable')) : $i = 0; ?>

                <?php while (have_rows('desplegable')) : the_row();
                  $i++; ?>
                    <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample-<?php echo $i; ?>" aria-expanded="false" aria-controls="collapseExample">
                      <div><span class="text-primary">0<?php echo $i; ?>. </span><?php the_sub_field('titulo'); ?></div> <i class="fa-solid fa-plus"></i>
                    </button>

                    <div class="collapse" id="collapseExample-<?php echo $i; ?>">
                      <div class="card card-body">
                        <?php the_sub_field('contenido'); ?>
                      </div>
                    </div>
                    
                    <?php endwhile; ?>
                    
                    <?php else : ?>
                      <?php // No rows found 
                ?>
                </div>
              <?php endif; ?>



            </div>
            <div class="col-12 col-md-3"></div>
          </div>
        </div>


      <?php endwhile; ?>
    <?php endif; ?>

  </section>

  <?php if (have_rows('culture_crews')) : ?>
    <?php while (have_rows('culture_crews')) : the_row(); ?>

      <section class="culture-wrapper bg-white py-5">

        <div class="container">
          <div class="row justify-content-center mb-5">
            <div class="col-12 col-md-8 text-center">
              <div data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <?php the_sub_field('texto'); ?>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">

              <div class="row justify-content-center mb-5">

                <?php if (have_rows('item')) : ?>
                  <?php while (have_rows('item')) : the_row(); ?>

                    <div class="col-12 col-md-4 px-5">
                      <div class="culture-item" data-aos="fade-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                        <div class="thumb">
                          <?php if (get_sub_field('imagen')) : ?>
                            <img src="<?php the_sub_field('imagen'); ?>" />
                          <?php endif ?>
                        </div>
                        <?php the_sub_field('descripcion'); ?>
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

      </section>

    <?php endwhile; ?>
  <?php endif; ?>


  <?php if (have_rows('trabaja_con_nosotros')) : ?>
    <?php while (have_rows('trabaja_con_nosotros')) : the_row(); ?>

      <section class="py-5 text-center position-relative">
        <div class="marquee-wrapper trabaja-con-nosotros-2">
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text ">
                  <?php _e('Trabaja con nosotros Trabaja con nosotros')?>
              </span>
              <span class="clipped-text ">
                  <?php _e('Trabaja con nosotros Trabaja con nosotros')?>
              </span>
            </div>
          </div>
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text lineal">
                  <?php _e('Trabaja con nosotros Trabaja con nosotros')?>
              </span>
              <span class="clipped-text lineal">
                  <?php _e('Trabaja con nosotros Trabaja con nosotros')?>
              </span>
            </div>
          </div>
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text lineal">
                  <?php _e('Trabaja con nosotros Trabaja con nosotros')?>
              </span>
              <span class="clipped-text lineal">
                  <?php _e('Trabaja con nosotros Trabaja con nosotros')?>
              </span>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" alt="vector-solid">
        </div>

        <div class="container">
          <div class="row justify-content-center">
            <div class="col-10 col-md-6">

              <div class="graph-wrapper text-center">
                <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-img" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="grid image">
                <div class="d-flex justify-content-center mb-5">
                  <div class="recharge-img-wrapper" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/gif-trabaja-con-nosotros-2.gif" alt="gif trabaja con nosotros">
                  </div>
                </div>
              </div>
              <div class="mb-5" data-aos="fade-down" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out"><?php the_sub_field('texto'); ?></div>

            </div>
          </div>
        </div>

      </section>

    <?php endwhile; ?>
  <?php endif; ?>

  
  <section class="vacancy-wrapper py-5">
    
    <div class="container">
      <div class="row justify-content-center">

        <h4 class="text-primary text-center mb-5" data-aos="fade-down" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out"><?php _e('¡Construyamos juntos el primer unicornio circular!')?>
          <span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-unicorn.png" style="width: 24px" alt="emoji"></span> 
          <span><img src="<?php echo get_theme_file_uri(); ?>/images/emoji-world.png" style="width: 24px" alt="emoji"></span> 
        </h4>

        <div class="col-12 col-md-4">
        <?php if ( have_rows( 'vacante_provisional' ) ) : ?>
          <?php while ( have_rows( 'vacante_provisional' ) ) : the_row(); ?>
            <a href="<?php the_sub_field( 'enlace' ); ?>" target="_blank" rel="noopener noreferrer">
              <?php if ( get_sub_field( 'imagen' ) ) : ?>
                <img src="<?php the_sub_field( 'imagen' ); ?>" />
              <?php endif ?>
            </a>
          <?php endwhile; ?>
        <?php endif; ?>
        </div>
        
        <div class="d-none">
          <div class="col-10">
            <?php if (have_rows('vacantes')) : ?>
              <div class="vacancy-list">
                <?php while (have_rows('vacantes')) : the_row(); ?>
  
                  <div class="item" data-aos="fade-down" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                    <p class="mb-0"><small><?php the_sub_field('pais'); ?></small></p>
                    <h5 class="my-2"><?php the_sub_field('cargo'); ?></h5>
                    <p class="text-primary"><small>Algramo</small></p>
                    <?php the_sub_field('descripcion'); ?>
                  </div>
  
                <?php endwhile; ?>
              </div>
            <?php else : ?>
  
              <div class="vacancy-empty" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                <div class="row h-100 justify-content-center align-content-center">
                  <div class="col-12 col-md-6">
                    <p class="mb-0">Ups! No tenemos vacantes por el momento ¿Quieres insistir de cualquier forma? Insistenos a RRHH@algramo.com</p>
                  </div>
                </div>
              </div>
  
            <?php endif; ?>
          </div>
        </div>

      </div>
    </div>


  </section>



</div>

<?php get_footer(); ?>