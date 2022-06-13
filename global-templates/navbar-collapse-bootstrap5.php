<?php

/**
 * Header Navbar (bootstrap5)
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('understrap_container_type');
?>

<nav id="main-nav" class="navbar navbar-expand-md bg-transparent main-navbar h-100" aria-labelledby="main-nav-label">

  <h2 id="main-nav-label" class="screen-reader-text">
    <?php esc_html_e('Main Navigation', 'understrap'); ?>
  </h2>

  <!-- <div class="<?php echo esc_attr($container); ?>"> -->
  <div class="container-fluid">

    <!-- Your site title as branding in the menu -->

    <!-- <?php if (!has_custom_logo()) { ?>
  
        <?php if (is_front_page() && is_home()) : ?>
  
          <h1 class="navbar-brand mb-0"><a rel="home" href="<?php echo esc_url(home_url('/')); ?>" itemprop="url"><?php bloginfo('name'); ?></a></h1>
  
        <?php else : ?>
  
          <a class="navbar-brand" rel="home" href="<?php echo esc_url(home_url('/')); ?>" itemprop="url"><?php bloginfo('name'); ?></a>
  
        <?php endif; ?>
  
        <?php
          } else {
            the_custom_logo();
          }
        ?> -->
    <!-- end custom logo -->
    <div class="wrapper-logo">
      <a class="d-inline-flex" rel="home" href="<?php echo esc_url(home_url('/')); ?>" itemprop="url">
        <div class="logo-animated d-none d-md-flex">
          <span class="logo-wrapper">
            <img src="<?php echo get_theme_file_uri(); ?>/images/svg/logo-algramo.svg" class="logo" alt=" slide 3">
          </span>
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/isotipo-algramo.svg" class="isotipo" alt=" slide 3">
        </div>
        <div class="logo-animated d-flex d-md-none">
          <img src="<?php echo get_theme_file_uri(); ?>/images/svg/isotipo-algramo.svg" alt=" slide 3">
        </div>
      </a>
    </div>


    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle navigation', 'understrap'); ?>">
      <i class="fa-solid fa-bars"></i>
    </button>

    <!-- <div class="d-flex  justify-content-between align-items-center"> -->

    <!-- <nav id="site-navigation" class="main-navigation"> -->

    <div id="navbarNavDropdown" class="collapse navbar-collapse justify-content-between">
      <span></span>

      <?php
      if (has_nav_menu('primary')) {
        wp_nav_menu(
          array(
            'theme_location' => 'primary',
            // 'container_class' => 'collapse navbar-collapse justify-content-center',
            // 'container_id' => 'navbarNavDropdown',
            'menu_class' => 'navbar-nav ml-auto',
            'fallback_cb' => '',
            'menu_id' => 'main-menu',
            'depth' => 2,
            'walker' => new Understrap_WP_Bootstrap_Navwalker(),
          )
        );
      }
      ?>

      <!-- </nav> -->
      <!-- <div class="">
    </div> -->
      <div class="lang-selector">
        <!-- <select id="langSelector" class="form-select border-0" aria-label="Default select example">
          <option value="http://www.google.com" selected>
            <img src="<?php echo get_theme_file_uri(); ?>/images/flag-chile.svg" alt="Chile Flag"> Chile
          </option>
          <option value="http://www.youtube.com">
            <img src="<?php echo get_theme_file_uri(); ?>/images/flag-uk.svg" alt="UK Flag"> UK
          </option>
        </select> -->

        <div class="custom-select" style="width:200px;">
          <select>
            <option value="0">Select car:</option>
            <option selected value="http://cl.algramo.cl/">Chile</option>
            <option value="https://uk.algramo.cl/">UK</option>
          </select>
        </div>
      </div>
      <div class="secondary-menu">
        <?php dynamic_sidebar('header-right'); ?>
      </div>
      <!-- </div> -->

    </div>




  </div><!-- .container(-fluid) -->

</nav><!-- .site-navigation -->
<div class="header-border">
  <div class="inner-border"></div>
</div>