//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

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
//=include menu.js
//=include popups.js
//=include forms.js
//=include sliders.js
//=include fixSideMenu.js
//=include parallax.js
//=include singles.js
//=include searchPopup.js
//=include dropdownText.js
//=include share.js
//=include loadmore.js

});