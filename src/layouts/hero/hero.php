<?php global $template_directory ?>
<section class="hero-sect container lazy" data-src="url(<?php echo $template_directory ?>/img/hero.768.png), url(<?php echo $template_directory ?>/img/hero-pattern.320.svg)" data-media="(min-width:575.98px){url(<?php echo $template_directory ?>/img/hero.768.png), url(<?php echo $template_directory ?>/img/hero-pattern.768.svg)} (min-width:767.98px){url(<?php echo $template_directory ?>/img/hero.1024.png), url(<?php echo $template_directory ?>/img/hero-pattern.1024.svg)} (min-width:1023.98px){url(<?php echo $template_directory ?>/img/hero.1440.png), url(<?php echo $template_directory ?>/img/hero-pattern.1440.svg)} (min-width:1439.98px){url(<?php echo $template_directory ?>/img/hero.1920.png), url(<?php echo $template_directory ?>/img/hero-pattern.1920.svg)}"> <?php
  if ( is_front_page() ) : ?>
    <h1 class="hero-sect__title"><code class="php">&lt;?php <span class="echo">echo</span></code> <span class="quote">"</span><span class="text"><span>О хакинге <br class="br"> и информационноЙ безопасности <mark class="mark">честно</mark></span><span class="quote">"</span><code class="php">?&gt;</code></span></h1> <?php
  endif ?>
  <div id="emoji">
    <div id="emoji__circle"></div>
    <div id="emoji__face"></div>
  </div>
</section>