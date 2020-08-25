<?php
$site_url = site_url();
$template_directory = get_template_directory_uri();
$categories = get_categories();
get_header();
require 'layouts/hero/hero.php';

require 'layouts/articles/articles.php';
require 'layouts/overlay/overlay.php';
require 'layouts/search-popup/search-popup.php';
require 'layouts/thanks-popup/thanks-popup.php';
// get_footer();