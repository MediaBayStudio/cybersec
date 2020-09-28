<?php
require 'layouts/globals.php';
get_header();
the_post();
$post_ID = get_the_ID();
$href = get_the_permalink();
$title = get_the_title();
$thumbnail = get_the_post_thumbnail_url();
$thumbnail_medium = wp_get_attachment_image_url( get_post_thumbnail_id( $post_ID ), 'post_thumbnail_medium' );
$thumbnail_big = wp_get_attachment_image_url( get_post_thumbnail_id( $post_ID ), 'post_thumbnail_big' );
$post_datetime = get_the_date( 'Y-m-d', $post );
$post_date = get_the_date( 'd.m.Y', $post );
$category;
$tags = [];
$post_excerpt = kama_excerpt( [
  'maxchar'   =>  120,
  'text'      =>  get_the_excerpt( $post ),
  'autop'     =>  false,
  'ignore_more' => true
] ); ?>

<div class="breadcrumbs container">
  <ul class="breadcrumbs__list">
    <li class="breadcrumbs__item">
      <a href="/" class="breadcrumbs__link">Главная</a>
    </li> <?php
    $post_categories = get_the_terms( $post, 'category' );
    foreach ( $post_categories as $post_category ) :
      if ( $post_category->slug === 'hot' ) {
        continue;
      } ?>
      <li class="breadcrumbs__item current">
        <a href="<?php echo get_term_link( $post_category ) ?>" class="breadcrumbs__link"><?php echo $post_category->name ?></a>
      </li> <?php
      $category = $post_category;
      break;
    endforeach ?>
  </ul>
</div>

<article class="article-sect container" id="article">
  <div class="article-sect__row"> <?php
    $post_tags = get_the_terms( $post, 'post_tag' );
    if ( $post_tags ) :
      $last_post_tag = end( $post_tags ) ?>
      <div class="article-sect__tags"> <?php
    endif;
      foreach ( $post_tags as $post_tag ) :
        $last_class = $last_post_tag === $post_tag ? ' last' : '' ?>
        <a href="<?php echo get_tag_link( $post_tag->term_id ) ?>" class="article-sect__tag<?php echo $last_class ?>"><?php echo $post_tag->name ?></a> <?php
      $tags[] = $post_tag->slug;
      endforeach;
    if ( $post_tags ) : ?>
      </div> <?php
    endif
     ?>
  <time datetime="<?php echo $post_datetime ?>" class="article-sect__date"><?php echo $post_date ?></time>
  </div>
  <h1 class="article-sect__title"><?php echo $title ?></h1>
  <p class="article-sect__excerpt"><?php echo $post_excerpt ?></p>
  <div class="articles-sect__thumbnail-wrapper">
    <div class="article-sect__share">
      <a href="https://t.me/share/url?url=<?php echo $href ?>" rel="noopener noreferrer nofollow" target="_blank" class="article-sect__share-link">
        <svg class="telegram">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-telegram' ?>"></use>
        </svg>
      </a>
      <a href="https://vkontakte.ru/share.php?url=<?php echo $href ?>" rel="noopener noreferrer nofollow" target="_blank" class="article-sect__share-link">
        <svg class="vk">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-vk' ?>"></use>
        </svg>
      </a>
      <a href="http://www.facebook.com/sharer.php?s=100&p[url]=<?php echo $href ?>" rel="noopener noreferrer nofollow" target="_blank" class="article-sect__share-link last">
        <svg class="facebook">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-facebook' ?>"></use>
        </svg>
      </a>
    </div> <?php
    if ( $thumbnail ) : ?>
      <figure class="article-sect__figure">
        <img src="#" data-src="<?php echo $thumbnail_medium ?>" alt="<?php echo $title ?>" class="article-sect__img lazy" data-media="(min-width:1023.98px){<?php echo $thumbnail_big ?>}">
      </figure> <?php
    endif ?>
  </div>
  <div class="article-sect__content"> <?php
    the_content() ?>
  </div>
</article>
<div class="single-sect__author-wrapper container">
  <div class="single-sect__author"> <?php
    $author_name = get_the_author();
    $author_id = get_the_author_meta( 'ID' );
    $author_avatar = get_avatar_data( $author_id )['url'];
    $author_urls = preg_split( '/\,%20|\,\s|\,/', get_the_author_meta( 'user_url' ) );
    $author_descr = explode( ';', get_the_author_meta( 'user_description' ) );
    $author_position = array_shift( $author_descr ) ?>
    <img src="<?php echo $author_avatar ?>" alt="<?php echo $author_name ?>" title="<?php echo $author_name ?>" class="single-sect__author-img">
    <div class="author__text-block">
      <span class="single-sect__author-title"><?php echo $author_name ?></span>
      <span class="single-sect__author-position"><?php echo $author_position ?></span>
      <div class="single-sect__author-descr-block"> <?php
        foreach ( $author_descr as $descr ) :
          $descr = trim( $descr ) ?>
          <p class="single-sect__author-descr"><?php echo $descr ?></p> <?php
        endforeach ?>
      </div>
      <div class="single-sect__author-links"> <?php
        $last_url = end( $author_urls );
        foreach ( $author_urls as $author_url ) :
          $last_class = $last_url === $author_url ? ' last' : '';
          if ( strpos( $author_url, 'habr' ) !== false ) {
            $link_icon = 'habr';
          } else if ( strpos( $author_url, 'telegram' ) !== false ) {
            $link_icon = 'telegram';
          } else if ( strpos( $author_url, 'mail' ) !== false ) {
            $link_icon = 'email';
          } else if ( strpos( $author_url, 'instagram' ) !== false ) {
            $link_icon = 'instagram';
          } else {
            $link_icon = 'default';
          } ?>

          <a href="<?php echo $author_url ?>" rel="noopener noreferrer nofollow" target="_blank" class="single-sect__author-link<?php echo $last_class ?>">
            <svg class="single-sect__author-svg" color="#fff">
              <use xlink:href="<?php echo $template_directory . "/img/icons-sprite.svg#icon-{$link_icon}" ?>"></use>
            </svg>
          </a> <?php
        endforeach ?>
      </div>
    </div>
  </div>
</div> <?php
  if ( comments_open() || get_comments_number() ) {
    comments_template();
  }

  $related_posts = get_posts( [
    'category'        => $category->term_id,
    // 'tag'             => implode( ',', $tags ),
    'posts_per_page'  => 12,
    'orderby'         => 'rand',
    'exclude'         => $post_ID
  ] );

  if ( $related_posts ) : ?>
    <div class="related-posts container"> <?php
      print_article( false, true, $related_posts, 'id="related-posts"', '', null ) ?>
    </div> <?php
  endif;

get_footer() ?>
  </body>
</html>
