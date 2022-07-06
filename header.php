<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$bootstrap_version = get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' );
$navbar_type       = get_theme_mod( 'understrap_navbar_type', 'collapse' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.css" />

  <link href='https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css' rel='stylesheet' />
  <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
  
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> <?php understrap_body_attributes(); ?>>
<?php do_action( 'wp_body_open' ); ?>
<div class="site" id="page">
  
  <div id="loadingPage" class="loader animate__animated animate__fadeIn">
    <img src="<?php echo get_theme_file_uri(); ?>/images/loader.gif" width="120" alt="loader">
  </div>

	<!-- ******************* The Navbar Area ******************* -->
  <?php $header_admin = is_admin_bar_showing() ? 'fixed-admin' : 'fixed-top'; ?>
  <?php $header_shadow = is_page_template( 'page-map.php' ) ? 'no-shadow' : ''; ?>
	<header id="wrapper-navbar" class="<?php echo $header_admin ?> <?php echo $header_shadow ?>">

    <a class="skip-link sr-only sr-only-focusable" href="#content"><?php esc_html_e( 'Skip to content', 'understrap' ); ?></a>
		<?php get_template_part( 'global-templates/navbar', $navbar_type . '-' . $bootstrap_version ); ?>

	</header><!-- #wrapper-navbar end -->
