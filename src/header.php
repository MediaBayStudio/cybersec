<?php global $template_directory ?>
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
    <link rel="preload" href="<?php echo get_template_directory_uri() . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous"/> <?php
  endforeach ?>
  <!-- favicons --> <?php
  wp_head() ?>
</head>

<body> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <header class="hdr container">
    <a href="/" class="hdr__logo">
      <img src="<?php echo get_template_directory_uri() . '/img/logo.png' ?>" alt="Логотип CyberSec" title="На главную" class="hdr__logo-img">
    </a> <?php 
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'nav hdr__nav',
      'menu_class'      => 'nav__list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <svg id="hdr__search">
      <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-search' ?>"></use>
    </svg>
    <button type="button" class="burger">
      <span class="burger__box">
        <span class="burger__inner"></span>
      </span>
    </button>
  </header>
  <!-- requires -->

<?php
require 'layouts/mobile-menu/mobile-menu.php';
require 'layouts/side-menu/side-menu.php';
?>