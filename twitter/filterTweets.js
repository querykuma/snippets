// ���������Ńt�B���^�[�������Ƃ�condition�𒼐ڕҏW
(function filterTweets(){
 text_match=/�g�����v/;
 cnt_match=0;
 cnt_all=0;
 po=document.getElementById("permalink-overlay");
 if(po.style.display==="none"||!po.querySelector(".tweet"))po=document;
 po.querySelectorAll(".tweet").forEach(t =>{
  cnt_all++;
  replies=t.querySelector(".ProfileTweet-action--reply>span").getAttribute("data-tweet-stat-count");/*�ԐM��*/
  favs=t.querySelector(".ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count");/*�����ː�*/
  retweets=t.querySelector(".ProfileTweet-action--retweet>span").getAttribute("data-tweet-stat-count");/*���c�C�[�g��*/
  text=t.getElementsByClassName("tweet-text")[0].innerText;/*�e�L�X�g*/
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
