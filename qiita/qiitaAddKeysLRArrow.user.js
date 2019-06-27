// ==UserScript==
// @name         Qiita Add LRArrow ShortcutKeys
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Qiitaのページで左右矢印キーで前後のページに移動
// @author       Query Kuma
// @match        https://qiita.com/*
// @grant        none
// ==/UserScript==

(function () {
 'use strict';

 const use_autopagerize = 1; /* autopagerizeを使っている場合は1、autopagerizeを使っていない場合は0に */

 const checkTarget = e => {
  if (e.target.tagName === "INPUT") return true;
  return false;
 }

 if (!use_autopagerize) {

  if (document.getElementsByClassName("js-next-page-link").length) {
   const keydown_link = e => {

    if (checkTarget(e)) return;

    if (e.key === 'ArrowRight') {
     document.getElementsByClassName("js-next-page-link")[0].firstElementChild.click();
    } else if (e.key === 'ArrowLeft') {
     document.getElementsByClassName("js-previous-page-link")[0].firstElementChild.click();
    };
   };

   document.addEventListener('keydown', keydown_link);

  } else if (document.querySelector('a[rel="next"][href]')) {/* ユーザー一覧 */
   const keydown_link = e => {

    if (checkTarget(e)) return;

    if (e.key === 'ArrowRight') {
     document.querySelector('a[rel="next"][href]').click();
    } else if (e.key === 'ArrowLeft') {
     document.querySelector('a[rel="prev"][href]').click();
    };
   };

   document.addEventListener('keydown', keydown_link);

  }
 }

 document.activeElement.blur(); /* 検索結果のページでフォーカスを外す */

 const delayed = () => {

  if (!document.getElementsByClassName("st-Pager_next").length) return;

  if (document.getElementsByClassName("st-Pager_next")[0].firstElementChild.getAttribute("href")) return;

  const keydown_pager = e => {

   if (checkTarget(e)) return;

   const scroll_to_node = () => {
    let scroll_node = document.querySelector(".p-tagShow_mainBottom");
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
