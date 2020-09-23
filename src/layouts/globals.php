<?php
  $template_directory = get_template_directory_uri();
  $site_url = site_url();
  $is_category = is_category();
  $is_front_page = is_front_page();
  $queried_object = get_queried_object();
  $categories = get_categories( ['hide_empty' => 0] );
  
  if ( is_page( 'category' ) ) {
    $is_category = true;
  }

  if ( $is_category ) {
    $body_id = 'id="category"';
  } else if ( $is_front_page ) {
    $body_id = 'id="front-page"';
  } else {
    $body_id = '';
  }
