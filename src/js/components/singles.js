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