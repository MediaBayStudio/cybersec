<?php
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
  if ( 'disable_gutenberg' ) {
    add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
    remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );
    add_action( 'admin_init', function() {
      remove_action( 'admin_notices', ['WP_Privacy_Policy_Content', 'notice'] );
      add_action( 'edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice'] );
    } );
  }
} );

// убрать описание для таксономий в админке
add_action( 'admin_head', function() {
  print
  '<style>
    .term-description-wrap {display:none}
  </style>';
} );

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