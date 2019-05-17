function showFavorite(favCountLow, favCountHigh) {
  if (favCountHigh) {
    document.querySelectorAll("#stream-items-id>li").forEach(l => {
      fav = l.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count");
      if (fav >= favCountLow && fav <= favCountHigh) { l.style.display = ""; }
      else { l.style.display = "none"; }
    });
  } else {
    document.querySelectorAll("#stream-items-id>li").forEach(l => {
      fav = l.querySelector("span.ProfileTweet-action--favorite>span").getAttribute("data-tweet-stat-count");
      if (fav >= favCountLow) { l.style.display = ""; }
      else { l.style.display = "none"; }
    });
  }
}

function showAll() {
  document.querySelectorAll("#stream-items-id>li").forEach(l => { if (l.style.display === "none") { l.style.display = "" } });
}

function countDisplay() {
  return Array.from(document.querySelectorAll("#stream-items-id>li")).reduce((ac, cv) => ac + (cv.style.display === "" ? 1 : 0), 0);
}
