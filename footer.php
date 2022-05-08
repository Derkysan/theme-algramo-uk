<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_template_part( 'sidebar-templates/sidebar', 'footerfull' ); ?>

<footer class="wrapper-footer" id="wrapper-footer">

	<div class="<?php echo esc_attr( $container ); ?>">

		<div class="row">

      <div class="col-12 col-md-4 mb-3">
        <?php dynamic_sidebar( 'footer-1' ); ?>
      </div>
      <div class="col-12 col-md-2 mb-3">
        <?php dynamic_sidebar( 'footer-2' ); ?>
      </div>
      <div class="col-12 col-md-2 mb-3">
        <?php dynamic_sidebar( 'footer-3' ); ?>
      </div>
      <div class="col-12 col-md-2 mb-3">
        <?php dynamic_sidebar( 'footer-4' ); ?>
      </div>
      <div class="col-12 col-md-2 mb-3"></div>

		</div>

    <div class="d-none d-md-block mb-5"></div>

    <div class="row" style="align-items: baseline;">
      <div class="col-12 col-md-7">
        <?php dynamic_sidebar( 'footer-5' ); ?>
      </div>
      <div class="col-12 col-md-5">
        <div class="footer-copy">
          <span><?php _e('Todos lo derechos reservados, 2022'); ?></span>
          <?php if (ICL_LANGUAGE_CODE=='en') { ?>
            <img src="<?php echo get_theme_file_uri(); ?>/images/logo-empresa-certificada_en.png" width="70" alt="logo empresa certificada">
          <?php } else { ?>
            <img src="<?php echo get_theme_file_uri(); ?>/images/logo-empresa-certificada.svg" width="70" alt="logo empresa certificada">
          <?php } ?>
        </div>
      </div>
    </div>

	</div><!-- container end -->
  
  
  <div class="dev-brand">
    <div class="container">
      <div class="row">
        <div class="col">
          <span class="me-2">Website por <b>PROSA</b></span> 
          <!-- <a href="https://www.prosaestudio.com/" target="_blank" rel="noopener noreferrer"><img src="<?php echo get_theme_file_uri(); ?>/images/" class="" alt="PROSA ESTUDIO"></a> -->
        </div>
      </div>
    </div>
  </div>
</footer><!-- wrapper end -->


</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>


<!-- <div class="col-md-12">
  <footer class="site-footer" id="colophon">
    <div class="site-info">
    <?php understrap_site_info(); ?>
    </div>
  </footer>
</div> -->
