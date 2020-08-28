<?php
  global
    $body_id,
    $site_url,
    $template_directory,
    $current_category,
    $is_category,
    $is_front_page,
    $categories,
    $queried_object ?>
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- fonts preload --> <?php
  $fonts = [
    'AnonymousPro-Bold.woff',
    'Montserrat-Regular.woff',
    'Montserrat-SemiBold.woff',
    'PressStart2P-Regular.woff'
  ];
  foreach ( $fonts as $font ) : ?>

    <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous"/> <?php
  endforeach;
  if ( !$is_category && !$is_front_page ) : ?>
    <style>
      .hdr {
        background: #2D2D2D;
      }
    </style> <?php
  endif ?>
  
  <!-- favicons --> 
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#2d2d2d">
  <meta name="theme-color" content="#ffffff"> <?php
  wp_head() ?>
</head>

<body <?php echo $body_id ?> data-template-directory="<?php echo $template_directory ?>" data-siteurl="<?php echo $site_url ?>"> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <header class="hdr container">
    <a href="/" class="hdr__logo">
      <img src="<?php echo $template_directory . '/img/logo.png' ?>" alt="Логотип CyberSec" title="На главную" class="hdr__logo-img">
    </a> <?php 
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'nav hdr__nav',
      'menu_class'      => 'nav__list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <button type="button" id="search-btn">
      <svg class="search-icon">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-search' ?>"></use>
      </svg>
    </button>
    <button type="button" class="burger">
      <span class="burger__box">
        <span class="burger__inner"></span>
      </span>
    </button> <?php
    require 'layouts/mobile-menu/mobile-menu.php' ?>
  </header>