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

		<div class="row mb-5">

      <div class="col-12 col-md-4">
        <?php dynamic_sidebar( 'footer-1' ); ?>
      </div>
      <div class="col-12 col-md-2">
        <?php dynamic_sidebar( 'footer-2' ); ?>
      </div>
      <div class="col-12 col-md-2">
        <?php dynamic_sidebar( 'footer-3' ); ?>
      </div>
      <div class="col-12 col-md-2">
        <?php dynamic_sidebar( 'footer-4' ); ?>
      </div>
      <div class="col-12 col-md-2"></div>

		</div>

    <div class="row" style="align-items: baseline;">
      <div class="col">
        <?php dynamic_sidebar( 'footer-5' ); ?>
      </div>
      <div class="col">
        <div class="footer-copy">
          <span>Todos lo derechos reservados, 2022</span>
          <img src="<?php echo get_theme_file_uri(); ?>/images/logo-empresa-certificada.svg" alt="logo empresa certificada">
        </div>
      </div>
    </div>

	</div><!-- container end -->

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
