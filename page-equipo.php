<?php /* Template Name: Template Equipo */ ?>

<?php get_header(); ?>

<div class="animate__animated animate__fadeIn">

  <section class="header-page">
    <img src="<?php echo get_theme_file_uri(); ?>/images/vector-lineal.png" class="cut-asterisk" data-aos="zoom-out-left" data-aos-delay="50" data-aos-offset="250" data-aos-easing="ease-in-out" alt="asterisk img" style="width: 400px; left: -5em; bottom: -8em;">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">
        <div class="col-12 col-md-7">

          <h1 class="text-center fw-bold"><?php _e('Conoce a'); ?> <br/> <span class="text-primary"><?php _e('nuestro equipo'); ?></span> </h1>

        </div>
      </div>
    </div>
  </section>

  <section class="content-page">

    <div class="team-wrapper py-5 bg-white">
      <div class="container">
        <div class="row">
          <div class="col">


            <div class="team-list">

            <?php if ( have_rows( 'equipo' ) ) : $i = 0; ?>
              <?php while ( have_rows( 'equipo' ) ) : the_row(); $i++; ?>
                <?php if ( have_rows( 'miembro' ) ) : ?>
                  <?php while ( have_rows( 'miembro' ) ) : the_row(); ?>


                    <div class="member" data-bs-toggle="modal" data-bs-target="#memberModal_<?php echo $i; ?>">
                      <div class="thumb">
                        <?php if ( get_sub_field( 'imagen' ) ) : ?>
                          <img src="<?php the_sub_field( 'imagen' ); ?>"  class="member-img-primary"/>
                        <?php endif ?>
                        <?php if ( get_sub_field( 'imagen_secundaria' ) ) : ?>
                          <img src="<?php the_sub_field( 'imagen_secundaria' ); ?>"  class="member-img-secondary"/>
                        <?php endif ?>
                      </div>
                      <div class="info">
                        <div class="name"><?php the_sub_field( 'nombre' ); ?></div>
                        <p><?php the_sub_field( 'cargo' ); ?></p>
                      </div>
                    </div>
                    
                  <?php endwhile; ?>
                <?php endif; ?>
              <?php endwhile; ?>
            <?php else : ?>
              <?php // No rows found ?>
            <?php endif; ?>

            </div>

          </div>
        </div>
      </div>
    </div>

  </section>


</div>

<?php get_footer(); ?>