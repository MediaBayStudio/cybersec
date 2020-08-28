<div class="search-popup popup">
  <div class="search-popup__cnt">
    <button type="button" class="search-popup__close">
      <svg class="close-icon">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-close' ?>"></use>
      </svg>
    </button>
    <?php get_search_form(); ?>
    <div class="search-results" data-scrollbar>
    </div>
  </div>
</div>