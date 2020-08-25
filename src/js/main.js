//polyfills
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
let lazy,
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
    // clearSrc: true,
    // clearMedia: true
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
        console.log(attributes[i]);
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
  //includes
menu = new MobileMenu('.mobile-menu', {
  openButton: '.burger',
  closeButtons: '.burger',
  overlay: '.overlay',
  toRight: true,
  // fixHeader: '.hdr'
});
(function() {
  // thanksPopup = new Popup('.thanks-popup', {
  //   closeButtons: '.thanks-popup__close'
  // });

  // thanksPopup.addEventListener('popupbeforeopen', function() {
  //   clearTimeout(thanksPopupTimer);
  // });

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
// ;(function() {
//   $('form').each(function() {
//     $(this).validate({
//       rules: {
//         'user-name': {
//           required: true,
//           userName: true,
//           minlength: 2
//         },
//         'user-tel': {
//           required: true,
//           userPhone: true
//         },
//         'user-email': {
//           email: true
//         },
//         'policy': {
//           required: true,
//           minlength: 1
//         }
//       },
//       messages: {
//         'user-name': {
//           required: 'Укажите имя',
//           minlength: jQuery.validator.format('Имя не может быть таким коротким'),
//           userName: 'Допустимы только буквы'
//         },
//         'user-tel': {
//           required: 'Укажите телефон',
//           userPhone: 'Укажите верный номер телефона'
//         },
//         'user-email': {
//           email: 'Укажите верный E-mail'
//         },
//         'privacy-policy': {
//           required: 'Согласитель с политикой обработки персональных данных'
//         }
//       },
//       onfocusout: false,
//       errorClass: 'invalid',
//       submitHandler: function(form, event) {
//         event.preventDefault();

//         $(form).find('input, textarea').removeClass('filled');
        
//         $(this)[0].resetForm();
      
//       }
//       });
//     });

//     // form beforesubmit validate
//     $('form .btn').on('click', function() {
//       if (!$(event.target).parents('form').valid()) {
//         event.preventDefault();
//       }
//     });

//   })();


//   $('.field__inp').on('input', function() {
//     if ($(this).val() !== '') {
//       $(this).addClass('filled');
//     } else {
//       $(this).removeClass('filled');
//     }
//   });

//   $.validator.methods.userName = function(value, element) {
//     return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
//   };

//   $.validator.methods.userPhone = function(value, element) {
//     return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
//   };

// ;(function() {
//   let nextArrow = '<button type="button" class="arrow"></button>',
//     prevArrow = '<button type="button" class="arrow"></button>',
//     dot = '<button type="button" class="dot"></button>',
//     slidesSect = document.querySelector('.slidesSect'),
//     slides = slidesSect.querySelectorAll('.slide'),

//     buildSlider = function() {
//       // если ширина экрана больше 578px и слайдов меньше 4, то слайдера не будет
//       if (matchMedia('(min-width: 575.98px)').matches && slides.length < 4) {
//         if (slidesSect.hasClass('slick-slider')) {
//           slidesSect.slick('unslick');
//         }
//       // если ширина экрана больше 1440px и слайдов меньше 7, то слайдера не будет
//       } else if (matchMedia('(min-width: 1439.98px)').matches && slides.length < 7) {
//         if (slidesSect.hasClass('slick-slider')) {
//           slidesSect.slick('unslick');
//         }
//       // в других случаях делаем слайдер
//       } else {
//         if (slidesSect.hasClass('slick-slider')) {
//           // слайдер уже создан
//           return;
//         }
//         if (slides.length && slides.length > 2) {
//           slidesSect.slick({
//           // appendDots: $('element'),
//           // appendArrows: $('element'),
//           // autoplay: true,
//           // autoplaySpeed: 3000,
//           // adaptiveHeight: false,
//           // asNavFor: $('element'),
//           // centerMode: false,
//           // centerPadding: '50px',
//           // cssEase: 'ease',
//           // draggable: true,
//           // slide: 'selector',
//           accessibility: false,
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           arrows: false, // true by default
//           dots: true,
//           dotsClass: 'partners__dots dots',
//           customPaging: function() {
//             return dot;
//           },
//             mobileFirst: true,
//             responsive: [{
//               breakpoint: 575.98,
//               settings: {
//                 slidesToScroll: 1,
//                 slidesToShow: 3
//               }
//             }, {
//               breakpoint: 1439.98,
//               settings: {
//                 slidesToScroll: 1,
//                 slidesToShow: 5
//               }
//             }]
//           });
//         }
//       }
//     };

//   if (slides.length && slides.length > 0) {
//     window.addEventListener('resize', buildSlider);
//     buildSlider();
//   }

//   // настройки grab курсора на всех слайдерах
//   $('.slick-list.draggable').on('mousedown', function() {
//     $(this).addClass('grabbing');
//   });

//   $('.slick-list.draggable').on('beforeChange', function() {
//     $(this).removeClass('grabbing');
//   });

//   $(document).on('mouseup', function() {
//     $('.slick-list.draggable').removeClass('grabbing');
//   });


// })();
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


    console.log(sideMenu);
    console.log(sideMenuClone);
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
    decorElements = getElements('.php, .quote, .side-menu-decor, .hero-sect-decor, .ftr-decor');

  initParallaxFunc();

  window.addEventListener('resize', initParallaxFunc);

  if (sideMenu) {
    sideMenu.addEventListener('fixed', function() {
      decorElements = getElements('.php, .quote, .side-menu-decor, .hero-sect-decor, .ftr-decor');
      initParallaxFunc();
      console.log(decorElements);
    });

    sideMenu.addEventListener('unfixed', function() {
      decorElements = getElements('.php, .quote, .side-menu-decor, .hero-sect-decor, .ftr-decor');
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
      };

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
            // articlesBlocks.innerHTML = xhr.response;
            for (i = 0, len = articlesBlocks.length; i < len; i++) {
              articlesSect.removeChild(articlesBlocks[i]);
            }
            articlesSectRow.insertAdjacentHTML('beforebegin', xhr.response);
            articlesSect.classList.remove('loading');
            articlesBlocks = qa('.articles', articlesSect)
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

          data += tagsStr;

          xhr.open('POST', siteurl + '/wp-admin/admin-ajax.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);

          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // articlesBlocks.innerHTML = xhr.response;
              for (i = 0, len = articlesBlocks.length; i < len; i++) {
                articlesSect.removeChild(articlesBlocks[i]);
              }
              articlesSectRow.insertAdjacentHTML('beforebegin', xhr.response);
              articlesSect.classList.remove('loading');
              tagsBlock.classList.remove('active');
              articlesBlocks = qa('.articles', articlesSect)
            }
          });
        }, 1000);

      } else if (target.classList.contains('tags__show-btn')) {
        tagsBlock.classList.toggle('active');
      }
    });
  }
    
  
})();
;(function() {
  
})();

});