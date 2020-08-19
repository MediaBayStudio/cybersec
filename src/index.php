<?php
$template_directory = get_template_directory_uri();
$categories = get_categories();
get_header();
require 'layouts/hero/hero.php';


require 'layouts/articles/articles.php';
// get_footer();