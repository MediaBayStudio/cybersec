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