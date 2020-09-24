<?php
  global
    $body_id,
    $site_url,
    $template_directory,
    $current_category,
    $is_category,
    $is_front_page,
    $categories,
    $queried_object;
  if ( $is_category || $is_front_page ) {
    $ftr_class = '';
  } else {
    $ftr_class = ' ftr-with-nav';
  } ?>
<footer class="ftr<?php echo $ftr_class ?>">
  <img src="#" data-src="<?php echo $template_directory ?>/img/ftr-decor.320.svg" alt="Декор" class="ftr-decor lazy" data-media="(min-width:767.98px){<?php echo $template_directory ?>/img/ftr-decor.768.svg} (min-width:1023.98px){<?php echo $template_directory ?>/img/ftr-decor.1024.svg} (min-width:1439.98px){<?php echo $template_directory ?>/img/ftr-decor.1440.svg}">
  <a href="/" class="ftr__logo">
    <img src="<?php echo $template_directory . '/img/logo.png' ?>" alt="Логотип CyberSec" title="На главную" class="ftr__logo-img">
  </a>
  <div class="ftr__copy">
    &copy; <?php echo date( 'Y' ) ?> CyberSec. <br class="br">
    All rights reserved.
    <div class="ftr__dev">
      <span class="ftr__dev-text">Разработка – </span>
      <a href="https://media-bay.ru" rel="noopener noreferrer nofollow" target="_blank" class="ftr__dev-link">media bay</a>
    </div>
  </div> <?php
  global $categories;
  if ( $categories ) : ?>
    <menu class="ftr__menu"> <?php
  endif;
  if ( is_array( $categories ) ) :
    foreach ( $categories as $category ) : if ( $category->slug === 'hot' ) continue ?>
        <li class="ftr__menu-item">
          <a href="<?php echo get_term_link( $category ) ?>" class="ftr__menu-link"><?php echo $category->name ?></a>
        </li> <?php
    endforeach;
  endif;
  if ( $categories ) : ?>
    </menu> <?php
  endif;
  wp_nav_menu( [
    'theme_location'  => 'footer_menu',
    'container'       => 'nav',
    'container_class' => 'nav ftr__nav',
    'menu_class'      => 'nav__list',
    'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
  ] ) ?>
  <div class="ftr__links">
    <a href="telegram.org" rel="noopener noreferrer nofollow" target="_blank" class="ftr__telegram">
      <svg class="telegram">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-telegram' ?>"></use>
      </svg>
    </a>
    <a href="instagram.com" rel="noopener noreferrer nofollow" target="_blank" class="ftr__instagram">
      <svg class="instagram">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-instagram' ?>"></use>
      </svg>
    </a>
  </div>
  <div class="ftr__bottom">
    <a href="policy" rel="noopener noreferrer nofollow" target="_blank" class="ftr__policy" title="Посмотреть политику конфиденциальности">Политика конфиденциальности</a>
  </div>
</footer>

<div id="fake-scrollbar"></div> <?php
// require 'layouts/overlay/overlay.php';
require 'layouts/search-popup/search-popup.php';
require 'layouts/thanks-popup/thanks-popup.php';
wp_footer() ?>
<!-- 	</body>
</html> -->