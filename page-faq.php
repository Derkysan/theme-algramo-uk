<?php /* Template Name: Template FAQ */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="header-page">
    <img src="<?php echo get_theme_file_uri(); ?>/images/text-graph-1.svg" class="graph d-none d-md-inline-flex" alt="text graph" data-aos="fade-right" data-aos-delay="50" data-aos-offset="50" data-aos-easing="ease-in-out" style="width: 200px; right: 5em; bottom: -5em;">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">
        <div class="col-12 col-md-7">

          <h1 class="text-center fw-bold"><span class="text-primary">Preguntas</span> Frecuentes</h1>

        </div>
      </div>
    </div>
  </section>

  <section class="bg-white py-5 position-relative">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="faq-graph" alt="asterisk img">

    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">

          <?php if ( have_rows( 'listado_de_preguntas' ) ) : ?>

            
            
            <div class="collapse-list">
              <?php while ( have_rows( 'listado_de_preguntas' ) ) : the_row(); ?>
                

                <?php $index = get_row_index(); ?>
                
                <?php if ( have_rows( 'item' ) ) : ?>
                  <?php while ( have_rows( 'item' ) ) : the_row(); ?>
                  
                    <div class="item">
                      <button class="btn btn-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#item-<?php echo $index; ?>" aria-expanded="false" aria-controls="item-<?php echo $index; ?>">

                        <span class="text-primary">
                          <?php 
                          if ( $index <= 9 ) {
                            echo '0'.$index;
                          } else {
                            echo $index;
                          }
                          ?>. 
                        </span>
                        
                        <?php the_sub_field( 'pregunta' ); ?>
                        <span class="collapse-icon">
                          <i class="fa-solid fa-plus"></i>
                        </span>
                      </button>
                      <div class="collapse" id="item-<?php echo $index; ?>">
                        <div class="card card-body border-0">
                          <?php the_sub_field( 'respuesta' ); ?>
                        </div>
                      </div>
                    </div>
  
                  <?php endwhile; ?>
                <?php endif; ?>
              <?php endwhile; ?>
            </div>          
            <?php else : ?>
              <?php echo '<h3>No se ha agregado ninguna pregunta</h3>' ?>
            <?php endif; ?>

        </div>
      </div>
    </div>

  </section>

</div>

<?php get_footer(); ?>