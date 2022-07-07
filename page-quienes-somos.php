<?php /* Template Name: Template Quiénes somos */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="content-page header-fixed">

    <div class="banner-wrapper">
      <div class="banner">
        <img src="<?php echo get_theme_file_uri(); ?>/images/banner-quienes-somos.png" alt="banner image">
        <div class="container h-100 content-banner">
          <div class="row h-100 align-items-center">
            <div class="col-6 offset-5">

              <h2>Economía circular para Todos y Todas</h2>
              <p>Empoderar a las personas a cambiar radicalmente nuestros hábitos de consumo, construyendo un futuro sustentable para esta y las próximas generaciones. </p>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline-carousel-wrapper py-5">
      <div class="container mb-3">
        <div class="row justify-content-center">
          <div class="col-8">

            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h4 class="text-center fw-bold">De un almacén en la comuna de La Granja a trabajar con las marcas más grandes del mundo ✊🏻</h4 class="text-center fw-bold">

          </div>
        </div>
      </div>

    <div class="carousel-wrapper">
      <div class="timeline-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
        </div>
      </div>
      <hr>
      <div class="timeline-swiper date">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>

    <div class="team-interactive-wrapper py-5 bg-white">
      <div class="container">
        <div class="row">
          <div class="col">

            <h4 class="text-center mb-4">Tenemos la experiencia y el talento para liderar la Refill Revolution.</h4>
            <h5 class="text-center text-primary mb-5 fw-bold">Equipo de líderes</h5>

            <div class="team-list">
              <div class="member">
                <div class="thumb">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/member.png" alt="mamber">
                </div>
                <div class="info">
                  <div class="name">Jose Manuel</div>
                  <p>CEO</p>
                </div>
              </div>
            </div>

            <div class="cta-btn my-5">
              <a href="#">¡Conoce al resto de nuestro equipo! <span><i class="fa-solid fa-angle-right"></i></span></a>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="py-5 bg-black text-white text-center">
      <div class="container">
        <div class="row">
          <div class="col">
            <p>Nuestros Reconocimientos 🌟</p>
            <h4>Ser pioneros es parte de nuestro ADN</h4>
          </div>
        </div>
      </div>
    </div>

    <div class="fullpage parallax">
      <div id="block-1" class="section" style="background-image: url('<?php echo get_theme_file_uri(); ?>/images/bg-fast-company.png');">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6">
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-fast-company.svg" alt="slide">
            </div>
            <div class="col-12 col-md-6 h-100">

              <div id="v-slider" class="v-slider d-none d-md-block">
                <div class="swiper swiper-v">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <h3>Empresa más innovadora de latinoamérica en 2015 y 2020</h3>
                    </div>
                    <div class="swiper-slide">
                      <h3>Primer lugar en el Ocean Plastic Innovation Challenge de 2019</h3>
                    </div>
                    <div class="swiper-slide">
                      <h3>Una de las 20 startups con mayor impacto social y medioambiental del 2021</h3>
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

            </div>
          </div>
        </div>
      </div>
      <div id="block-2" class="section" style="background-image: url('<?php echo get_theme_file_uri(); ?>/images/bg-natgeo.png');">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6">
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-national-geographic.svg" alt="slide">
            </div>
            <div class="col-12 col-md-6"></div>
          </div>
        </div>
      </div>
      <div id="block-3" class="section" style="background-image: url('<?php echo get_theme_file_uri(); ?>/images/bg-impacto.png');">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6">
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-impacto.svg" alt="slide">
            </div>
            <div class="col-12 col-md-6"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="slider-vertical-parallax-wrapper bg-black text-white">

      <!-- <div id="v-slider" class="v-slider d-none d-md-block">
        <div class="swiper swiper-v">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="<?php echo get_theme_file_uri(); ?>/images/v-slide-1.png" width="300px" alt="slide 1">
            </div>
            <div class="swiper-slide">
              <img src="<?php echo get_theme_file_uri(); ?>/images/v-slide-2.png" width="300px" alt=" slide 2">
            </div>
            <div class="swiper-slide">
              <img src="<?php echo get_theme_file_uri(); ?>/images/v-slide-3.png" width="300px" alt=" slide 3">
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
      </div> -->

      <!-- <div class="swiper swiper-parallax">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="https://source.unsplash.com/Dz5j0QKVUGY/1280x960" alt="" data-swiper-parallax-y="450"/>
            <div class="slide-content">
              <div class="container h-100">
                <div class="row h-100 align-items-center">
                  <div class="col">

                  </div>
                  <div class="col">
                    <h3>Empresa más innovadora de latinoamérica en 2015 y 2020</h3>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div class="swiper-slide">
            <img src="https://source.unsplash.com/HGa7kULkQWY/1280x960" alt="" data-swiper-parallax-y="450"/>
            <div class="slide-content">
              <div class="container h-100">
                <div class="row h-100 align-items-center">
                  <div class="col">

                  </div>
                  <div class="col">
                    <h3>Primer lugar en el Ocean Plastic Innovation Challenge de 2019</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <img src="https://source.unsplash.com/RRSXLJPbqEQ/1280x960" alt="" data-swiper-parallax-y="450"/>
            <div class="slide-content">
              <div class="container h-100">
                <div class="row h-100 align-items-center">
                  <div class="col">

                  </div>
                  <div class="col">
                    <h3>Una de las 20 startups con mayor impacto social y medioambiental del 2021</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="swiper-pagination"></div>
      </div> -->

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