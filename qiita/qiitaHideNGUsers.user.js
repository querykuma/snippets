// ==UserScript==
// @name         Qiita Hide NG Users
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Qiitaのページで特定ユーザーを非表示にする
// @author       Query Kuma
// @match        https://qiita.com/tags/*
// @match        https://qiita.com/organizations/*
// @match        https://qiita.com/
// @match        https://qiita.com/items
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const NG_USERS = [
    '',
  ];

  var timeout_id = 0;

  const hide_ng_users = () => {
    document.querySelectorAll("article,.tr-Item,.of-PopularItem,.of-ItemLink").forEach(article => {

      // tags, organizations, itemsなどで統一されていないので長くなった。
      const user = article.querySelector(".tsf-ArticleBody_author,.tst-ArticleBody_author,.ItemLink__info>a,.tr-Item_author,.of-PopularItem_author,.of-ItemLink_author").textContent;

      if (NG_USERS.indexOf(user) !== -1) {
        article.style.display = 'none';
        console.log('NG USER: ' + user);
      }
    });
  };

  const delayed = _timeout_id => {
    // 追加分の完了がわからないのでsetTimeoutから100ミリ秒以内に追加されていないことを条件にした。
    if (timeout_id === _timeout_id) {
      hide_ng_users();
    }
  };

  const target = document.body;
  const observer = new MutationObserver(() => {
    timeout_id++;
    setTimeout(delayed, 100, timeout_id);
  });

  setTimeout(delayed, 100, timeout_id);

  const config = { childList: true, subtree: true };
  observer.observe(target, config);

})();
