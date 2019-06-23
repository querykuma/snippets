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

 const delayed = () => {
  clearInterval(timer);

  if (!document.getElementsByClassName("st-Pager_next").length) return;

  const keydown = e => {
   if (e.key === 'ArrowRight') {
    document.getElementsByClassName("st-Pager_next")[0].firstElementChild.click();
   } else if (e.key === 'ArrowLeft') {
    document.getElementsByClassName("st-Pager_prev")[0].firstElementChild.click();
   };
  };

  document.body.userscript_keys = 1;
  document.addEventListener('keydown', keydown);
 };

 const timer = setInterval(delayed, 500);

})();
