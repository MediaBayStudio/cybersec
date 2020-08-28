<?php
/**
 * theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package theme
 */

if ( ! defined( '_S_VERSION' ) ) {
  // Replace the version number of the theme on each release.
  define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'theme_setup' ) ) :
  /**
   * Sets up theme defaults and registers support for various WordPress features.
   *
   * Note that this function is hooked into the after_setup_theme hook, which
   * runs before the init hook. The init hook is too late for some features, such
   * as indicating support for post thumbnails.
   */
  function theme_setup() {
    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on theme, use a find and replace
     * to change 'theme' to the name of your theme in all the template files.
     */
    load_theme_textdomain( 'theme', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );

    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support( 'post-thumbnails' );

    // Регистрируем меню
    register_nav_menus( [
        'side_menu' =>  esc_html__( 'Боковое меню рубрик', 'theme' ),
        'header_menu' =>  esc_html__( 'Меню в шапке сайта', 'theme' ),
        'mobile_menu' =>  esc_html__( 'Мобильное меню на сайте', 'theme' ),
        'footer_menu' =>  esc_html__( 'Меню в подвале сайта', 'theme' )
      ] );

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support(
      'html5',
      array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
      )
    );

    // Set up the WordPress core custom background feature.
    add_theme_support(
      'custom-background',
      apply_filters(
        'theme_custom_background_args',
        array(
          'default-color' => 'ffffff',
          'default-image' => '',
        )
      )
    );

    // Add theme support for selective refresh for widgets.
    add_theme_support( 'customize-selective-refresh-widgets' );

    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
      'custom-logo',
      array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
      )
    );
  }
endif;
add_action( 'after_setup_theme', 'theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function theme_content_width() {
  $GLOBALS['content_width'] = apply_filters( 'theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function theme_widgets_init() {
  register_sidebar(
    array(
      'name'          => esc_html__( 'Виджет', 'theme' ),
      'id'            => 'sidebar-1',
      'description'   => esc_html__( 'Можно добавить виджеты сюда', 'theme' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
}
add_action( 'widgets_init', 'theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function theme_scripts() {
  // wp_enqueue_style( 'theme-style', get_stylesheet_uri(), array(), _S_VERSION );
  // wp_style_add_data( 'theme-style', 'rtl', 'replace' );

  // wp_enqueue_script( 'theme-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

  // if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
  //   wp_enqueue_script( 'comment-reply' );
  // }
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';


require get_template_directory() . '/inc/enqueue-styles-and-scripts.php';


require get_template_directory() . '/inc/template-singles.php';

/**
 * Load Jetpack compatibility file.
 */
// if ( defined( 'JETPACK__VERSION' ) ) {
//  require get_template_directory() . '/inc/jetpack.php';
// }

// добавить класс для ссылки в меню (a)
  add_filter( 'nav_menu_link_attributes', function( $atts, $item ) {
    $atts['class'] = 'nav__link';
    return $atts;
  }, 10, 2);  

// задать свои классы для пунктов меню (li)
  add_filter( 'nav_menu_css_class', function( $classes, $item, $args, $depth ) {
    $classesArray = ['nav__list-item'];
    if ( $item->title === 'Главная' ) {
      $classesArray[] = 'front-page-list-item';
    }
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

add_image_size( 'post_thumbnail_big',    815, 570, true );
add_image_size( 'post_thumbnail_medium', 690, 480, true );

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

function wrap_words( $start, $end, $text ) {
  return $start . implode( "{$end}{$start} {$end}{$start}", explode( ' ', $text ) ) . $end;
}

function load_singles() {
  $post_sort = $_POST['sort'];
  $post_cat = $_POST['category'];
  $post_tag = $_POST['tag'];
  $posts_offset = $_POST['offset'];

  if ( $post_sort ) {

    if ( $post_tag ) {
      $tag = $post_tag;
      $current_tags = explode( ', ', $tag );
    } else {
      $tag = '';
    }

    if ( $post_cat && $post_cat === 'null' ) {
      $cat = 0;
    } else {
      $cat = $post_cat;
    }

    if ( is_null( $posts_offset ) ) {
      $posts_offset = 0;
    }

    $posts = get_posts( [
      'numberposts' => 12,
      'order' => $post_sort,
      'tag' => $tag,
      'category' => $cat,
      'offset'  => $posts_offset
    ] );

    if ( $current_tags ) {
      $posts_count = 0;
      foreach ( $current_tags as $current_tag ) {
        $tag_count = get_term_by( 'slug', $current_tag, 'post_tag' ) ->count;
        $posts_count += $tag_count;
      }
    }

    $articles = '';

    if ( $posts ) {
      $i = 0;
      foreach ( $posts as $post ) :
        $data_attr = $i === 0 && $posts_count ? ' data-posts-count-by-tags="' . $posts_count . '"' : '';
        if ( $i % 4 === 0 ) {
          $articles .= '<div class="articles"' . $data_attr . '>';
        }
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
            <img src="' . get_the_post_thumbnail_url( $post ) . '" alt="' . $title . '" class="single__img">
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

        if ( ($i + 1) % 4 === 0 || !$posts[$i + 1] ) {
          $articles .= '</div>';
        }

      $i++;
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

      /* Contact Form 7 */
// Отключаем весь css-файл CF7
  add_filter( 'wpcf7_load_css', '__return_false' );

// Отключаем генерацию некоторых лишнех тегов
  add_filter( 'wpcf7_autop_or_not', '__return_false' );