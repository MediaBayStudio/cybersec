<?php global $template_directory ?>
<form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ) ?>" class="search">
  <svg class="search-icon">
    <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-search' ?>"></use>
  </svg>
  <input type="text" value="<?php echo get_search_query() ?>" name="s" id="search-inp" placeholder="Название статьи" data-swpparentel=".search-results">
</form> 