<?php
  global
    $template_directory;
// lazyload для фоновых картинок секции
$hero_sect_datasrc = 'url(' . $template_directory . '/img/hero-sect-img.576.jpg)';
$hero_sect_datamedia = '
(min-width:575.98px){url(' . $template_directory . '/img/hero-sect-img.768.jpg)}
(min-width:767.98px){url(' . $template_directory . '/img/hero-sect-img.1024.jpg)}
(min-width:1023.98px){url(' . $template_directory . '/img/hero-sect-img.1440.jpg)}
(min-width:1439.98px){url(' . $template_directory . '/img/hero-sect-img.1920.jpg)}
(min-width:1919.98px){url(' . $template_directory . '/img/hero-sect-img.2560.jpg)}' ?>

<section class="sect-404 container lazy" data-src="<?php echo $hero_sect_datasrc ?>" data-media="<?php echo $hero_sect_datamedia ?>">
  <img src="#" data-src="<?php echo $template_directory ?>/img/404-decor.320.svg" alt="Декор" class="sect-404__decor lazy" data-media="(min-width:575.98px){<?php echo $template_directory ?>/img/404-decor.768.svg} (min-width:1023.98px){<?php echo $template_directory ?>/img/404-decor.1024.svg} (min-width:1439.98px){<?php echo $template_directory ?>/img/404-decor.1440.svg}">
  <img src="<?php echo $template_directory ?>/img/404-img.svg" alt="404" class="sect-404__img">
  <h1 class="sect-404__title"><code class="php">&lt;?php <span class="echo">echo</span></code> <span class="quote">"</span><span class='text'>Страница не найдена</span></h1>
  <p class="sect-404__descr"><span class='text'>Кажется, тебя здесь быть не должно. <br class="br"> Как ты сюда попал? Ты что, хакер?</span> <span class="quote">"</span> <code class="php">?&gt;</code></p>
  <a href="/" class="sect-404__btn btn">На главную</a>
</section>