<?php
  global
    $template_directory,
    $queried_object,
    $is_category,
    $is_front_page,
    $categories ?>
<div class="articles-wrapper">
  <aside class="side-menu">
    <img src="<?php echo $template_directory ?>/img/side-menu-decor.svg" alt="Декор" class="side-menu-decor">
    <a href="/" class="side-menu__logo">
      <img src="<?php echo $template_directory . '/img/logo.png' ?>" alt="Логотип CyberSec" title="На главную" class="side-menu__logo-img">
    </a> <?php 
    wp_nav_menu( [
      'theme_location'  => 'side_menu',
      'container'       => 'nav',
      'container_class' => 'side-menu__nav',
      'menu_class'      => 'nav__list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
  </aside> 
  <div class="articles-content"> <?php
  if ( is_page( 'category' ) ) {
    $is_category = true;
    $is_category_page = true;
  }
  if ( $is_category ) {
    $numberposts = 12;
    $category_slug = $queried_object->slug;
    $category_id = $is_category_page ? 0 : $queried_object->term_id;
    $category_count = $is_category_page ? wp_count_posts()->publish : $queried_object->count;

    $sect_id = 'data-category-id="' . $category_id . '" data-posts-count="' . $category_count . '"';
    $sect_title = $queried_object->name;

    $posts = get_posts( [
      'numberposts' => $numberposts,
      'category_name' => $category_slug
    ] );

    print_article( $is_front_page, $is_category, $posts, $sect_id, $sect_title );

  } else if ( $is_front_page ) {
    if ( $categories ) :
      for ( $i = 0; $i <= count( $categories ); $i++ ) :
        if ( $i === 0 ) {
          $posts = get_posts( [
            'numberposts' => 4
          ] );
          $sect_id = 'id="fresh"';
          $sect_title = 'Свежак';
          $sect_href = 'category';
          print_article( $is_front_page, $is_category, $posts, $sect_id, $sect_title, $sect_href );
          
        } else {
          $category_slug = $categories[$i - 1]->slug;
          $posts = get_posts( [
            'numberposts' => 4,
            'category_name' => $category_slug
          ] );
          $sect_id = 'id="' . $category_slug . '"';
          $sect_title = $categories[$i - 1]->name;
          $sect_href = get_term_link( $categories[$i - 1] );
          print_article( $is_front_page, $is_category, $posts, $sect_id, $sect_title, $sect_href );
        }
      endfor;
      wp_reset_postdata();
    endif;
  }
  get_footer() ?>
</div>
</body>
</html>