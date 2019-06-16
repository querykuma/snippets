(function copyFavSortText(){
 ary = [];
 po=document.getElementById("permalink-overlay");
 if(po.style.display==="none"||!po.querySelector(".tweet"))po=document;
 po.querySelectorAll(".tweet").forEach(t =>{
  ary.push({
   name: t.querySelector("div.content span.FullNameGroup").innerText.replace(/[\r\n]/g, "").trim(),
   atname: t.querySelector("div.content span.username").innerText.trim(),
   time: t.querySelector("div.content small.time a").getAttribute("title"),
   text: t.querySelector(".tweet-text").innerText.replace(/^\n/,"").replace(/\n$/,""),
   fav: t.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count"),
   retweets: t.querySelector("span.ProfileTweet-action--retweet>span").getAttribute("data-tweet-stat-count")
  });
 });
 ary2 = ary.sort((a, b)=>{fav=b.fav-a.fav;if(fav!==0){return fav;};return b.retweets-a.retweets;});
 text = "";
 ary2.forEach(a0=>text+=`fav(${a0.fav})

${a0.text}
--------------------------------------------------------------
`);
 copy(text);
})();
