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
  <section class="wrapper-slider">
    <div class="slider-img">
      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="graph-1">
    </div>
    <div class="container-fluid h-100 px-5">
      <div class="row h-100 align-items-center">
        <div class="col">
          <h1>
            Creamos tecnología
            y la ponemos
            al <span class="text-primary">servicio del planeta</span>
          </h1>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="graph-1">
      <img src="<?php echo get_theme_file_uri(); ?>/images/vector-solid.png" class="asterisk" alt="asterisk">
      <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg.png" alt="graph-1">
    </div>
    <!-- <h2>Algramo es la nueva forma de reutilizar. Algramo es la nueva forma de reutilizar</h2> -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-7 text-center">
          <p class="mt-5 mb-3">Tomamos los aprendizajes del pasado, la innovación del presente, y las ganas de recargar el futuro. Con todo esto, creamos una plataforma circular que te permite comprar tus productos favoritos en envases reutilizables, y sin pagar de más. </p>
          <h3 class="text-primary">Adiós plásticos de un solo uso 👋🏻</h3>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="wrapper-carousel">

      <div class="swiper swiper-products">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="item">
              <div class="thumb">
                <img src="<?php echo get_theme_file_uri(); ?>/images/characteristic-1.png" alt="car-item">
              </div>
              <div class="info">
                <h4>La App que el mundo necesita 🌎</h4>
                <p>Queremos ayudarte a incorporar nuevos hábitos de consumo que te hacen bien a tí y al planeta. Crea un perfil Algramer, recarga tus productos favoritos, visualiza tus recargas y el impacto ambiental que generas tú y la comunidad Algramo con cada una de ellas. </p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="item">
              <div class="thumb">
                <img src="<?php echo get_theme_file_uri(); ?>/images/characteristic-1.png" alt="car-item">
              </div>
              <div class="info">
                <h4>La App que el mundo necesita 🌎</h4>
                <p>Queremos ayudarte a incorporar nuevos hábitos de consumo que te hacen bien a tí y al planeta. Crea un perfil Algramer, recarga tus productos favoritos, visualiza tus recargas y el impacto ambiental que generas tú y la comunidad Algramo con cada una de ellas. </p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="item">
              <div class="thumb">
                <img src="<?php echo get_theme_file_uri(); ?>/images/characteristic-1.png" alt="car-item">
              </div>
              <div class="info">
                <h4>La App que el mundo necesita 🌎</h4>
                <p>Queremos ayudarte a incorporar nuevos hábitos de consumo que te hacen bien a tí y al planeta. Crea un perfil Algramer, recarga tus productos favoritos, visualiza tus recargas y el impacto ambiental que generas tú y la comunidad Algramo con cada una de ellas. </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>

  <section class="wrapper-quote bg-primary text-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h3 class="mb-5">"El impacto social y medioambiental deben ir siempre de la mano"</h3>
          <p>José Manuel Moller. Fundador y CEO de Algramo.</p>
        </div>
        <div class="col-4">
          <!-- <img src="" alt="quote img"> -->
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <h2 class="mb-5 text-center">Ahora tu compra es inteligente</h2>

          <div class="card-items">
            <div class="row">
              <div class="col">
                <div class="item-card">
                  <h4>Más económica 💰</h4>
                  <div class="thumb">
                    <img src="" alt="card img">
                  </div>
                  <div class="info">¿Sabías qué… cada vez que compras algo, estás pagando el producto, pero el envase en que viene también? Con Algramo, pagas el envase SOLO LA PRIMERA VEZ y luego pagas solo el producto. Puedes ahorrar hasta un 30% reutilizando con Algramo, ¿qué mejor?</div>
                </div>
              </div>
              <div class="col">
                <div class="item-card">
                  <h4>Más sustentable 🌳</h4>
                  <div class="thumb">
                    <img src="" alt="card img">
                  </div>
                  <div class="info">Recárgalo una y mil veces, cada recarga lo vale, cada una de ellas significa un desecho menos sobre el planeta. Verás el gran impacto que tienen tus pequeñas acciones, cuánto le ahorras al planeta en CO2, plástico y agua. Es de verdad hermoso.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>

  <section class="py-5 bg-white">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <h3>Todo comienza con esta App</h3>
          <p>Compra tus productos favoritos en envases reutilizables (ya sea a domicilio o en la estación de recarga más cercana) y revisa el plástico que has evitado en semanas, meses y años. Te encantará.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="wrapper-recharge">
    <div class="container">
      <div class="row">
        <div class="col">
          <h3 class="text-center mb-5">Claves para mi primera recarga </h3>

          <div class="row">
            <div class="col col-md-1"></div>
            <div class="col col-md-3">
              <div class="recharge-img">
                <img src="<?php echo get_theme_file_uri(); ?>/images/recharge-img.png" class="recharge-img-1" alt="recharge-img">
                <img src="<?php echo get_theme_file_uri(); ?>/images/book-bg-2.png" class="recharge-img-2" alt="recharge-bg">
              </div>
            </div>
            <div class="col col-md-8">

              <div class="row">
                <div class="col-3 ps-5">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/paso-1.png" alt="step-1">
                </div>
                <div class="col">
                  <h4>Antes de partir… 🤞🏻</h4>
                  <ul>
                    <li>Descarga la app, crea una cuenta y comienza como Algramer Aprendiz</li>
                    <li>Revisa tus productos favoritos y cómo quieres obtenerlos</li>
                    <li>No tienes que traer tus envases desechables, nosotros te entregamos uno inteligente</li>
                  </ul>
                </div>
              </div>

              <div class="row">
                <div class="col-3 pe-5">
                  <img src="<?php echo get_theme_file_uri(); ?>/images/paso-2.png" alt="step-2">
                </div>
                <div class="col">
                  <h4>¡Estamos listos! 😎</h4>
                  <ul>
                    <li>Pon tu envase inteligente en el dispensador y comienza esta aventura</li>
                    <li>Con cada recarga irás progresando en tu nivel de impacto hasta ser un Algramer Supremo</li>
                  </ul>
                </div>
              </div>

              <div class="row">
                <div class="col-3">...</div>
                <div class="col">
                  <h4>¡Repítelo! 🔄</h4>
                  <ul>
                    <li>Recuerda volver con tu envase inteligente. ¡El planeta te lo agradecerá!</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-white">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h2 class="text-center mb-5">Todo lo que podrás encontrar</h2>

          <div class="wrapper-carousel ps-5">

            <div class="swiper swiper-gallery ps-4">
              <div class="swiper-wrapper">

                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/characteristic-1.png" alt="car-item">
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
      <h2 class="mb-5 text-center">¿Cómo quieres recargar?</h2>
      <div class="row">
        <div class="col">
          <div class="link-item">
            <div class="thumb">
              <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="link-img">
            </div>
            <h5 class="my-4">Estaciones de recarga 📍</h5>
            <a href="">Ver estaciones de recarga →</a>
          </div>
        </div>

        <div class="col">
          <div class="link-item">
            <div class="thumb">
              <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="link-img">
            </div>
            <h5 class="my-4">Delivery a tu casa 🚗</h5>
            <a href="">Pedir a domicilio →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

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
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="thumb">
                      <img src="<?php echo get_theme_file_uri(); ?>/images/fff.png" alt="car-item">
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="text-center mt-5">
        <a href="" class="btn btn-primary btn-lg bg-white text-primary">Simula tu impacto </a>
      </div>
    </div>
  </section>

  <section class="py-5">
    <h1>Recarguemos el futuro. Recarguemos el futuro. Recarguemos el futuro. </h1>
    <img src="" alt="graph">
  </section>
</div>

<?php
get_footer();
