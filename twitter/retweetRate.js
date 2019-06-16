//debug
[...a].map(a0=>a0.querySelectorAll(".js-retweet-text").length);
[...a].map(a0=>a0.querySelectorAll(".js-pinned-text").length);

//make array of {K: 固定されたツイート、R: リツイート、通常: 0} into b
a=document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet");
b=[...a].map(a0=>{
 let kotei_flag=a0.querySelectorAll(".js-pinned-text").length>0;
 let retweet_flag=a0.querySelectorAll(".js-retweet-text").length>0;
 return kotei_flag?"K":retweet_flag?"R":0});
// calc retweet rate
b.filter(a=>a==="R").length+"/"+b.length;

//show retweet only
a.forEach(a0=>{
 let retweet_flag=a0.querySelectorAll(".js-retweet-text").length>0;
 console.log(retweet_flag);
 if (retweet_flag) { a0.style.display = "none"; }
 else { a0.style.display = ""; }
});
//show all
a.forEach(a0=>{a0.style.display = "";});

showArrayAll=(a)=>{
 let i=0;
 while(i<a.length){
  console.error(a.slice(i,i+100));
  i=i+100;
 }
 return a.length;
}
showArrayAll(b);
