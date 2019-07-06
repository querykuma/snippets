// ==UserScript==
// @name         Qiita Add LRArrow ShortcutKeys
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  QiitaのXHRで前後のページを取得するページにおいて左右矢印キーで前後のページに移動
// @author       Query Kuma
// @match        https://qiita.com/tags/*
// @match        https://qiita.com/organizations/*
// @grant        none
// ==/UserScript==

(function () {
 'use strict';

 const delayed = () => {

  if (!document.getElementsByClassName("st-Pager_next").length) return;

  if (document.getElementsByClassName("st-Pager_next")[0].querySelector("a[href]")) return;

  const keydown_pager = e => {

   const scroll_to_node = () => {
    let scroll_node = document.querySelector(".p-tagShow_mainBottom") /* tags 最近の記事 */;
    if (!scroll_node) {
     scroll_node = document.querySelector('[data-hyperapp-app="OrganizationNewestArticles"]'); /* organization 最新の記事 */
    }
    if (scroll_node) {
     scrollTo(0, scroll_node.offsetTop);
    }
   }

   if (e.key === 'ArrowRight') {
    document.getElementsByClassName("st-Pager_next")[0].firstElementChild.click();
    scroll_to_node();
   } else if (e.key === 'ArrowLeft') {
    document.getElementsByClassName("st-Pager_prev")[0].firstElementChild.click();
    scroll_to_node();
   };

  };

  document.addEventListener('keydown', keydown_pager);
 };

 setTimeout(delayed, 500);

})();
