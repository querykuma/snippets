function showFavorite(favCountLow, favCountHigh) {
  if (favCountHigh) {
    document.querySelectorAll("div.replies-to ol[id]>li").forEach(l => {
      fav = l.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count");
      if (fav >= favCountLow && fav <= favCountHigh) { l.style.display = ""; }
      else { l.style.display = "none"; }
    });
  } else {
    document.querySelectorAll("div.replies-to ol[id]>li").forEach(l => {
      fav = l.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count");
      if (fav >= favCountLow) { l.style.display = ""; }
      else { l.style.display = "none"; }
    });
  }
}

function showAll() {
  document.querySelectorAll("div.replies-to ol[id]>li").forEach(l => { if (l.style.display === "none") { l.style.display = "" } });
}

function countDisplay() {
  return Array.from(document.querySelectorAll("div.replies-to ol[id]>li")).reduce((ac, cv) => ac + (cv.style.display === "none" ? 0 : 1), 0);
}

function copyFavSortText() {
  ary = [];
  document.querySelectorAll("div.replies-to ol[id]>li").forEach(l => {
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
