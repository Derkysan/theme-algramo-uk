<?php /* Template Name: Template Quiénes somos */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="content-page header-fixed">

    <?php if (have_rows('banner')) : ?>
      <?php while (have_rows('banner')) : the_row(); ?>
        <div class="banner-wrapper">
          <div class="banner">
            <?php if (get_sub_field('imagen_banner')) : ?>
              <img src="<?php the_sub_field('imagen_banner'); ?>" alt="banner image" />
            <?php endif ?>

            <div class="container h-100 content-banner">
              <div class="row h-100 align-items-center">
                <div class="col-12 col-md-6 offset-md-5">

                  <?php the_sub_field('texto_banner'); ?>

                </div>
              </div>
            </div>
          </div>
        </div>


      <?php endwhile; ?>
    <?php endif; ?>




    <div class="timeline-carousel-wrapper py-5">
      <div class="container mb-5">
        <div class="row justify-content-center">
          <div class="col-8">

            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <?php if (have_rows('linea_de_tiempo')) : ?>
              <?php while (have_rows('linea_de_tiempo')) : the_row(); ?>
                <h4 class="text-center fw-bold"><?php the_sub_field('texto_cabecera'); ?></h4>
              <?php endwhile; ?>
            <?php endif; ?>

          </div>
        </div>
      </div>
    </div>

    <div class="carousel-wrapper mb-5">
      <div class="swiper-carousel timeline-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/1.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/2.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/3.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/4.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/5.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/6.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/7.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/8.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/9.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/10.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/11.png" alt="slide timeline">
          </div>
          <div class="swiper-slide">
            <img src="<?php echo get_theme_file_uri(); ?>/images/timeline/12.png" alt="slide timeline">
          </div>
        </div>
        <div class="btn-swiper button-next"><i class="fa-solid fa-angle-right"></i></div>
        <div class="btn-swiper button-prev"><i class="fa-solid fa-angle-left"></i></div>
      </div>
    </div>


    <div class="team-wrapper interactive py-5 bg-white">
      <div class="container">
        <div class="row">
          <div class="col">

            <h4 class="text-center mb-4">
              <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.'); ?>
            </h4>
            <h5 class="text-center text-primary mb-5 fw-bold">
              <?php _e('Equipo de líderes'); ?>
            </h5>

            <?php if (have_rows('equipo')) : ?>
              <?php while (have_rows('equipo')) : the_row(); ?>

                <div class="team-list d-none d-md-flex">

                  <?php if (have_rows('listado')) : $i = 0; ?>
                    <?php while (have_rows('listado')) : the_row();
                      $i++; ?>
                      <?php if (have_rows('miembro')) : ?>
                        <?php while (have_rows('miembro')) : the_row(); ?>


                          <div class="member" data-bs-toggle="modal" data-bs-target="#memberModal_<?php echo $i; ?>">
                            <div class="thumb">
                              <?php if (get_sub_field('imagen')) : ?>
                                <img src="<?php the_sub_field('imagen'); ?>" />
                              <?php endif ?>
                            </div>
                            <div class="info">
                              <div class="name"><?php the_sub_field('nombre'); ?></div>
                              <p><?php the_sub_field('cargo'); ?></p>
                            </div>
                          </div>

                          <div class="modal fade" id="memberModal_<?php echo $i; ?>" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                              <div class="modal-content">

                                <div class="modal-body modal-member">
                                  <button type="button" class="btn btn-link close-modal" data-bs-dismiss="modal"><i class="fa-solid fa-xmark"></i></button>
                                  <div class="card-member">
                                    <div class="thumb">
                                      <?php if (get_sub_field('imagen')) : ?>
                                        <img src="<?php the_sub_field('imagen'); ?>" />
                                      <?php endif ?>
                                    </div>

                                    <div class="info">
                                      <p><?php the_sub_field('nombre'); ?> <span><?php the_sub_field('cargo'); ?></span></p>
                                      <h3><?php the_sub_field('descripcion'); ?></h3>

                                      <ul>
                                        <?php if (get_sub_field('instagram')) { ?>
                                          <li>
                                            <a class="text-decoration-none" href="<?php the_sub_field('instagram'); ?>" target="_blank"><span><i class="fa-brands fa-instagram"></i></span> Instagram</a>
                                          </li>
                                        <?php } ?>
                                        <?php if (get_sub_field('linkedin')) { ?>
                                          <li>
                                            <a class="text-decoration-none" href="<?php the_sub_field('linkedin'); ?>" target="_blank"><span><i class="fa-brands fa-linkedin-in"></i></span> Linkedin</a>
                                          </li>
                                        <?php } ?>
                                      </ul>
                                    </div>
                                  </div>

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

                <!-- Team mobile -->
                <div class="swiper swiper-team position-relative d-block d-md-none">
                  <div class="swiper-wrapper">
                    <?php if (have_rows('listado')) : $i = 0; ?>
                      <?php while (have_rows('listado')) : the_row();
                        $i++; ?>
                        <?php if (have_rows('miembro')) : ?>
                          <?php while (have_rows('miembro')) : the_row(); ?>

                            <div class="swiper-slide">
                              <div class="member" data-bs-toggle="modal" data-bs-target="#swiperMemberModal_<?php echo $i; ?>">
                                <div class="thumb">
                                  <?php if (get_sub_field('imagen')) : ?>
                                    <img src="<?php the_sub_field('imagen'); ?>" />
                                  <?php endif ?>
                                </div>
                                <div class="info">
                                  <div class="name"><?php the_sub_field('nombre'); ?></div>
                                  <p><?php the_sub_field('cargo'); ?></p>
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

                <?php if (have_rows('listado')) : $i = 0; ?>
                  <?php while (have_rows('listado')) : the_row();
                    $i++; ?>
                    <?php if (have_rows('miembro')) : ?>
                      <?php while (have_rows('miembro')) : the_row(); ?>

                      <div class="modal fade" id="swiperMemberModal_<?php echo $i; ?>" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                          <div class="modal-content">

                            <div class="modal-body modal-member">
                              <button type="button" class="btn btn-link close-modal" data-bs-dismiss="modal"><i class="fa-solid fa-xmark"></i></button>
                              <div class="card-member">
                                <div class="thumb">
                                  <?php if (get_sub_field('imagen')) : ?>
                                    <img src="<?php the_sub_field('imagen'); ?>" />
                                  <?php endif ?>
                                </div>

                                <div class="info">
                                  <p><?php the_sub_field('nombre'); ?> <span><?php the_sub_field('cargo'); ?></span></p>
                                  <h3><?php the_sub_field('descripcion'); ?></h3>

                                  <ul>
                                    <?php if (get_sub_field('instagram')) { ?>
                                      <li>
                                        <a class="text-decoration-none" href="<?php the_sub_field('instagram'); ?>" target="_blank"><span><i class="fa-brands fa-instagram"></i></span> Instagram</a>
                                      </li>
                                    <?php } ?>
                                    <?php if (get_sub_field('linkedin')) { ?>
                                      <li>
                                        <a class="text-decoration-none" href="<?php the_sub_field('linkedin'); ?>" target="_blank"><span><i class="fa-brands fa-linkedin-in"></i></span> Linkedin</a>
                                      </li>
                                    <?php } ?>
                                  </ul>
                                </div>
                              </div>

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

                

              <?php endwhile; ?>
            <?php endif; ?>





            <?php $cta_equipo = get_field('cta_equipo'); ?>
            <?php if ($cta_equipo) : ?>
              <div class="cta-btn my-5">
                <a href="<?php echo esc_url($cta_equipo); ?>">
                  <?php _e('¡Conoce al resto de nuestro equipo! '); ?>
                  <span><i class="fa-solid fa-angle-right"></i></span>
                </a>
              </div>
            <?php endif; ?>


          </div>
        </div>
      </div>
    </div>


    <div class="py-5 bg-black text-white text-center">
      <div class="container">
        <div class="row">
          <div class="col">
            <p><?php _e('Nuestros Reconocimientos'); ?> 🌟</p>
            <h4><?php _e('Ser pioneros es parte de nuestro ADN'); ?></h4>
          </div>
        </div>
      </div>
    </div>

    <div class="fullpage parallax">
      <div id="block-1" class="section" style="background-image: url('<?php echo get_theme_file_uri(); ?>/images/bg-fast-company.png');">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 text-center">
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-fast-company.svg" alt="slide">
            </div>
            <div class="col-12 col-md-6 h-100">

              <div id="v-slider" class="v-slider d-none d-md-block">
                <div class="swiper swiper-v">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <h3><?php _e('Empresa más innovadora de latinoamérica en 2015 y 2020'); ?></h3>
                    </div>
                    <div class="swiper-slide">
                      <h3><?php _e('Primer lugar en el Ocean Plastic Innovation Challenge de 2019'); ?></h3>
                    </div>
                    <div class="swiper-slide">
                      <h3><?php _e('Una de las 20 startups con mayor impacto social y medioambiental del 2021'); ?></h3>
                    </div>
                  </div>

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

              <h3 class="text-white text-center mt-5 d-block d-md-none">
                <?php _e('Empresa más innovadora de latinoamérica en 2015 y 2020'); ?>
              </h3>

            </div>
          </div>
        </div>
      </div>
      <div id="block-2" class="section" style="background-image: url('<?php echo get_theme_file_uri(); ?>/images/bg-natgeo.png');">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 text-center">
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-national-geographic.svg" alt="slide">
            </div>
            <div class="col-12 col-md-6">
              <h3 class="text-white text-center mt-5 d-block d-md-none">
                <?php _e('Primer lugar en el Ocean Plastic Innovation Challenge de 2019'); ?>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div id="block-3" class="section" style="background-image: url('<?php echo get_theme_file_uri(); ?>/images/bg-impacto.png');">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 text-center">
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-impacto.svg" alt="slide">
            </div>
            <div class="col-12 col-md-6">
              <h3 class="text-white text-center mt-5 d-block d-md-none">
                <?php _e('Una de las 20 startups con mayor impacto social y medioambiental del 2021'); ?>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-graph-wrapper">

      <div class="marquee-gif-wrapper quienes-somos">
        <div class="marquee-wrapper">
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text ">
                <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.') ?>
              </span>
              <span class="clipped-text ">
                <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.') ?>
              </span>
            </div>
          </div>
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text lineal">
                <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.') ?>
              </span>
              <span class="clipped-text lineal">
                <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.') ?>
              </span>
            </div>
          </div>
          <div class="hero-marquee">
            <div class="marquee">
              <span class="clipped-text lineal">
                <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.') ?>
              </span>
              <span class="clipped-text lineal">
                <?php _e('Tenemos la experiencia y el talento para liderar la Refill Revolution.') ?>
              </span>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-10 col-md-6">

              <div class="graph-wrapper text-center">
                <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-img d-none" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="grid image">
                <div class="d-flex justify-content-center mb-5">
                  <div class="recharge-img-wrapper" data-aos="fade-up" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out">
                    <img src="<?php echo get_theme_file_uri(); ?>/images/gif/rihanna.gif" alt="gif">
                  </div>
                </div>
              </div>
              <div class="mb-5" data-aos="fade-down" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out"><?php the_sub_field('texto'); ?></div>

            </div>
          </div>

        </div>
      </div>

    </div>

  </section>

</div>

<?php get_footer(); ?>