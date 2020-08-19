<?php global $template_directory ?>
<footer class="ftr">
  <a href="/" class="ftr__logo">
    <img src="<?php echo $template_directory . '/img/logo.png' ?>" alt="Логотип CyberSec" title="На главную" class="ftr__logo-img">
  </a>
  <div class="ftr__copy">
    &copy; <?php echo date( 'Y' ) ?> CyberSec. <br class="br">
    All rights reserved.
  </div> <?php
  global $categories;
  if ( $categories ) : ?>
    <menu class="ftr__menu"> <?php
  endif;
  foreach ( $categories as $category ) : ?>
      <li class="ftr__menu-item">
        <a href="<?php echo get_term_link( $category ) ?>" class="ftr__menu-link"><?php echo $category->name ?></a>
      </li> <?php
  endforeach;
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
    <a href="policy.pdf" rel="noopener noreferrer nofollow" target="_blank" class="ftr__policy" title="Посмотреть политику конфиденциальности">Политика конфиденциальности</a>
    <div class="ftr__dev">
      <span class="ftr__dev-text">Дизайн и разработка – </span>
      <a href="https://media-bay.ru" rel="noopener noreferrer nofollow" target="_blank" class="ftr__dev-link">media bay</a>
    </div>
  </div>
</footer>
<?php
wp_footer();
require 'layouts/overlay/overlay.php';
require 'layouts/search-popup/search-popup.php';
require 'layouts/thanks-popup/thanks-popup.php' ?>
<!-- 	</body>
</html> -->