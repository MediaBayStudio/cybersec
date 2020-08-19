<div class="articles-wrapper"> <?php
  global $template_directory;
  global $categories ?>
  <aside class="side-menu">
    <a href="/" class="side-menu__logo">
      <img src="<?php echo get_template_directory_uri() . '/img/logo.png' ?>" alt="Логотип CyberSec" title="На главную" class="side-menu__logo-img">
    </a> 
    <nav class="side-menu__nav">
      <ul class="nav__list"><?php
        foreach ( $categories as $category ) : ?>   
          <li class="nav__list-item">
            <a href="<?php echo get_term_link( $category ) ?>" class="nav__link"><?php echo $category->name ?></a>
          </li> <?php
        endforeach ?>
      </ul>
    </nav>
  </aside> 
  <div class="articles-content"> <?php
  $img_placeholder_url = '/img/b.svg';
  if ( is_front_page() ) {
    $new_posts = get_posts( ['numberposts' => 0] );

    $args = [
      'sect_title' => 'Свежак',
      'sect_id' => 'fresh',
      'category_href' => 'category'
    ];

    print_singles( $new_posts, $args, 0 );

    $hot_posts = get_posts( ['numberposts' => 0, 'category' => '12'] );

    $args = [
      'sect_title' => 'Горячее',
      'sect_id' => 'hot',
      'category_href' => 'hot'
    ];

    print_singles( $hot_posts, $args, 1 );
    $i = 0;
    foreach ( $categories as $category ) {
      if ( $category->slug === 'hot' ) {
        continue;
      }
      $posts = get_posts( [
        'numberposts' => 0,
        'category' => $category->term_id
      ] );
      if ( $i === 4 ) :
        // Стили для секции subscribe лежал в папке subscribe
        $subscribe_img = 'url(' . $template_directory . '/img/subscribe-img.svg)' ?>
        <section class="subscribe-sect lazy" data-src="url(<?php echo $template_directory ?>/img/subscribe-pattern.320.svg), <?php echo $subscribe_img ?>" data-media="(min-width:767.98px){url(<?php echo $template_directory ?>/img/subscribe-pattern.768.svg), <?php echo $subscribe_img ?>} (min-width:1023.98px){url(<?php echo $template_directory ?>/img/subscribe-pattern.1024.svg), <?php echo $subscribe_img ?>} (min-width:1439.98px){url(<?php echo $template_directory ?>/img/subscribe-pattern.1440.svg), <?php echo $subscribe_img ?>}">
          <h2 class="subscribe-sect__title">Подпишись<br class="br"> на наш телеграм&#8209;канал</h2>
          <p class="subscribe-sect__descr">Получай все самые свежие и сочные новости и статьи первым</p>
          <a href="/" class="subscribe-sect__link btn">Подписаться</a>
        </section>
        <?php 
      endif;
      print_singles( $posts, $category, $i + 2 );
      $i++;
    }
  } ?>
  </div> <?php
  get_footer() ?>
</div>
</body>
</html>