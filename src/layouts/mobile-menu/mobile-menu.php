<?php global $template_directory, $categories ?>
<aside class="mobile-menu">
  <div class="mobile-menu__cnt">
    <div class="mobile-menu__hdr">
      <a href="/" class="mobile-menu__logo">
        <img src="<?php echo $template_directory . '/img/logo.png' ?>" alt="Логотип CyberSec" class="mobile-menu__logo-img">
      </a>
    </div> <?php
    if ( $categories ) : ?>
      <menu class="mobile-menu__menu"> <?php
    endif;
    if ( is_array( $categories ) ) :
      foreach ( $categories as $category ) : ?>
        <li class="mobile-menu__menu-item">
          <a href="<?php echo get_term_link( $category ) ?>" class="mobile-menu__menu-link"><?php echo $category->name ?></a>
        </li> <?php
      endforeach;
    endif;
    if ( $categories ) : ?>
      </menu> <?php
    endif;
    wp_nav_menu( [
      'theme_location'  => 'footer_menu',
      'container'       => 'nav',
      'container_class' => 'nav menu__nav',
      'menu_class'      => 'nav__list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
  </div>
</aside>