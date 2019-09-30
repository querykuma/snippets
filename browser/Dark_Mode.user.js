// ==UserScript==
// @name         Dark Mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  make the page dark
// @author       Query Kuma
// @match        https://*/*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
   'use strict';

    var darkmode1 = document.getElementsByClassName("darkmode1");

   if (darkmode1.length) {
      darkmode1[0].remove();
   } else {
      var common = "position:fixed;background:white;height:100%;width:100%;top:0;left:0;pointer-events:none;";
      document.body.insertAdjacentHTML('afterbegin', `
   <div class="darkmode1" style="display:none;display:block;">
    <div class="darkmode2" style="${common}z-index:-1;"></div>
    <div class="darkmode2" style="${common}mix-blend-mode:difference;z-index:2147483647;"></div>
   </div>
   `);
   }
})();
