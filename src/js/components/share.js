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