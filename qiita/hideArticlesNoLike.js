//QiitaがXHR化したSingleページ(tag一覧)でLike数が0の記事を非表示にする。ついでにトレンドも非表示。
(function hideArticlesNoLike() {
 var once = true;
 var debug_cnt = 0;

 var init = () => {
  delay();

  if (document.body.userscript_keys) return; /* qiitaAddKeysLRArrow.user.jsが動作中 */

  if (typeof keydown !== 'undefined') document.removeEventListener('keydown', keydown);

  var keydown = e => {
   if (e.key === 'ArrowRight') {
    document.querySelector(".st-Pager_next").children[0].click();
   } else if (e.key === 'ArrowLeft') {
    document.querySelector(".st-Pager_prev").children[0].click();
   }
  };

  document.addEventListener('keydown', keydown);
 }

 var delay = () => {
  once = true;
  document.querySelector(".p-tagShow_mainMiddle").style.display = "none";//トレンドを非表示
  document.querySelector(".tsf-ArticleList_view").style.minHeight = 'auto';
  var f = a0 => {
   if (a0.querySelector(".tsf-ArticleBody_likeCount").innerText === "0") { a0.style.display = "none"; }
   else { a0.style.display = ""; }
  };
  [...document.querySelectorAll(".tsf-ArticleList_view .tsf-Article")].map(f);
 };

 init();

 var target = document.querySelector(".tsf-ArticleList_view");//次へを押したときMutationObserverが動く

 if (typeof observer !== "undefined") observer.disconnect();

 observer = new MutationObserver(records => {
  if (once) {
   once = false;
   setTimeout(delay, 300);
  }
 });

 var options = {
  childList: true,
  subtree: true
 };

 observer.observe(target, options);
})();
