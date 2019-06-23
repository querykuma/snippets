// ==UserScript==
// @name         qiitaAddKeysLRArrow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Qiitaのページで左右矢印キーで前後のページに移動
// @author       Query Kuma
// @match        https://qiita.com/*
// @grant        none
// ==/UserScript==

(function () {
 'use strict';
 const use_autopagerize = 1; /* autopagerizeを使っていない場合は0に */

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

   document.body.userscript_keys = 1;
   document.addEventListener('keydown', keydown_link);

   return;
  }
 }

 const delayed = () => {
  clearInterval(timer);

  if (!document.getElementsByClassName("st-Pager_next").length) return;

  const keydown_pager = e => {

   if (checkTarget(e)) return;

   if (e.key === 'ArrowRight') {
    document.getElementsByClassName("st-Pager_next")[0].firstElementChild.click();
   } else if (e.key === 'ArrowLeft') {
    document.getElementsByClassName("st-Pager_prev")[0].firstElementChild.click();
   };
  };

  document.body.userscript_keys = 1;
  document.addEventListener('keydown', keydown_pager);
 };

 const timer = setInterval(delayed, 500);

})();
