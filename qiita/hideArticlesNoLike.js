//QiitaがXHR化したSingleページ(tag一覧)でLike数が0の記事を非表示にする。ついでにトレンドも非表示。
(function hideArticlesNoLike() {
 var once = true;
 var debug_cnt = 0;
 var init = () => {
  if (typeof keydown !== 'undefined') document.removeEventListener('keydown', keydown);
  var keydown = e => {
   if (e.key === 'ArrowRight') {
    document.querySelector(".st-Pager_next").children[0].click();
   } else if (e.key === 'ArrowLeft') {
    document.querySelector(".st-Pager_prev").children[0].click();
   }
  };
  document.addEventListener('keydown', keydown);
  delay();
 }
 var delay = () => {
  console.log(debug_cnt++);
  var f = a0 => {
   once = true;
   document.querySelector(".p-tagShow_mainMiddle").style.display = "none";//トレンドを非表示
   document.querySelector(".tsf-ArticleList_view").style.minHeight = 'auto';
   if (a0.querySelector(".tsf-ArticleBody_likeCount").innerText === "0") { a0.style.display = "none" }
   else { a0.style.display = "" }
  };
  [...document.querySelectorAll(".tsf-ArticleList_view .tsf-Article")].map(f);
 };
 init();

 var target = document.querySelector(".tsf-ArticleList_view");//次へを押したときMutationObserverが動く
 if (typeof observer !== "undefined") observer.disconnect();
 var observer = new MutationObserver(records => {
  if (once) {
   once = false;
   setTimeout(delay, 300);
  }
 });
 var options = {
  childList: true
 };
 observer.observe(target, options);
})();
