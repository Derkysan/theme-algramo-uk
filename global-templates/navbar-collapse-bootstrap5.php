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

<nav id="main-nav" class="h-100" aria-labelledby="main-nav-label">

  <!-- <h2 id="main-nav-label" class="screen-reader-text">
    <?php esc_html_e('Main Navigation', 'understrap'); ?>
  </h2> -->

  <div class="container-fluid h-100 d-none d-md-block">
    <div class="row h-100 align-items-center">
      <div class="col">
        <?php
        if (has_nav_menu('primary')) {
          wp_nav_menu(
            array(
              'theme_location' => 'primary',
              'menu_class' => 'menu-desktop',
              'fallback_cb' => '',
              'menu_id' => 'main-menu',
              'depth' => 2,
              'walker' => new Understrap_WP_Bootstrap_Navwalker(),
            )
          );
        }
        ?>
      </div>
      <div class="col-2">

        <div class="wrapper-logo d-flex justify-content-center">
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

      </div>
      <div class="col">
        <div class="d-flex align-items-center justify-content-end">

          <div class="lang-selector me-5">
            <span class="flag-selected flag-cl d-none"><img id="flagSelected" src="<?php echo get_theme_file_uri(); ?>/images/svg/cl.svg" alt=" flag"></span>
            <span class="flag-selected flag-gb d-d-inline-flex"><img id="flagSelected" src="<?php echo get_theme_file_uri(); ?>/images/svg/gb.svg" alt=" flag"></span>
            <div class="custom-select">
              <select id="langSelector">
                <option value="0"></option>
                <option value="http://cl.algramo.cl/" >
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/cl.svg" alt=" flag">
                  Chile
                </option>
                <option value="https://uk.algramo.cl/" selected>
                  <img src="<?php echo get_theme_file_uri(); ?>/images/svg/gb.svg" alt=" flag">
                  UK
                </option>
              </select>
            </div>
          </div>

          <?php dynamic_sidebar('header-right'); ?>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid d-md-none">
    <nav id="main-nav" class="navbar navbar-expand-md bg-transparent main-navbar h-100" aria-labelledby="main-nav-label">

    <div class="wrapper-logo d-flex align-items-center">
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


    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle navigation', 'understrap'); ?>">
      <i class="fa-solid fa-bars"></i>
    </button> -->
    <button class="navbar-toggler mobile-menu-toggler" type="button">
      <i class="fa-solid fa-bars"></i>
    </button>

    <div class="mobile-menu-wrapper">
      <button type="button" class="btn btn-link close-menu text-decoration-none text-white"><i class="fa-solid fa-xmark fa-2x"></i></button>
      <div class="mobile-menu-body">
        <?php
          if (has_nav_menu('primary')) {
            wp_nav_menu(
              array(
                'theme_location' => 'primary',
                'menu_class' => 'navbar-nav mobile',
                'container_class' => 'mobile-menu',
                'fallback_cb' => '',
                'depth' => 2,
                'walker' => new Understrap_WP_Bootstrap_Navwalker(),
              )
            );
          }
        ?>
        <?php dynamic_sidebar('header-right'); ?>
      </div>
    </div>

    <div id="navbarNavDropdown" class="collapse navbar-collapse justify-content-between">

      <?php
      if (has_nav_menu('primary')) {
        wp_nav_menu(
          array(
            'theme_location' => 'primary',
            'menu_class' => 'navbar-nav ml-auto',
            'fallback_cb' => '',
            'menu_id' => 'main-menu',
            'depth' => 2,
            'walker' => new Understrap_WP_Bootstrap_Navwalker(),
          )
        );
      }
      ?>

      <div class="lang-selector me-5">
        <span class="flag-selected flag-cl d-inline-flex"><img id="flagSelected" src="<?php echo get_theme_file_uri(); ?>/images/svg/cl.svg" alt=" flag"></span>
        <span class="flag-selected flag-gb d-none"><img id="flagSelected" src="<?php echo get_theme_file_uri(); ?>/images/svg/gb.svg" alt=" flag"></span>
        <div class="custom-select">
          <select id="langSelector">
            <option value="0"></option>
            <option value="http://cl.algramo.cl/" >
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/cl.svg" alt=" flag">
              Chile
            </option>
            <option value="https://uk.algramo.cl/" selected>
              <img src="<?php echo get_theme_file_uri(); ?>/images/svg/gb.svg" alt=" flag">
              UK
            </option>
          </select>
        </div>
      </div>

      <div class="secondary-menu">
        <?php dynamic_sidebar('header-right'); ?>
      </div>
    </div>
  </div>

</nav><!-- .site-navigation -->
<div class="header-border">
  <div class="inner-border"></div>
</div>