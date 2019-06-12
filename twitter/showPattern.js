// 検索結果に対して showPattern(/支持|ブーメラン/,/丸山/,/^((?!自民)[\s\S])*$/)
function showPattern(...pattern) {
    document.querySelectorAll("div.stream>ol:nth-of-type(1)>li.stream-item").forEach(a0 => {
        mat = true;
        pattern.forEach(p0=>{
            mat = mat && a0.querySelector("div.content").innerText.match(p0);
        })
        if (mat) { a0.style.display = ""; }
        else { a0.style.display = "none"; }
    });
    return Array.from(document.querySelectorAll("div.stream>ol:nth-of-type(1)>li.stream-item")).reduce((ac,cv)=>ac+(cv.style.display==="none"?0:1),1);
}

//1つのレスのポップアップに対して
function showPattern2(...pattern) {
　document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item")    　.forEach(a0 => {
        mat = true;
        pattern.forEach(p0=>{
            mat = mat && a0.querySelector("div.content").innerText.match(p0);
        })
        if (mat) { a0.style.display = ""; }
        else { a0.style.display = "none"; }
    });
    return Array.from(document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item")).reduce((ac,cv)=>ac+(cv.style.display==="none"?0:1),1);
}


function copyFavSortText2() {
  ary = [];
  document.querySelectorAll("div.stream>ol:nth-of-type(1)>li.stream-item").forEach(l => {
    ary.push({
      name: l.querySelector("div.content span.FullNameGroup").innerText.replace(/[\r\n]/g, "").trim(),
      atname: l.querySelector("div.content span.username").innerText.trim(),
      time: l.querySelector("div.content small.time a").getAttribute("title"),
      text: l.querySelector("div.content div.js-tweet-text-container").innerText.replace(/^\n/,"").replace(/\n$/,""),
      fav: l.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count"),
      retweets: l.querySelector("span.ProfileTweet-action--retweet>span").getAttribute("data-tweet-stat-count")
    });
  });
  ary2 = ary.sort((a, b) => (b.fav - a.fav)*10000+(b.retweets - a.retweets) );
  c = "";
  ary2.forEach(a0 => c = c + `fav(${a0.fav})

${a0.text}
--------------------------------------------------------------
`);
  copy(c);
}

function copyFavSortText3() {
  ary = [];
  document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet").forEach(l => {
    ary.push({
      name: l.querySelector("div.content span.FullNameGroup").innerText.replace(/[\r\n]/g, "").trim(),
      atname: l.querySelector("div.content span.username").innerText.trim(),
      time: l.querySelector("div.content small.time a").getAttribute("title"),
      text: l.querySelector("div.content div.js-tweet-text-container").innerText.replace(/^\n/,"").replace(/\n$/,""),
      fav: l.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count"),
      retweets: l.querySelector("span.ProfileTweet-action--retweet>span").getAttribute("data-tweet-stat-count")
    });
  });
  ary2 = ary.sort((a, b) => (b.fav - a.fav)*10000+(b.retweets - a.retweets) );
  c = "";
  ary2.forEach(a0 => c = c + `fav(${a0.fav})

${a0.text}
--------------------------------------------------------------
`);
  copy(c);
}

function showImagesOnly() {
  document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet").forEach(l=>{
	  let a=l.querySelector("img[data-aria-label-part]");
      if (a) { l.style.display = ""; }
      else { l.style.display = "none"; }
  });
//  document.querySelectorAll("div.stream:not(.permalink-replies)>ol:nth-of-type(1) li.stream-item>div.tweet").forEach(l=>{l.style.display = "";})
}
