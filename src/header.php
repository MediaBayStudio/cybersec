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
  <meta name="theme-color" content="#ffffff">
  <style>
     .preloader {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      z-index: 10;
      transition: transform 1s;
    }

    .preloader__inner {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 100%;
      fill: #fff;
      color: #fff;
      overflow: hidden;
      position: relative;
    }

    .preloader__inner::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 1;
      opacity: 0;
    }

    .preloader.loaded > .preloader__inner::after {
      animation: load .5s;
    }

    .preloader__decor,
    .preloader__logo {
      grid-row: 1;
      grid-column: 1;
      align-self: center;
      justify-self: center;
    }

    .preloader__decor {
      width: 100%;
      height: 100%;
      background:
        linear-gradient(#F2F5F4, transparent 1px) center/180px 180px,
        linear-gradient(90deg, #F2F5F4, transparent 1px) center/180px 180px,
        linear-gradient(90deg, #303030 0 0, #303030 0 0) 0 0/25% 100% no-repeat,
        linear-gradient(90deg, #303030 0 0, #303030 0 0) 25% 0/25% 100% no-repeat,
        linear-gradient(90deg, #303030 0 0, #303030 0 0) 50% 0/25% 100% no-repeat,
        linear-gradient(90deg, #303030 0 0, #303030 0 0) 75% 0/25% 100% no-repeat,
        linear-gradient(90deg, #303030 0 0, #303030 0 0) 100% 0/25% 100% no-repeat,
        url('<?php echo $template_directory ?>/img/preloader-decor.svg') 0 0/cover no-repeat #303030;
        animation: preloderBgFlash 2s infinite steps(11, end);
    }

    @keyframes preloderBgFlash {
      0% {
        background-size: 180px 180px, 180px 180px, 0% 100%, 25% 100%, 25% 100%, 25% 100%, 25% 100%, cover;
      }
      10% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 0% 100%, 25% 100%, 25% 100%, 25% 100%, cover;
      }
      20% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 0% 100%, 25% 100%, 25% 100%, cover;
      }
      30% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 25% 100%, 0% 100%, 25% 100%, cover;
      }
      40% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 25% 100%, 25% 100%, 0% 100%, cover;
      }

      50% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 25% 100%, 25% 100%, 0% 100%, cover;
      }
      60% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 25% 100%, 0% 100%, 25% 100%, cover;
      }
      70% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 0% 100%, 25% 100%, 25% 100%, cover;
      }
      80% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 0% 100%, 25% 100%, 25% 100%, 25% 100%, cover;
      }
      90% {
        background-size: 180px 180px, 180px 180px, 0% 100%, 25% 100%, 25% 100%, 25% 100%, 25% 100%, cover;
      }
      100% {
        background-size: 180px 180px, 180px 180px, 25% 100%, 25% 100%, 25% 100%, 25% 100%, 25% 100%, cover;
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes load {
      0% {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }


    .preloader__logo {
      opacity: 0;
      width: 175px;
      animation: fadeIn .5s forwards;
    }

    @media (min-width: 767.98px) {  
      .preloader__logo {
        width: 280px;
      }
    }
  </style> <?php
  wp_head() ?>
</head>

<body <?php echo $body_id ?> data-template-directory="<?php echo $template_directory ?>" data-siteurl="<?php echo $site_url ?>"> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <div class="preloader">
    <div class="preloader__inner">
      <div class="preloader__decor"></div>
      <img src="<?php echo $template_directory ?>/img/logo.png" alt="Логотип" class="preloader__logo">
    </div>
  </div>
  <script>
    window.addEventListener('load', function() {
      let preloader = document.querySelector('.preloader');
      preloader.classList.add('loaded');
      preloader.addEventListener('animationend', function() {
        if (event.animationName === 'load') {
          preloader.classList.add('hidden');
        } 
      });
    });
  </script>
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