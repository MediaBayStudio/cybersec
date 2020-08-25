//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

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
//=include menu.js
//=include popups.js
//=include forms.js
//=include sliders.js
//=include fixSideMenu.js
//=include parallax.js
//=include singles.js
//=include searchPopup.js

});