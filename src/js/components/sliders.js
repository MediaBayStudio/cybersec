;(function() {
  let arrowSvg = '<svg width="22" height="8" viewBox="0 0 22 8" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M21.3536 4.35354C21.5488 4.15828 21.5488 3.8417 21.3536 3.64643L18.1716 0.464455C17.9763 0.269193 17.6597 0.269194 17.4645 0.464456C17.2692 0.659718 17.2692 0.976301 17.4645 1.17156L20.2929 3.99999L17.4645 6.82842C17.2692 7.02368 17.2692 7.34026 17.4645 7.53552C17.6597 7.73079 17.9763 7.73079 18.1716 7.53552L21.3536 4.35354ZM4.37114e-08 4.5L21 4.49999L21 3.49999L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="inherit"/></svg>',
    nextArrow = '<button type="button" class="arrow next">' + arrowSvg + '</button>',
    prevArrow = '<button type="button" class="arrow prev">' + arrowSvg + '</button>',
    reviewsSlider = q('.reviews-sect__slider'),
    reviewsSlides = reviewsSlider && qa('.review', reviewsSlider),

    buildReviewsSlider = function() {
      // если ширина экрана больше 578px и слайдов меньше 2, то слайдера не будет
      if (matchesMedia('(min-width: 575.98px)') && reviewsSlides.length <= 2) {
        if ($(reviewsSlider).hasClass('slick-slider')) {
          $(reviewsSlider).slick('unslick');
        }
      // если ширина экрана больше 768зч и слайдов меньше 3, то слайдера не будет
      } else if (matchesMedia('(min-width: 767.98px)') && reviewsSlides.length <= 3) {
        if ($(reviewsSlider).hasClass('slick-slider')) {
          $(reviewsSlider).slick('unslick');
        }
      // в других случаях делаем слайдер
      } else if (matchesMedia('(min-width: 1023.98px)') && reviewsSlides.length <= 4) {
        if ($(reviewsSlider).hasClass('slick-slider')) {
          $(reviewsSlider).slick('unslick');
        }
      } else {
        if ($(reviewsSlider).hasClass('slick-slider')) {
          // слайдер уже создан
          return;
        }
        if (reviewsSlides.length && reviewsSlides.length > 1) {
          $(reviewsSlider).slick({
            appendArrows: $('.reviews-sect__nav'),
            nextArrow: nextArrow,
            prevArrow: prevArrow,
            accessibility: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            mobileFirst: true,
            variableWidth: true,
            responsive: [{
              breakpoint: 575.98,
              settings: {
                slidesToShow: 2
              }
            }, {
              breakpoint: 767.98,
              settings: {
                slidesToShow: 3
              }
            }, {
              breakpoint: 1023.98,
              settings: {
                slidesToShow: 4
              }
            }]
          });
        }
      }
    },

    relatedPostsSlider = q('#related-posts > .articles'),
    relatedPosts = relatedPostsSlider && qa('.single', relatedPostsSlider),

    buildRelatedPostsSlider = function() {
      // если ширина экрана больше 768px и слайдов меньше 4, то слайдера не будет
      if (matchesMedia('(min-width: 767.98px)') && relatedPosts.length <= 4) {
        if ($(relatedPostsSlider).hasClass('slick-slider')) {
          $(relatedPostsSlider).slick('unslick');
        }
      // если ширина экрана больше 1024 и слайдов меньше 6, то слайдера не будет
      } else if (matchesMedia('(min-width: 1023.98px)') && relatedPosts.length <= 6) {
        if ($(relatedPostsSlider).hasClass('slick-slider')) {
          $(relatedPostsSlider).slick('unslick');
        }
      } else if (matchesMedia('(min-width: 1439.98px)') && relatedPosts.length <= 8) {
        if ($(relatedPostsSlider).hasClass('slick-slider')) {
          $(relatedPostsSlider).slick('unslick');
        }
      } else {
        if ($(relatedPostsSlider).hasClass('slick-slider')) {
          // слайдер уже создан
          return;
        }
        if (relatedPosts.length && relatedPosts.length > 1) {
          $(relatedPostsSlider).slick({
            accessibility: false,
            appendArrows: $('.related-posts__nav'),
            nextArrow: nextArrow,
            prevArrow: prevArrow,
            infinite: false,
            rows: 2,
            mobileFirst: true,
            responsive: [{
              breakpoint: 575.98,
              settings: {
                variableWidth: true,
                centerMode: true,
                centerPadding: '0px'
              }
            }, {
              breakpoint: 767.98,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                variableWidth: true
              }
            }, {
              breakpoint: 1023.98,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                variableWidth: true
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                variableWidth: true
              }
            }]
          });
        }
      }
    };


  if (reviewsSlides && reviewsSlides.length && reviewsSlides.length > 0) {
    window.addEventListener('resize', buildReviewsSlider);
    buildReviewsSlider();
  }

  if (relatedPosts && relatedPosts.length && relatedPosts.length > 0) {
    window.addEventListener('resize', buildRelatedPostsSlider);
    buildRelatedPostsSlider();
  }

  // настройки grab курсора на всех слайдерах
  // $('.slick-list.draggable').on('mousedown', function() {
  //   $(this).addClass('grabbing');
  // });

  // $('.slick-list.draggable').on('beforeChange', function() {
  //   $(this).removeClass('grabbing');
  // });

  // $(document).on('mouseup', function() {
  //   $('.slick-list.draggable').removeClass('grabbing');
  // });


})();