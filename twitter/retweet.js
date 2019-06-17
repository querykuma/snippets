// 「リツイート数/ツイート総数」（表示分のみ）を返す
(function calcRetweetRate(){
 a=document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet");
 b=[...a].map(a0=>{
  kotei_flag=a0.querySelectorAll(".js-pinned-text").length>0;
  retweet_flag=a0.querySelectorAll(".js-retweet-text").length>0;
  return kotei_flag?"K":retweet_flag?"R":0;
 });
 return b.filter(a=>a==="R").length+"/"+b.length;
})();

(function hideRetweets(){
 a=document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet");
 a.forEach(a0=>{
  let retweet_flag=a0.querySelectorAll(".js-retweet-text").length>0;
  if (retweet_flag) { a0.style.display = "none"; }
  else { a0.style.display = ""; }
 });
})();

(function showRetweetsOnly(){
 a=document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet");
 a.forEach(a0=>{
  let retweet_flag=a0.querySelectorAll(".js-retweet-text").length>0;
  if (retweet_flag) { a0.style.display = ""; }
  else { a0.style.display = "none"; }
 });
})();

(function showAll(){
 a=document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet");
 a.forEach(a0=>{a0.style.display = "";});
})();
