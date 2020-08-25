<?php


add_action( 'widgets_init', 'register_my_widgets' );
function register_my_widgets(){
  register_sidebar( array(
    'name'          => sprintf(__('Sidebar %d'), $i ),
    'id'            => "sidebar-$i",
    'description'   => '',
    'class'         => '',
    'before_widget' => '<li id="%1$s" class="widget %2$s">',
    'after_widget'  => "</li>\n",
    'before_title'  => '<h2 class="widgettitle">',
    'after_title'   => "</h2>\n",
  ) );
}

  // заворачиваем каждое слово и пробел в отдельный span
  // чтобы при наведении можно было сделать равномерный border-bottom
function wrap_words( $start, $end, $text ) {
  return $start . implode( "{$end}{$start} {$end}{$start}", explode( ' ', $text ) ) . $end;
}

function print_singles( $singles, $args, $num = null, $current_category = null ) {
  if ( is_array( $args ) ) {
    $sect_title = $args['sect_title'];
    $sect_id = $args['sect_id'];
    $category_href = $args['category_href'];
  } else {
    $sect_title = $args->name;
    $sect_id = $args->slug;
    $category_href = get_term_link( $args );
    if ( $current_category ) {
      $data_cat_id = ' data-category-id="' . $current_category->term_id . '"';
    }
  }

  if ( is_category() || is_page( 'category' ) ) {
    $sect_id = 'category';
    $tags_names = [];
    $tags_ids = [];
  }

  if ( $singles ) : ?>
    <section class="articles-sect" id="<?php echo $sect_id ?>"<?php echo $data_cat_id  ?>>
      <div class="articles"> <?php
        if ( is_category() || is_page( 'category' ) ) {
          $post_tags = get_tags();
          for ($i = 0; $i < count( $post_tags ); $i++) { 
            $tags_names[$i] = $post_tags[$i]->name;
            $tags_ids[$i] = $post_tags[$i]->slug;
          }
        }
        foreach ( $singles as $single ) :
          // if ( is_category() || is_page( 'category' ) ) {

            // $post_tags_names = wp_get_object_terms( $single->ID, 'post_tag', ['fields' => 'names'] );
            // $post_tags_ids = wp_get_object_terms( $single->ID, 'post_tag', ['fields' => 'slugs'] );

            // $tags_names = array_merge( $tags_names, $post_tags_names );
            // $tags_ids = array_merge( $tags_ids, $post_tags_ids );
          // }
          $href = get_the_permalink( $single );
          $title = get_the_title( $single );
          $excerpt = kama_excerpt( [
            'maxchar'   =>  120,
            'text'      =>  get_the_excerpt( $single ),
            'autop'     =>  false,
            'ignore_more' => true
          ] );

          $cat_classes = [
            0 => 'single__categories',
            1 => 'single__category'
          ];

          if ( $sect_id === 'hot' || $sect_id === 'fresh' ) {
            $categories = get_the_terms( $single, 'category' );
          } else {
            $categories = get_the_terms( $single, 'post_tag' );
            if ( $categories ) {
              $cat_classes = [
                0 => 'single__tags',
                1 => 'single__tag'
              ];
            } else {
              $categories = get_the_terms( $single, 'category' );
            }
          }
          
          $datetime = get_the_date( 'Y-m-d', $single );
          $date = get_the_date( 'd.m.Y', $single );
          $str = '<article class="single">' ?>

          <article class="single"> <?php
            if ( has_post_thumbnail( $single ) ) : ?>
              <a href="<?php echo $href ?>" class="single__thumb">
                <img src="#" data-src="<?php echo get_the_post_thumbnail_url( $single ) ?>" alt="<?php echo $title ?>" class="single__img lazy" style="background-image:<?php echo $img_placeholder_url ?>">
              </a> <?php
            endif ?>
            <div class="single__row">
              <div class="<?php echo $cat_classes[0] ?>"> <?php
                foreach ( $categories as $category ) :
                  if ( $category->slug === 'hot' ) continue ?>
                  <a href="<?php echo get_term_link( $category ) ?>" class="<?php echo $cat_classes[1] ?>"><?php echo $category->name ?></a><svg class="hot-icon"><use xlink:href="<?php echo get_template_directory_uri() . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg> <?php
                endforeach ?>
              </div>
              <time datetime="<?php echo $datetime ?>" class="single__date"><?php echo $date ?></time>
            </div>
            <h3 class="single__title"><a href="<?php echo $href ?>" class="single__title-link"><?php echo wrap_words( '<span class="single__title-text">', '</span>', $title ) ?></a></h3>
            <p class="single__excerpt"><?php echo $excerpt ?></p>
          </article> <?php
        endforeach ?>
      </div>
      <div class="articles-sect__row"> <?php
        if ( is_category() || is_page( 'category' ) ) : ?> <?php
          $tags_names = array_unique( $tags_names );
          $tags_ids = array_unique( $tags_ids );
          if ( $tags_names ) : ?>
            <div class="tags" id="tags">
              <button type="button" class="tags__show-btn">Теги</button>
              <ul class="tags__list">
              <li class="tags__list-item">
                <button type="button" class="tags__btn selected">Все</button>
              </li> <?php
                for ( $i = 0; $i < count( $tags_names ); $i++ ) : ?>
                  <li class="tags__list-item">
                    <button type="button" class="tags__btn" data-tag="<?php echo $tags_ids[$i] ?>"><?php echo $tags_names[$i] ?></button>
                  </li> <?php
                endfor ?>
              </ul>
            </div> <?php
          endif ?>
          <select name="sort" class="sort__list">
            <option selected class="sort__list-item">Сортировать по дате</option>
            <option value="DESC" class="sort__list-item">Сначала новые</option>
            <option value="ASC" class="sort__list-item">Сначала старые</option>
          </select> <?php
        else : ?>
          <h2 class="articles-sect__title"><?php echo $sect_title ?></h2> 
          <a href="<?php echo $category_href ?>" class="articles-sect__link">Еще статьи</a> <?php
        endif ?>
      </div>
    </section> <?php
  endif;

  // die();
}

function load_singles() {
  $post_sort = $_POST['sort'];
  $post_cat = $_POST['category'];
  $post_tag = $_POST['tag'];

  if ( $post_sort ) {

    if ( $post_tag ) {
      $tag = $post_tag;
    } else {
      $tag = '';
    }

    if ( $post_cat && $post_cat === 'null' ) {
      $cat = 0;
    } else {
      $cat = $post_cat;
    }

    $posts = get_posts( [
      'numberposts' => 12,
      'order' => $post_sort,
      'tag' => $tag,
      'category' => $cat
    ] );

    $articles = '';

    if ( $posts ) {
      foreach ( $posts as $post ) :
        $href = get_the_permalink( $post );
        $title = get_the_title( $post );
        $excerpt = kama_excerpt( [
          'maxchar'   =>  120,
          'text'      =>  get_the_excerpt( $post ),
          'autop'     =>  false,
          'ignore_more' => true
        ] );

        $cat_classes = [
          0 => 'single__categories',
          1 => 'single__category'
        ];

        if ( $sect_id === 'hot' || $sect_id === 'fresh' ) {
          $categories = get_the_terms( $post, 'category' );
        } else {
          $categories = get_the_terms( $post, 'post_tag' );
          if ( $categories ) {
            $cat_classes = [
              0 => 'single__tags',
              1 => 'single__tag'
            ];
          } else {
            $categories = get_the_terms( $post, 'category' );
          }
        }
        
        $datetime = get_the_date( 'Y-m-d', $post );
        $date = get_the_date( 'd.m.Y', $post );
        $post_categories = '';
        if ( has_post_thumbnail( $post ) ) {
          $thumbnail = '
          <a href="<?php echo $href ?>" class="single__thumb">
            <img src="#" data-src="' . get_the_post_thumbnail_url( $post ) . '" alt="' . $title . '" class="single__img lazy">
          </a>';
        }

        foreach ( $categories as $post_category ) {
          $post_categories .= '<a href="' . get_term_link( $post_category ) . '" class="' . $cat_classes[1] . '">' . $post_category->name . '</a>
          <svg class="hot-icon"><use xlink:href="' . get_template_directory_uri() . '/img/icons-sprite.svg#icon-fire"></use></svg>';
        }

        $article = '
          <article class="single">' . $thumbnail . '
            <div class="single__row">
              <div class="' . $cat_classes[0] . '">'
                . $post_categories . '  
              </div>
              <time datetime="' . $datetime . '" class="single__date">' . $date . '</time>
            </div>
            <h3 class="single__title"><a href="' . $href . '" class="single__title-link">' . wrap_words( '<span class="single__title-text">', '</span>', $title ) . '</a></h3>
            <p class="single__excerpt">' . $excerpt . '</p>
          </article>';

        $articles .= $article;

      endforeach;
    } else {
      $articles = '<p class="tags-error">В категории ' . get_cat_name( $cat ) . ' не найдено статей с выбранными тегами. Попробуйте выбрать другие теги.</p>';
    }

    $response = $articles;

    echo $response;
    die();
  }
}

add_action( 'wp_ajax_nopriv_loadsingles', 'load_singles' ); 
add_action( 'wp_ajax_loadsingles', 'load_singles' );

// Отключаем разные стандартные скрипты и стили wp
add_action( 'init', function() {
  // Отключаем wp-emoji
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  // Отключаем скрипты wp-embed
  remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
  remove_action( 'wp_head', 'wp_oembed_add_host_js' );
  // Отключаем гутенберг
  // if ( 'disable_gutenberg' ) {
  //   add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
  //   remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );
  //   add_action( 'admin_init', function() {
  //     remove_action( 'admin_notices', ['WP_Privacy_Policy_Content', 'notice'] );
  //     add_action( 'edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice'] );
  //   } );
  // }
} );

function kama_excerpt( $args = '' ){
  global $post;

    if( is_string($args) )
    parse_str( $args, $args );

  $rg = (object) array_merge( array(
    'maxchar'     => 350,   // Макс. количество символов.
    'text'        => '',    // Какой текст обрезать (по умолчанию post_excerpt, если нет post_content.
    'autop'       => true,  // Заменить переносы строк на <p> и <br> или нет?
    'save_tags'   => '',    // Теги, которые нужно оставить в тексте, например '<strong><b><a>'.
    'more_text'   => 'Читать дальше...', // Текст ссылки `Читать дальше`.
    'ignore_more' => false, // нужно ли игнорировать  в контенте
  ), $args );

  $rg = apply_filters( 'kama_excerpt_args', $rg );

  if( ! $rg->text )
    $rg->text = $post->post_excerpt ?: $post->post_content;

  $text = $rg->text;
  // убираем блочные шорткоды: [foo]some data[/foo]. Учитывает markdown
  $text = preg_replace( '~\[([a-z0-9_-]+)[^\]]*\](?!\().*?\[/\1\]~is', '', $text );
  // убираем шоткоды: [singlepic id=3]. Учитывает markdown
  $text = preg_replace( '~\[/?[^\]]*\](?!\()~', '', $text );
  $text = trim( $text );

  // 
  if( ! $rg->ignore_more  &&  strpos( $text, '') ){
    preg_match('/(.*)/s', $text, $mm );

    $text = trim( $mm[1] );

    $text_append = ' <a href="'. get_permalink( $post ) .'#more-'. $post->ID .'">'. $rg->more_text .'</a>';
  }
  // text, excerpt, content
  else {
    $text = trim( strip_tags($text, $rg->save_tags) );

    // Обрезаем
    if( mb_strlen($text) > $rg->maxchar ){
      $text = mb_substr( $text, 0, $rg->maxchar );
      $text = preg_replace( '~(.*)\s[^\s]*$~s', '\\1...', $text ); // кил последнее слово, оно 99% неполное
    }
  }

  // сохраняем переносы строк. Упрощенный аналог wpautop()
  if( $rg->autop ){
    $text = preg_replace(
      array("/\r/", "/\n{2,}/", "/\n/",   '~</p><br ?/?>~'),
      array('',     '</p><p>',  '<br />', '</p>'),
      $text
    );
  }

  $text = apply_filters( 'kama_excerpt', $text, $rg );

  if( isset($text_append) )
    $text .= $text_append;

  return ( $rg->autop && $text ) ? "<p>$text</p>" : $text;
}

      /* Contact Form 7 */
// Отключаем весь css-файл CF7
  add_filter( 'wpcf7_load_css', '__return_false' );

// Отключаем генерацию некоторых лишнех тегов
  add_filter( 'wpcf7_autop_or_not', '__return_false' );
// необходимые поддержки темой
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );

// удаление ненужных миниатюр
add_filter( 'intermediate_image_sizes', function ( $sizes ){
  // размеры которые нужно удалить
  return array_diff( $sizes, [
    'medium',
    'medium_large',
    'large',
    '1536x1536',
    '2048x2048',
  ] );
} );

// add_image_size( 'size_name', 100, 100, true );

// Функция подключения стилей
function enqueue_style( $style_name, $widths ) {
  if ( is_string( $widths ) ) {
    if ( $style_name === 'hover' ) {
      wp_enqueue_style( "{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null, "(hover), (min-width:1024px)" );
    } else {
      wp_enqueue_style( "{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null );
    }
  } else {
    foreach ( $widths as $width ) {
      if ( $width !== "0" ) {
        $media = $width - 0.02;
      wp_enqueue_style( "{$style_name}-{$width}px", get_template_directory_uri() . "/css/{$style_name}.{$width}.css", [], null, "(min-width: {$media}px)" );
      } else {
        wp_enqueue_style( "{$style_name}-page", get_template_directory_uri() . "/css/{$style_name}.css", [], null );
      }
    }
  }
}

// Подключаем свои стили и скрипты
add_action( 'wp_enqueue_scripts', function() {
  $screen_widths = ['0', '420', '576', '768', '1024', '1440']; // на каких экранах подключать css

  wp_enqueue_style( 'theme-style', get_stylesheet_uri() );        // подключить стиль темы (default)

  // подключаем стили с помощью своей функции
  enqueue_style( 'style', $screen_widths );

  #!!!styles

  enqueue_style( 'hover', '' ); // подключаем стили для эффектов при наведении

  // Подключаем скрипты циклом
  $scripts = [
				'slick.min',
			'jquery.validate.min',
			'lazy.min',
			'MobileMenu.min',
			'Popup.min',
			'svg4everybody.min',
      'Select.min',
      'smooth-scrollbar',
			'main'
		];

  foreach ( $scripts as $script_name ) {
    wp_enqueue_script( "{$script_name}", get_template_directory_uri() . "/js/{$script_name}.js", [], null );
  }

  // Отключаем стандартные jquery, jquery-migrate
  // лучше подключать свой jquery
  wp_deregister_script( 'jquery-core' );
  wp_deregister_script( 'jquery' );

  // Подключаем свой jquery
  wp_register_script( 'jquery-core', get_template_directory_uri() . '/js/jquery-3.4.1.min.js', false, null, true );
  wp_register_script( 'jquery', false, ['jquery-core'], null, true );
  wp_enqueue_script( 'jquery' );

} );

// Убираем id и type в тегах script, добавляем нужным атрибут defer
  add_filter('script_loader_tag',   function( $html, $handle ) {

    $defer_scripts = [
				'slick.min',
			'jquery.validate.min',
			'lazy.min',
			'MobileMenu.min',
			'Popup.min',
			'svg4everybody.min',
      'Select.min',
      'smooth-scrollbar',
			'main'
		];

    foreach( $defer_scripts as $id ) {
      if ( $id === $handle ) {
        $html = str_replace( ' src', ' defer src', $html );
      }
    }

    $html = str_replace( " id='$handle-js' ", '', $html );
    $html = str_replace( " type='text/javascript'", '', $html );

     return $html;
  }, 10, 2);

// Убираем id и type в тегах style
  add_filter( 'style_loader_tag', function( $html, $handle ) {
    $html = str_replace( " id='$handle-css' ", '', $html );
    $html = str_replace( " type='text/css'", '', $html );
    return $html;
  }, 10, 2 );
 /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    echo "<input type='text' name='{$id}' value='" . esc_attr( get_option( $id ) ) . "'>";
  }

  add_action( 'admin_init', function() {
    $options = [
      'tel'     =>  'Телефон',
      'address' =>  'Адрес',
      'email'   =>  'E-mail',
      'coords'  =>  'Координаты маркера на карте',
      'zoom'    =>  'Увеличение карты'
    ];

    foreach ($options as $id => $name) {
      $my_id = "contacts_{$id}";

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );

// Меню на сайте
  add_action( 'after_setup_theme', function() {
    register_nav_menus( [
      'side_menu' =>  'Боковое меню рубрик',
      'header_menu' =>  'Меню в шапке сайта',
      'mobile_menu' =>  'Мобильное меню на сайте',
      'footer_menu' =>  'Меню в подвале сайта'
    ] );
  } );

// добавить класс для ссылки в меню (a)
  add_filter( 'nav_menu_link_attributes', function( $atts, $item ) {
    $atts['class'] = 'nav__link';
    return $atts;
  }, 10, 2);  

// задать свои классы для пунктов меню (li)
  add_filter( 'nav_menu_css_class', function( $classes, $item, $args, $depth ) {
    $classesArray = ['nav__list-item'];

    foreach ( $classes as $class ) {
      if ( $class === 'current-menu-item' ) {
        $classesArray[] = 'current';
      }
    }
    return $classesArray;
  }, 10, 4);

// убрать id у пунктов меню
  add_filter( 'nav_menu_item_id', function( $menu_id, $item, $args, $depth ) {
    return '';
  }, 10, 4);

// переименовать рубрики в категории
add_filter( 'taxonomy_labels_'.'category', function( $labels ) {

  // Запишем лейблы для изменения в виде массива для удобства
  $my_labels = [
    'name'                  => 'Категории',
    'singular_name'         => 'Категория',
    'search_items'          => 'Поиск категорий',
    'all_items'             => 'Все категории',
    'parent_item'           => 'Родительская категория',
    'parent_item_colon'     => 'Родительская категория:',
    'edit_item'             => 'Изменить категорию',
    'view_item'             => 'Просмотреть категорию',
    'update_item'           => 'Обновить категорию',
    'add_new_item'          => 'Добавить новую категорию',
    'new_item_name'         => 'Название новой категории',
    'not_found'             => 'Категории не найдены',
    'no_terms'              => 'Категорий нет',
    'items_list_navigation' => 'Навигация по списку категорий',
    'items_list'            => 'Список категорий',
    'back_to_items'         => '← Назад к категориям',
    'menu_name'             => 'Категории',
  ];

  return $my_labels;
} );

