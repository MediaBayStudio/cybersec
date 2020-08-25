<div class="search-popup">
  <div class="search-popup__cnt">
    <button type="button" class="search-popup__close">
      <svg class="close-icon">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-close' ?>"></use>
      </svg>
    </button>
    <!-- <form action="search.php" method="POST" class="search">
      <svg class="search-icon">
        <use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-search' ?>"></use>
      </svg>
      <input type="search" name="search" id="search-inp" placeholder="Название статьи">
    </form> -->
    <?php get_search_form(); ?>
    <div class="search-results" data-scrollbar>
    
      <!-- <article class="search-results__article article">
        <div class="article__categories">
          <a href="category" class="article__category">Рубрика</a><svg class="hot-icon"><use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg>
        </div>
        <h3 class="article__title"><a href="category" class="article__title-link"><?php #echo wrap_words( '<span class="article__title-text">', '</span>', 'Pwnagochi - игрушка хакреа' ) ?></a></h3>
        <p class="article__excerpt">Признавайся, а у тебя в 90-е был тамагочи? В отличие от бестолковых игрушек из 90-х, pwnagotchi - вполне рабочий хакерский инструмент...</p>
        <div class="article__row">
          <a href="category" class="article__link">Читать...</a>
          <time datetime="1" class="article__date">10.10.2020</time>
        </div>
      </article>

      <article class="search-results__article article">
        <div class="article__categories">
          <a href="category" class="article__category">Рубрика</a><svg class="hot-icon"><use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg>
        </div>
        <h3 class="article__title"><a href="category" class="article__title-link"><?php #echo wrap_words( '<span class="article__title-text">', '</span>', 'Pwnagochi - игрушка хакреа' ) ?></a></h3>
        <p class="article__excerpt">Признавайся, а у тебя в 90-е был тамагочи? В отличие от бестолковых игрушек из 90-х, pwnagotchi - вполне рабочий хакерский инструмент...</p>
        <div class="article__row">
          <a href="category" class="article__link">Читать...</a>
          <time datetime="1" class="article__date">10.10.2020</time>
        </div>
      </article>

      <article class="search-results__article article">
        <div class="article__categories">
          <a href="category" class="article__category">Рубрика</a><svg class="hot-icon"><use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg>
        </div>
        <h3 class="article__title"><a href="category" class="article__title-link"><?php #echo wrap_words( '<span class="article__title-text">', '</span>', 'Pwnagochi - игрушка хакреа' ) ?></a></h3>
        <p class="article__excerpt">Признавайся, а у тебя в 90-е был тамагочи? В отличие от бестолковых игрушек из 90-х, pwnagotchi - вполне рабочий хакерский инструмент...</p>
        <div class="article__row">
          <a href="category" class="article__link">Читать...</a>
          <time datetime="1" class="article__date">10.10.2020</time>
        </div>
      </article>

      <article class="search-results__article article">
        <div class="article__categories">
          <a href="category" class="article__category">Рубрика</a><svg class="hot-icon"><use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg>
        </div>
        <h3 class="article__title"><a href="category" class="article__title-link"><?php #echo wrap_words( '<span class="article__title-text">', '</span>', 'Pwnagochi - игрушка хакреа' ) ?></a></h3>
        <p class="article__excerpt">Признавайся, а у тебя в 90-е был тамагочи? В отличие от бестолковых игрушек из 90-х, pwnagotchi - вполне рабочий хакерский инструмент...</p>
        <div class="article__row">
          <a href="category" class="article__link">Читать...</a>
          <time datetime="1" class="article__date">10.10.2020</time>
        </div>
      </article>

      <article class="search-results__article article">
        <div class="article__categories">
          <a href="category" class="article__category">Рубрика</a><svg class="hot-icon"><use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg>
        </div>
        <h3 class="article__title"><a href="category" class="article__title-link"><?php #echo wrap_words( '<span class="article__title-text">', '</span>', 'Pwnagochi - игрушка хакреа' ) ?></a></h3>
        <p class="article__excerpt">Признавайся, а у тебя в 90-е был тамагочи? В отличие от бестолковых игрушек из 90-х, pwnagotchi - вполне рабочий хакерский инструмент...</p>
        <div class="article__row">
          <a href="category" class="article__link">Читать...</a>
          <time datetime="1" class="article__date">10.10.2020</time>
        </div>
      </article>

      <article class="search-results__article article">
        <div class="article__categories">
          <a href="category" class="article__category">Рубрика</a><svg class="hot-icon"><use xlink:href="<?php #echo $template_directory . '/img/icons-sprite.svg#icon-fire' ?>"></use></svg>
        </div>
        <h3 class="article__title"><a href="category" class="article__title-link"><?php #echo wrap_words( '<span class="article__title-text">', '</span>', 'Pwnagochi - игрушка хакреа' ) ?></a></h3>
        <p class="article__excerpt">Признавайся, а у тебя в 90-е был тамагочи? В отличие от бестолковых игрушек из 90-х, pwnagotchi - вполне рабочий хакерский инструмент...</p>
        <div class="article__row">
          <a href="category" class="article__link">Читать...</a>
          <time datetime="1" class="article__date">10.10.2020</time>
        </div>
      </article> -->
      
    </div>
  </div>
</div>