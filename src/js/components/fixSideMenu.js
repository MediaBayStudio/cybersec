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