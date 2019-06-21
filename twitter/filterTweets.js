// 複数条件でフィルターしたいときconditionを直接編集
(function filterTweets(){
 text_match=/トランプ/;
 cnt_match=0;
 cnt_all=0;
 po=document.getElementById("permalink-overlay");
 if(po.style.display==="none"||!po.querySelector(".tweet"))po=document;
 po.querySelectorAll(".tweet").forEach(t =>{
  cnt_all++;
  replies=t.querySelector(".ProfileTweet-action--reply>span").getAttribute("data-tweet-stat-count");/*返信数*/
  favs=t.querySelector(".ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count");/*いいね数*/
  retweets=t.querySelector(".ProfileTweet-action--retweet>span").getAttribute("data-tweet-stat-count");/*リツイート数*/
  text=t.getElementsByClassName("tweet-text")[0].innerText;/*テキスト*/
  condition=text.match(text_match);
  if(condition){t.style.display="";cnt_match++;}else{t.style.display="none";}
 });
 return `${cnt_match}/${cnt_all}`;
})();

(function filterTweetsClear(){
 cnt_all=0;
 po=document.getElementById("permalink-overlay");
 if(po.style.display==="none"||!po.querySelector(".tweet"))po=document;
 po.querySelectorAll(".tweet").forEach(t =>{
  cnt_all++;
  t.style.display="";
 });
 return cnt_all;
})();

(function filterTweetsImages(){
 cnt_match=0;
 cnt_all=0;
 po=document.getElementById("permalink-overlay");
 if(po.style.display==="none"||!po.querySelector(".tweet"))po=document;
 po.querySelectorAll(".tweet").forEach(t =>{
  cnt_all++;
  condition=t.querySelector("img[data-aria-label-part]");
  if(condition){t.style.display="";cnt_match++;}else{t.style.display="none";}
 });
 return `${cnt_match}/${cnt_all}`;
})();

(function filterTweetsVideos(){
 cnt_match=0;
 cnt_all=0;
 po=document.getElementById("permalink-overlay");
 if(po.style.display==="none"||!po.querySelector(".tweet"))po=document;
 po.querySelectorAll(".tweet").forEach(t =>{
  cnt_all++;
  condition=t.querySelector(".is-video");
  if(condition){t.style.display="";cnt_match++;}else{t.style.display="none";}
 });
 return `${cnt_match}/${cnt_all}`;
})();
