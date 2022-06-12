<?php /* Template Name: Template Contacto */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="header-page">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="cut-asterisk" data-aos="zoom-out-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="asterisk img" style="width: 400px; right: -5em; bottom: -8em;">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">
        <div class="col-12 col-md-7">

          <h1 class="text-center fw-bold">Hablemos sobre cómo podemos <span class="text-primary">crear, construir y crecer juntos</span></h1>

        </div>
      </div>
    </div>
  </section>

  <section class="bg-white py-5">
    <div class="container-fluid px-5">
      <div class="row justify-content-between">
        <div class="col-12 col-md-6">
          <div class="subject-selector">
            <div class="selector">
              <p>¿Para que nos escribes?</p>
              <div id="subject-1" class="text-selector active" data-val="Postular">
                <i class="fa-solid fa-arrow-right"></i> <span>Postular</span>
              </div>
              <div id="subject-2" class="text-selector" data-val="Colaborar">
                <i class="fa-solid fa-arrow-right"></i> <span>Colaborar</span>
              </div>
              <div id="subject-3" class="text-selector" data-val="Comprar">
                <i class="fa-solid fa-arrow-right"></i> <span>Comprar</span>
              </div>
              <div id="subject-4" class="text-selector" data-val="Molestar">
                <i class="fa-solid fa-arrow-right"></i> <span>Molestar</span>
              </div>
            </div>
            <div class="graph">
              <img id="change-image" src="http://localhost:8888/prosa.cl.algramo/wp-content/themes/understrap-child/images/gif/postular.gif" alt="">
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="contact-form">
            <?php echo do_shortcode('[contact-form-7 id="691" title="Contacto"]'); ?>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>

<?php get_footer(); ?>