<div class="comments-area container"> <?php
  if ( have_comments() ) : ?>
    <h4 class="comments-title">Комментарии</h4> <?php
    the_comments_navigation() ?>
    <ol class="comment-list"> <?php
      wp_list_comments(
        [
          'style'      => 'ol',
          'short_ping' => true,
        ]
      ) ?>
    </ol> <?php
    the_comments_navigation();
    if ( ! comments_open() ) : ?>
      <p class="no-comments"> <?php esc_html_e( 'Comments are closed.', 'name' ); ?> </p> <?php
    endif;
  endif;
  comment_form() ?>
</div>