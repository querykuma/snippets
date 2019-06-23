//QiitaがXHR化したSingleページ(tag一覧)でLike数が0の記事を非表示にする。ついでにトレンドも非表示。
(function hideArticlesNoLike() {
 var once = true;
 var delay = () => {
  var f = a0 => {
   once = true;
   document.querySelector(".p-tagShow_mainMiddle").style.display = "none";//トレンドを非表示
   document.querySelector(".tsf-ArticleList_view").style.minHeight = 'auto';
   if (a0.querySelector(".tsf-ArticleBody_likeCount").innerText === "0") { a0.style.display = "none" }
   else { a0.style.display = "" }
  };
  [...document.querySelectorAll(".tsf-ArticleList_view .tsf-Article")].map(f);
 };
 delay();

 var target = document.querySelector(".tsf-ArticleList_view");//次へを押したときMutationObserverが動く
 if (typeof observer !== "undefined") observer.disconnect();
 var observer = new MutationObserver(records => {
  console.log(records.length);
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
