<?php
/**
 * Understrap Child Theme functions and definitions
 *
 * @package UnderstrapChild
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;



/**
 * Removes the parent themes stylesheet and scripts from inc/enqueue.php
 */
function understrap_remove_scripts() {
	wp_dequeue_style( 'understrap-styles' );
	wp_deregister_style( 'understrap-styles' );

	wp_dequeue_script( 'understrap-scripts' );
	wp_deregister_script( 'understrap-scripts' );
}
add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 20 );



/**
 * Enqueue our stylesheet and javascript file
 */
function theme_enqueue_styles() {

	// Get the theme data.
	$the_theme = wp_get_theme();

	$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
	// Grab asset urls.
	$theme_styles  = "/css/child-theme{$suffix}.css";
	$theme_scripts = "/js/child-theme{$suffix}.js";

	wp_enqueue_style( 'child-understrap-styles', get_stylesheet_directory_uri() . $theme_styles, array(), $the_theme->get( 'Version' ) );
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'child-understrap-scripts', get_stylesheet_directory_uri() . $theme_scripts, array(), $the_theme->get( 'Version' ), true );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );



/**
 * Load the child theme's text domain
 */
function add_child_theme_textdomain() {
	load_child_theme_textdomain( 'understrap-child', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'add_child_theme_textdomain' );



/**
 * Overrides the theme_mod to default to Bootstrap 5
 *
 * This function uses the `theme_mod_{$name}` hook and
 * can be duplicated to override other theme settings.
 *
 * @param string $current_mod The current value of the theme_mod.
 * @return string
 */
function understrap_default_bootstrap_version( $current_mod ) {
	return 'bootstrap5';
}
add_filter( 'theme_mod_understrap_bootstrap_version', 'understrap_default_bootstrap_version', 20 );



/**
 * Loads javascript for showing customizer warning dialog.
 */
function understrap_child_customize_controls_js() {
	wp_enqueue_script(
		'understrap_child_customizer',
		get_stylesheet_directory_uri() . '/js/customizer-controls.js',
		array( 'customize-preview' ),
		'20130508',
		true
	);
}
add_action( 'customize_controls_enqueue_scripts', 'understrap_child_customize_controls_js' );

function algramo_theme_widgets_init() {
  register_sidebar(
    array(
      'name'          => esc_html__( 'Header right', 'algramo-theme' ),
      'id'            => 'sidebar-6',
      'description'   => esc_html__( 'Add widgets here.', 'algramo-theme' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer 1', 'algramo-theme' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'algramo-theme' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
	register_sidebar(
    array(
      'name'          => esc_html__( 'Footer 2', 'algramo-theme' ),
      'id'            => 'sidebar-2',
      'description'   => esc_html__( 'Add widgets here.', 'algramo-theme' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
  register_sidebar(
    array(
      'name'          => esc_html__( 'Footer 3', 'algramo-theme' ),
      'id'            => 'sidebar-3',
      'description'   => esc_html__( 'Add widgets here.', 'algramo-theme' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
  register_sidebar(
    array(
      'name'          => esc_html__( 'Footer 4', 'algramo-theme' ),
      'id'            => 'sidebar-4',
      'description'   => esc_html__( 'Add widgets here.', 'algramo-theme' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
  register_sidebar(
    array(
      'name'          => esc_html__( 'Footer 5', 'algramo-theme' ),
      'id'            => 'sidebar-5',
      'description'   => esc_html__( 'Add widgets here.', 'algramo-theme' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
  
}
add_action( 'widgets_init', 'algramo_theme_widgets_init' );

function load_swiper_scripts() {
  wp_enqueue_style( 'swiper-css', 'https://unpkg.com/swiper@8/swiper-bundle.min.css' );
  wp_enqueue_script( 'swiper-js' , 'https://unpkg.com/swiper@8/swiper-bundle.min.js', array('jquery') );
}
add_action( 'wp_enqueue_scripts', 'load_swiper_scripts' );
function load_animate_css() {
  wp_enqueue_style( 'animate-css', 'https://unpkg.com/aos@next/dist/aos.css' );
  wp_enqueue_style( 'animate-css', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' );
  wp_enqueue_style( 'style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'load_animate_css' );

/**
 * Font Awesome Kit Setup
 * 
 * This will add your Font Awesome Kit to the front-end, the admin back-end,
 * and the login screen area.
 */
if (! function_exists('fa_custom_setup_kit') ) {
  function fa_custom_setup_kit($kit_url = '') {
    foreach ( [ 'wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts' ] as $action ) {
      add_action(
        $action,
        function () use ( $kit_url ) {
          wp_enqueue_script( 'font-awesome-kit', $kit_url, [], null );
        }
      );
    }
  }
}
fa_custom_setup_kit('https://kit.fontawesome.com/b66cc28da7.js');