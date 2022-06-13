<?php /* Template Name: Template Nuestros servicios */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="header-page">
    <img src="<?php echo get_theme_file_uri(); ?>/images/text-graph-1.svg" class="graph d-none d-md-inline-flex" alt="text graph" data-aos="fade-right" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out" style="width: 200px; left: 5em; bottom: -5em;">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">
        <div class="col-12 col-md-7">

          <h1 class="text-center fw-bold">Recarga en<span class="text-primary"> todas partes</span></h1>

        </div>
      </div>
    </div>
  </section>

  <section class="bg-white">

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">

          <div class="services-thumb-list-wrapper">
            <h5 class="text-center mb-3">Selecciona tu lugar de recarga:</h5>

            <ul class="services-thumb-list">
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

          <div class="cta-btn my-5">
            <a href="#">Encuéntranos en el mapa <span><i class="fa-solid fa-angle-right"></i></span></a>
          </div>

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
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h2 class="text-center">Supermercados Lider</h2>
            <p class="text-center">Encuentra nuestras estaciones de recarga mientras</br> haces tus compras de supermercado.</p>
            <div class="image-collapse-wrapper">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-1" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-2" data-aos="fade-left" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <div class="service-image">
                <img src="<?php echo get_theme_file_uri(); ?>/images/service-1.png" alt="service img">
              </div>
              <div class="service-image-collapse">
                <p class="mb-0">
                  <button class="btn btn-circle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                  </div>
                </div>
              </div>
            </div>

            <div class="cta-btn my-5">
              <a href="#">Ver estaciones y productos disponibles <span><i class="fa-solid fa-angle-right"></i></span></a>
            </div>
          </div>

          <div id="acuenta" class="service-wrapper">
            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h2 class="text-center">SuperBodega Acuenta</h2>
            <p class="text-center">Encuentra nuestras estaciones de recarga mientras</br> haces tus compras de supermercado.</p>
            <div class="image-collapse-wrapper">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-1" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-2" data-aos="fade-left" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <div class="service-image">
                <img src="<?php echo get_theme_file_uri(); ?>/images/service-2.png" alt="service img">
              </div>
              <div class="service-image-collapse">
                <p class="mb-0">
                  <button class="btn btn-circle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                  </div>
                </div>
              </div>
            </div>

            <div class="cta-btn my-5">
              <a href="#">Ver estaciones y productos disponibles <span><i class="fa-solid fa-angle-right"></i></span></a>
            </div>
          </div>

          <div id="sodimac" class="service-wrapper">
            <div class="d-flex justify-content-center mb-5">
              <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.svg" class="asterisk" data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-out" alt="asterisk img">
            </div>
            <h2 class="text-center">Sodimac</h2>
            <p class="text-center">Encuentra nuestras estaciones de recarga mientras</br> haces tus compras de supermercado.</p>
            <div class="image-collapse-wrapper">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-1" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-service-2" data-aos="fade-left" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
              <div class="service-image">
                <img src="<?php echo get_theme_file_uri(); ?>/images/service-3.png" alt="service img">
              </div>
              <div class="service-image-collapse">
                <p class="mb-0">
                  <button class="btn btn-circle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                  </div>
                </div>
              </div>
            </div>

            <div class="cta-btn my-5">
              <a href="#">Ver estaciones y productos disponibles <span><i class="fa-solid fa-angle-right"></i></span></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <section class="delivery-wrapper">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="delivery-graph" alt="asterisk img">
    <div class="container">
      <div class="row align-items-center gx-5">
        <div class="col-12 col-md-5">
          <div class="image-collapse-wrapper">
            <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" class="grid-delivery" data-aos="fade-right" data-aos-delay="150" data-aos-offset="200" data-aos-easing="ease-in-out" alt="grid image">
            <div class="service-image">
              <img src="<?php echo get_theme_file_uri(); ?>/images/characteristic-1.png" alt="service img">
            </div>
            <div class="service-image-collapse">
              <p class="mb-0">
                <button class="btn btn-circle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </p>
              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7">
          <h2>Algramo a domicilio</h2>
          <p class="mb-3">Pide tus recargas a domicilio y te visitaremos en la puerta de tu casa.</p>
          <div class="cta-btn mb-5 text-start">
            <a href="#">Ver mapa de cobertura y productos disponibles <span><i class="fa-solid fa-angle-right"></i></span></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="locations-wrapper bg-white">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 mb-5 mb-md-0">
          <div class="location-img">
            <img src="<?php echo get_theme_file_uri(); ?>/images/categoria-1.png" alt="">
          </div>
          <p>Colegios y universidades 🎓</p>
        </div>
        <div class="col-12 col-md-4 mb-5 mb-md-0">
          <div class="location-img">
            <img src="<?php echo get_theme_file_uri(); ?>/images/categoria-1.png" alt="">
          </div>
          <p>Minimarkets 🥑</p>
        </div>
        <div class="col-12 col-md-4 mb-5 mb-md-0">
          <div class="location-img">
            <img src="<?php echo get_theme_file_uri(); ?>/images/categoria-1.png" alt="">
          </div>
          <p>Estaciones de servicio 🚘</p>
        </div>
      </div>
    </div>
  </section>

</div>

<?php get_footer(); ?>