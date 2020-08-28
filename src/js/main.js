//polyfills
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
let
  lazy,
  Share,
  menu,
  hdr,
  sideMenu,
  overlay,
  searchPopup,
  thanksPopup,
  thanksPopupTimer,
  // callbackPopup,
  // orderPopup,
  fakeScrollbar,
  templateDir = document.body.getAttribute('data-template-directory'),
  siteurl = document.body.getAttribute('data-siteurl'),
  // siteurl = document.body.dataset.siteurl,
  // page = document.body.dataset.page,
  // mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  // mobile = mobileRegExp.test(navigator.userAgent),
  // IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1,
  q = function(selector, element) {
    element = element || document.body;
    return element.querySelector(selector);
  },
  qa = function(selectors, element, toArray) {
    element = element || document.body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // showLoader = function() {
  //   loader.classList.add('active');
  // },
  // hideLoader = function() {
  //   loader.style.opacity = 0;
  // },
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  matchesMedia = function(media) {
    return window.matchMedia(media).matches;
  },
  scrollToTarget  = function(target) {
    event.preventDefault();

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  };

document.addEventListener('DOMContentLoaded', function() {

  // делаем глобальный lazy, чтобы потом можно было обновлять его
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  if (q('.sort__list')) {
    let selectSize = new Select('.sort__list', {
      wrapperClass: 'sort',
      titleClass: 'sort__title'
    });
  }

  // фикс vh для элементов с 100vh
  window.addEventListener('resize', function() {
    setVh();
    // mobile = mobileRegExp.test(navigator.userAgent);
  });
  setVh();

  svg4everybody();

  document.body.removeAttribute('data-template-directory');
  hdr = q('.hdr');

  setTimeout(function() {
    Scrollbar.initAll({
      alwaysShowTracks: true
    });
    let searchResults = q('.searchwp-live-search-results');


    if (searchResults) {
      let attributes = ['aria-expanded', 'role', 'tabindex'];
      for (let i = 0, len = attributes.length; i < len; i++) {
        searchResults.removeAttribute(attributes[i]);
      }
    }
  }, 1000);

  let emojiFace = q('#emoji__face');
  // console.log(templateDir);

  if (emojiFace) {
    let counter = 1;

    setInterval(function() {
      if (counter === 6) {
        counter = 1;
      }
      emojiFace.style.backgroundImage = `url('${templateDir}/img/emoji-${counter}.svg')`;
      counter++;
    }, 450);
  }

  let aboutSect = q('.about-sect');
  if (aboutSect) {
    let aboutSectTextBlock = q('.about-sect__text-block', aboutSect),
      aboutSectHeadingBlock = q('.about-sect__heading-block', aboutSect),
      aboutSectFirstTitle = q('h2.about-sect__title', aboutSect),
      aboutSectSecondTitle = q('h3.about-sect__title', aboutSect),
      aboutSectFirstDescr = q('.about-sect__descr:first-of-type', aboutSect),
      aboutSectSecondDescr = q('.about-sect__descr:nth-of-type(2)', aboutSect),
      aboutSectThirdDescr = q('.about-sect__descr:nth-of-type(3)', aboutSect),
      aboutSectFourthDescr = q('.about-sect__descr:nth-of-type(4)', aboutSect),
      initialMap = new Map([
        [
          aboutSectTextBlock, [
            aboutSectHeadingBlock,
            aboutSectFirstTitle,
            aboutSectFirstDescr,
            aboutSectSecondDescr,
            aboutSectSecondTitle,
            aboutSectThirdDescr,
            aboutSectFourthDescr
          ]
        ]
      ]),
      minWidth576Map = new Map([
        [
          aboutSectTextBlock, [
            aboutSectHeadingBlock,
            aboutSectFirstDescr,
            aboutSectSecondDescr,
            aboutSectThirdDescr,
            aboutSectFourthDescr
          ]
        ],
        [
          aboutSectHeadingBlock, [
            aboutSectFirstTitle,
            aboutSectSecondTitle
          ]
        ]
      ]),
      showFirstDescrBlock = function() {
        aboutSectSecondTitle.classList.remove('active');
        aboutSectFirstDescr.classList.remove('hidden');
        aboutSectSecondDescr.classList.remove('hidden');

        aboutSectFirstTitle.classList.add('active');
        aboutSectThirdDescr.classList.add('hidden');
        aboutSectFourthDescr.classList.add('hidden');
      },
      showSecondDescrBlock = function() {
        aboutSectFirstTitle.classList.remove('active');
        aboutSectThirdDescr.classList.remove('hidden');
        aboutSectFourthDescr.classList.remove('hidden');

        aboutSectSecondTitle.classList.add('active');
        aboutSectFirstDescr.classList.add('hidden');
        aboutSectSecondDescr.classList.add('hidden');
      },
      toggleClassesForDescr = function() {
        let target = event.target;
        if (target === aboutSectFirstTitle) {
          showFirstDescrBlock();
        } else if (target === aboutSectSecondTitle) {
          showSecondDescrBlock();
        }
      };

    if (matchesMedia('(min-width:575.98px)')) {
      showFirstDescrBlock();

      aboutSectHeadingBlock.addEventListener('click', toggleClassesForDescr);
    }
      
    new Replacement({
      'initial': initialMap,
      '(min-width: 575.98px)': minWidth576Map
    });
  }
  //includes
menu = new MobileMenu('.mobile-menu', {
  openButton: '.burger',
  closeButtons: '.burger',
  overlay: '.overlay',
  toRight: true,
  fixHeader: '.hdr'
});
(function() {
  if (q('.feedback-form')) {
    thanksPopup = new Popup('.thanks-popup', {
      closeButtons: '.thanks-popup__close'
    });

    thanksPopup.addEventListener('popupbeforeopen', function() {
      clearTimeout(thanksPopupTimer);
    });
  }
  

  searchPopup = new Popup('.search-popup', {
    openButtons: '#search-btn',
    closeButtons: '.search-popup__close'
  });

// Закрытие всех попапов вместе с закрытием окна спасибо
  // thanksPopup.addEventListener('popupbeforeclose', function() {
  //   let otherPopups = [callbackPopup, orderPopup];

  //   for (let i = 0; i < otherPopups.length; i++) {
  //     if (otherPopups[i].classList.contains('active')) {
  //       otherPopups[i].closePopup();
  //     }
  //   }
  // });
})()
;
(function() {

  $('#searchform').on('submit', function() {
    event.preventDefault();
  });

  if (!$.validator) {
    return;
  }

  $('form:not(#commentform)').each(function() {
    $(this).validate({
      rules: {
        'user-name': {
          required: true,
          userName: true,
          minlength: 2
        },
        'user-email': {
          required: true,
          email: true
        },
        'user-msg': {
          required: true,
          userMsg: true,
        },
        'policy': {
          required: true,
          minlength: 1
        }
      },
      messages: {
        'user-name': {
          required: 'Укажите имя',
          minlength: jQuery.validator.format('Имя не может быть таким коротким'),
          userName: 'Допустимы только буквы'
        },
        'user-email': {
          required: 'Укажите E-mail',
          email: 'Укажите верный E-mail'
        },
        'user-msg': {
          required: 'Введите сообщение',
          userMsg: 'Введены недопустимые символы'
        },
        'policy': {
          required: 'Согласитель с политикой обработки персональных данных'
        }
      },
      onfocusout: false,
      errorClass: 'invalid',
      submitHandler: function(form, event) {
        event.preventDefault();

        $(form).find('.field__inp, .field__textarea').removeClass('filled');

        thanksPopup.openPopup();
        thanksPopupTimer = setTimeout(function() {
          thanksPopup.closePopup();
        }, 5000);

        $(this)[0].resetForm();

      }
    });
  });

  $('#commentform').validate({
    messages: {
      author: {
        required: 'Укажите имя или ник'
      },
      email: {
        required: 'Укажите Email',
        email: 'Укажите верный Email'
      },
      comment: {
        required: 'Напишите комментарий'
      }
    },
    onfocusout: false,
    errorClass: 'invalid'
    // submitHandler: function(form, event) {
    //   event.preventDefault();
    //   console.log('submit');
    // }
  });

  // form beforesubmit validate
  $('form .btn').on('click', function() {
    if (!$(event.target).parents('form').valid()) {
      event.preventDefault();
    }
  });

  $('.field__inp, .field__textarea').on('input', function() {
    if ($(this).val() !== '') {
      $(this).addClass('filled');
    } else {
      $(this).removeClass('filled');
    }
  });


  $.validator.methods.userName = function(value) {
    return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
  };

  $.validator.methods.userPhone = function(value) {
    return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
  };

  $.validator.methods.userMsg = function(value) {
    return /[^\<\>\[\]%'`]+$/.test(value);
  };

})();
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
;(function() {
  sideMenu = q('.side-menu');
  if (sideMenu) {
    let sideMenuClone = sideMenu.cloneNode(true),
      sideMenuParent = sideMenu.parentElement,
      fixThreshold = sideMenu.getBoundingClientRect().top + pageYOffset,
      fixSideMenu = function() {
        if (pageYOffset > fixThreshold) {
          sideMenuParent.appendChild(sideMenuParent.replaceChild(sideMenuClone, sideMenu));
          sideMenu.style.width = sideMenuClone.offsetWidth + 'px';
          sideMenu.classList.add('fixed');
      
          window.removeEventListener('scroll', fixSideMenu);
          window.addEventListener('scroll', unfixSideMenu);

          if (typeof window.CustomEvent === "function") {
            let evt = new CustomEvent('fixed');
            sideMenu.dispatchEvent(evt);
          }
        }
      },
      unfixSideMenu = function() {
        if (pageYOffset <= fixThreshold) {
          sideMenuParent.replaceChild(sideMenu, sideMenuClone);
          sideMenu.classList.remove('fixed');
        
          window.removeEventListener('scroll', unfixSideMenu);
          window.addEventListener('scroll', fixSideMenu);

          if (typeof window.CustomEvent === "function") {
            let evt = new CustomEvent('unfixed');
            sideMenu.dispatchEvent(evt);
          }
        }
      };

      window.addEventListener('scroll', fixSideMenu);
      fixSideMenu();

  }
})();
;(function() {

  let windowWidth,
    windowHeight,
    lastPageYOffset,
    trfRegExp = /[-0-9.]+(?=px)/g,
    getElements = function(selectors) {
      let elementsArray = [],
        $elements = qa(selectors);

      for (let i = 0; i < $elements.length; i++) {
        let coords = $elements[i].getBoundingClientRect(),
          element = {
            element: $elements[i],
            top: coords.top + pageYOffset,
            bottom: coords.bottom + pageYOffset,
          };

        $elements[i].style.transform = 'translate3d(0px, 0px, 0px)';

        elementsArray[i] = element;
      }
      return elementsArray;
    },
    observe = function(event) {
      let windowScroll = {
        top: pageYOffset,                          
        bottom: pageYOffset + windowHeight
      };
      
      for (let i = 0; i < decorElements.length; i++) {
        if (decorElements[i].bottom > windowScroll.top && decorElements[i].top < windowScroll.bottom) {
          parallaxElement(decorElements[i], event);
        }
      }


      lastPageYOffset = pageYOffset;
    },
    initParallaxFunc = function() {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      if (matchesMedia('(hover)')) {
        window.addEventListener('mousemove', observe);
        document.removeEventListener('scroll', observe);
      } else {
        document.addEventListener('scroll', observe);
        window.removeEventListener('mousemove', observe);
      }
    },
    parallaxElement = function(element, event) {
      let $element = element.element,
        transform = $element.style.transform.match(trfRegExp),
        eventType = event.type,
        eventClientX = event.clientX,
        eventClientY = event.clientY,
        posX = +transform[0],
        posY = +transform[1];

      if (eventType === 'scroll') {
        if (lastPageYOffset < pageYOffset) {
          // ++posY;
          posY += .25;
          // console.log('двигаемся вниз');
        } else if (lastPageYOffset > pageYOffset) {
          // --posY;
          posY -= .25;
          // console.log('двигаемся вверх');
        }
      } else if (eventType === 'mousemove') {
        
        posX = -(event.clientX / windowWidth * 12);
        posY = -(event.clientY / windowHeight * 12);
      }

      $element.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';
    },
    decorElements = getElements('.php, .quote, .side-menu-decor, .hero-sect-decor, .ftr-decor, .sect-404__decor, .contacts-decor');

  initParallaxFunc();

  window.addEventListener('resize', initParallaxFunc);

  if (sideMenu) {
    sideMenu.addEventListener('fixed', function() {
      decorElements = getElements('.php, .quote, .side-menu-decor, .hero-sect-decor, .ftr-decor, .sect-404__decor');
      initParallaxFunc();
    });

    sideMenu.addEventListener('unfixed', function() {
      decorElements = getElements('.php, .quote, .side-menu-decor, .hero-sect-decor, .ftr-decor, .sect-404__decor');
      initParallaxFunc();
    });
  }


})();
;(function() {
  let articlesSect = q('#category > .articles-wrapper .articles-sect');

  if (articlesSect) {
    let sortList = q('.sort__list', articlesSect),
      articlesBlocks = qa('.articles', articlesSect),
      articlesSectRow = q('.articles-sect__row', articlesSect),
      tagsBlock = q('#tags', articlesSect),
      queryTimer,
      removeError = function(where) {
        where = where || articlesSect;
        let error = q('.tags-error', where);
        if (error) {
          where.removeChild(error);
        }
      },
      formingTagsQuery = function() {
        let tagsStr = '&tag=',
          tagsText = [],
          selectedChilds = qa('.selected', tagsBlock, true);

        for (let i = 0; i < selectedChilds.length; i++) {
          tagsText[i] = selectedChilds[i].dataset.tag;
        }

        tagsStr += tagsText.join(', ');

        return tagsStr;
      },
      scollFunc = function() {
        let doc = document.documentElement;
        if ((doc.scrollHeight - doc.clientHeight <= window.pageYOffset + 500) && !inProgress) {
          articlesSect.classList.add('loading');
          inProgress = true;
          let tagsStr = formingTagsQuery() || '',
            sortParam = 'sort=' + q('.selected', sortList).dataset.value,
            xhr = new XMLHttpRequest(),
            data = 'action=loadsingles&' + sortParam + '&category=' + categoryId + '&offset=' + existsPostsCount;

          data += tagsStr;

          xhr.open('POST', siteurl + '/wp-admin/admin-ajax.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);

          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // console.log(xhr.response);
              articlesSectRow.insertAdjacentHTML('beforebegin', xhr.response);
              articlesBlocks = qa('.articles', articlesSect);
              existsPostsCount = qa('.single', articlesSect).length;
              if (totalPostsCount <= existsPostsCount) {
                window.removeEventListener('scroll', scollFunc);
              } else {
                inProgress = false;
              }
              lazy.refresh();
              articlesSect.classList.remove('loading');
            }
          });
        }
      },
      scrollListenerParams = !!Array.of && { passive: !0 },
      inProgress = false,
      totalPostsCount = articlesSect.getAttribute('data-posts-count'),
      existsPostsCount = qa('.single', articlesSect).length,
      categoryId = articlesSect.getAttribute('data-category-id');

    sortList.children[0].classList.add('selected');


    sortList.addEventListener('click', function() {
      let target = event.target;

      tagsBlock.classList.remove('active');

      removeError();

      if (!target.classList.contains('selected')) {

        articlesSect.classList.add('loading');

        let tagsStr = formingTagsQuery() || '',
          sortParam = 'sort=' + target.dataset.value,
          xhr = new XMLHttpRequest(),
          data = 'action=loadsingles&' + sortParam + '&category=' + articlesSect.getAttribute('data-category-id');

        data += tagsStr;

        xhr.open('POST', siteurl + '/wp-admin/admin-ajax.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            for (i = 0, len = articlesBlocks.length; i < len; i++) {
              articlesSect.removeChild(articlesBlocks[i]);
            }
            articlesSectRow.insertAdjacentHTML('beforebegin', xhr.response);
            articlesSect.classList.remove('loading');
            articlesBlocks = qa('.articles', articlesSect);
            existsPostsCount = qa('.single', articlesSect).length;
            if (totalPostsCount <= existsPostsCount) {
              window.removeEventListener('scroll', scollFunc);
            } else {
              inProgress = false;
            }
          }
        });

      }
    });

    document.addEventListener('click', function() {
      let target = event.target;

      if (Element.prototype.closest && !target.closest('#tags')) {
        tagsBlock.classList.remove('active');
      }
    });

    tagsBlock.addEventListener('click', function() {
      let target = event.target;

      if (target.classList.contains('tags__btn')) {
        if (!target.hasAttribute('data-tag') && target.classList.contains('selected')) {
          return;
        }
        if (queryTimer) {
         clearTimeout(queryTimer); 
        }
        let childs = qa('.tags__btn', tagsBlock, true);

        if (!target.hasAttribute('data-tag')) {
          for (let i = 0; i < childs.length; i++) {
            childs[i].classList.remove('selected');
          }
        } else {
          let checkAllBtn = q('.tags__btn:not([data-tag])', tagsBlock);

          checkAllBtn.classList.remove('selected');
        }
        

        target.classList.toggle('selected');

        queryTimer = setTimeout(function() {
          articlesSect.classList.add('loading');

          let selectedChilds = qa('.selected', tagsBlock, true),
            queryParam = 'sort=' + q('.selected', sortList).dataset.value,
            xhr = new XMLHttpRequest(),
            data = 'action=loadsingles&' + queryParam + '&category=' + articlesSect.getAttribute('data-category-id'),
            checkAllBtn = q('.tags__btn:not([data-tag])', tagsBlock),
            noSelected = childs.some(el => el.classList.contains('selected'));

          removeError();

          if (!noSelected) {
            checkAllBtn.classList.add('selected');
            tagsStr = '';
          } else {
            tagsStr = formingTagsQuery();
          }

          if (tagsStr === '&tag=' || tagsStr === '') {
            totalPostsCount = articlesSect.getAttribute('data-posts-count');
            if (totalPostsCount > existsPostsCount) {
              window.addEventListener('scroll', scollFunc, scrollListenerParams);
            }
          }

          data += tagsStr;

          xhr.open('POST', siteurl + '/wp-admin/admin-ajax.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);

          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              for (i = 0, len = articlesBlocks.length; i < len; i++) {
                articlesSect.removeChild(articlesBlocks[i]);
              }
              articlesSectRow.insertAdjacentHTML('beforebegin', xhr.response);
              articlesSect.classList.remove('loading');
              tagsBlock.classList.remove('active');
              articlesBlocks = qa('.articles', articlesSect);
              existsPostsCount = qa('.single', articlesSect).length;

              let countByTags = q('[data-posts-count-by-tags]', articlesSect);

              if (countByTags) {
                totalPostsCount = countByTags.getAttribute('data-posts-count-by-tags');
              }

              if (totalPostsCount <= existsPostsCount) {
                window.removeEventListener('scroll', scollFunc);
              } else {
                inProgress = false;
              }
            }
          });
        }, 1000);

      } else if (target.classList.contains('tags__show-btn')) {
        tagsBlock.classList.toggle('active');
      }
    });

  if (totalPostsCount > existsPostsCount) {
    window.addEventListener('scroll', scollFunc, scrollListenerParams);
  }

}
    
  
})();
//=include searchPopup.js
;(function() {
  let faqBlock = q('.faq-block');

  if (faqBlock) {
    let faqBlocks = faqBlock.children,

      initDropdown = function() {
        // let childs = faqBlocks[0].children;
        let parent = faqBlocks[0],
          childs = [q('.faq__question', parent), q('.faq__answer', parent)];

        hideText(1);
        faqBlocks[0].style.maxHeight = childs[0].scrollHeight + childs[1].scrollHeight + 'px';
        faqBlocks[0].classList.add('active');

        faqBlock.addEventListener('click', function() {
          let target = event.target;
          if (target.tagName === 'BUTTON') {
            dropdownText(target);
          }
        });

      },

      dropdownText = function(element) {
        element = element || faqBlocks[0]; // если элемент не передали, то открываем первый

        let minHeight = element.scrollHeight,
          parent = element.parentElement,
          // answer = element.nextElementSibling,
          answer = q('.faq__answer', parent),
          answerHeight = answer.scrollHeight;

        if (parent.classList.contains('active')) {
          if (faqBlocks.length > 1) {
            parent.style.maxHeight = minHeight + 'px';
            parent.classList.remove('active');
          }
        } else {
          hideText(0);

          parent.classList.add('active');
          parent.style.maxHeight = minHeight + answerHeight + 'px';
        }
      },
      
      hideText = function(start) {
        for (let i = start; i < faqBlocks.length; i++) {
          faqBlocks[i].classList.remove('active');
          // faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
          faqBlocks[i].style.maxHeight = q('.faq__question', faqBlocks[i]).scrollHeight + 'px';
        }
      };

    initDropdown();

  }

})();
;
(function() {
  let articleSect = q('#article');

  if (articleSect) {
    Share = {
      vkontakte: function(sharedUrl, sharedTitle, sharedImg, text) {
        let url = 'http://vkontakte.ru/share.php?';
        url += 'url=' + encodeURIComponent(sharedUrl);
        url += '&title=' + encodeURIComponent(sharedTitle);
        url += '&description=' + encodeURIComponent(text);
        url += '&image=' + encodeURIComponent(sharedImg);
        url += '&noparse=true';
        Share.popup(url);
      },
      facebook: function(sharedUrl, sharedTitle, sharedImg, text) {
        let url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(sharedTitle);
        url += '&p[summary]=' + encodeURIComponent(text);
        url += '&p[url]=' + encodeURIComponent(sharedUrl);
        url += '&p[images][0]=' + encodeURIComponent(sharedImg);
        Share.popup(url);
      },
      telegram: function(sharedUrl, sharedText) {
        let url = 'https://t.me/share/url?';
        url += 'url=' + encodeURIComponent(sharedUrl);
        // url += '&text=' + encodeURIComponent(sharedText);
        Share.popup(url);
      },
      popup: function(url) {
        window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
      }
    };
  }

})();
//=include loadmore.js

});