<?php
  global
    $template_directory,
    $current_category,
    $is_category,
    $is_front_page,
    $categories,
    $queried_object;

// lazyload для фоновых картинок секции
$hero_sect_datasrc = 'url(' . $template_directory . '/img/hero-sect-img.576.jpg)';
$hero_sect_datamedia = '
(min-width:575.98px){url(' . $template_directory . '/img/hero-sect-img.768.jpg)}
(min-width:767.98px){url(' . $template_directory . '/img/hero-sect-img.1024.jpg)}
(min-width:1023.98px){url(' . $template_directory . '/img/hero-sect-img.1440.jpg)}
(min-width:1439.98px){url(' . $template_directory . '/img/hero-sect-img.1920.jpg)}
(min-width:1919.98px){url(' . $template_directory . '/img/hero-sect-img.2560.jpg)}';

    if ( $is_front_page ) {
    $hero_sect_title = '<code class="php">&lt;?php <span class="echo">echo</span></code> <span class="quote">“</span><span class="text"><span>О хакинге <br class="br"> и информационноЙ безопасности <mark class="mark">честно</mark></span><span class="quote">”</span><code class="php">?&gt;</code></span>';
  } else if ( $is_category ) {
    if ( is_page( 'category' ) ) {
      $category_title = 'Свежак';
      $category_descr = $queried_object->description . 'Свежие материалы от наших лучших авторов. Топовые материалы прямиком из-под пера. <span class="quote">”</span> <code class="php">?&gt;</code>';
    } else {
      $category_title = $queried_object->name;
      $category_descr = $queried_object->description . ' <span class="quote">”</span>
      <code class="php">?&gt;</code>';
    }
    
    $hero_sect_class = ' hero-category';
    $hero_sect_title = '<code class="php">&lt;?php <span class="echo">echo</span></code><span class="quote">“</span><span class="text"><mark class="mark">' . $category_title . '</mark></span>';
  } ?>

<section class="hero-sect<?php echo $hero_sect_class ?> container lazy" data-src="<?php echo $hero_sect_datasrc ?>" data-media="<?php echo $hero_sect_datamedia ?>"> <?php
  if ( is_page( 'category' ) ) {
    the_content();
  } else { ?>
    <h1 class="hero-sect__title"><?php echo $hero_sect_title ?></h1> <?php
    if ( $is_category || is_page( 'category' ) ) : ?>
      <p class="hero-sect__descr"><?php echo $category_descr ?></p> <?php
    endif;
  } ?>
  <img src="<?php echo $template_directory ?>/img/hero-sect-decor.svg" alt="Декор" class="hero-sect-decor">
  <div id="emoji">
    <div id="emoji__circle"></div>
    <div id="emoji__face"></div>
  </div>
</section>