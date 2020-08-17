<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- <link rel="preload" href="..." as="font" type="font/woff" crossorigin="anonymous"/> -->
  <!-- fonts preload -->
  <!-- favicons --> <?php
  wp_head() ?>
</head>

<body> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <header class="hdr container"> <?php 
  wp_nav_menu( [
    'theme_location'  => 'header_menu',
    'container'       => 'nav',
    'container_class' => 'nav hdr__nav',
    'menu_class'      => 'nav__list',
    'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
  ] ) ?>
  </header>
  <!-- requires -->

<?php
require 'layouts/mobile-menu/mobile-menu.php';
require 'layouts/side-menu/side-menu.php';
?>