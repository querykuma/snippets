javascript: (() => {
  location_href = window.location.href;
  title = document.title;
  index = 1;
  html_head = `<title>twitter2thread</title>
<base target="_blank">
<style>
.post{background-color:white;display: inline-block;margin-bottom: 8px;padding: 15px;border-width: 1px;border-style: none solid solid none;border-color: #ddd;border-radius: 10px;}
.type{color: #657786;font-size: 12px;}
.threaded_conversation{margin-left: 40px;}
.head{font-size:14px;}
.name{color:#777;}
.meta{color:#888;font-size:14px;margin-bottom:5px;}
.message{font-size:17px;}
.premessage{white-space: pre-wrap;}
body{font-family:-apple-system,Segoe UI,Helvetica Neue,"ヒラギノ角ゴ ProN W3",Hiragino Kaku Gothic ProN,kleeaa,"メイリオ",meiryo,"ＭＳ Ｐゴシック","MS PGothic",sans-serif; font-size: 18px; color: #404040; line-height: 1.5;background-color: #f2f3f7;}
img{max-width:300px;margin:3px;}
a{font-size: 14px;}
.Emoji--forText{height: 1em;width: 1em;padding: 0 .05em 0 .1em;vertical-align: -0.3em;}
.u-hidden{display: none;}
.retweet{display:none;display:inline-block;}
.frame0{border: 1px solid #ddd;border-radius: .85714em;margin:10px;padding:10px;}
.frame1,.frame2,.frame3{margin: 0;font-size: 15px;}
.frame3{color:#8899A6}
</style>
`;

  function writeTweet(t) {
    pinned_flag = t.querySelector(".js-pinned-text");/*固定されたツイート*/
    retweet_flag = t.querySelector(".js-retweet-text");/*リツイート*/

    card = t.querySelector(".js-macaw-cards-iframe-container");
    card_url = card && card.getAttribute("data-card-url");
    card_url_html = card_url ? `<a href="${card_url}">${card_url}</a>` : '';

    quote_tweet = t.querySelector("a.QuoteTweet-link");
    quote_tweet_href = quote_tweet && quote_tweet.getAttribute("href");
    quote_tweet_html = quote_tweet_href ? `<a href="${quote_tweet_href}">${quote_tweet_href}</a>` : '';

    tweet_text = t.querySelector(".tweet-text").innerHTML;
    message = `<div class="premessage">${tweet_text}</div>`;

    reply_count = t.getElementsByClassName("ProfileTweet-action--reply")[0].getElementsByClassName("ProfileTweet-actionCount")[0].getAttribute("data-tweet-stat-count");
    retweet_count = t.getElementsByClassName("ProfileTweet-action--retweet")[0].getElementsByClassName("ProfileTweet-actionCount")[0].getAttribute("data-tweet-stat-count");
    fav_count = t.getElementsByClassName("ProfileTweet-action--favorite")[0].getElementsByClassName("ProfileTweet-actionCount")[0].getAttribute("data-tweet-stat-count");

    img = t.querySelectorAll("img[data-aria-label-part]");
    if (img.length) {
      message += "<br>";
      img.forEach(img_e => {
        img_src = img_e.getAttribute("src");
        message += `<a href="${img_src}"><img src="${img_src}"></a>`;
      });
    };

    video = t.querySelector(".PlayableMedia-player");
    if (video) {
      video_img_src = video.style.backgroundImage.replace(/^url\("(.*)\"\)$/, "$1");
      message += `<br><a href="${video_img_src}"><img src="${video_img_src}"></a>video`;
    };

    iframe = t.querySelector("iframe");/*iframeのとき*/
    if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
      body = iframe.contentDocument.body;
      if (body.getElementsByTagName("h2").length) {
        h2 = body.getElementsByTagName("h2")[0].innerText;
        p = body.getElementsByTagName("p").length ? body.getElementsByTagName("p")[0].innerText : "";
        span = body.getElementsByTagName("span").length ? body.getElementsByTagName("span")[0].innerText : "";
        message += `<div class="frame0">
<h2 class="frame1">${h2}</h2>
<p class="frame2">${p}</p>
<span class="frame3">${span}</span>
</div>`;
      }
    }

    qt = t.querySelector(".QuoteTweet");/*ツイートを引用してツイートするとき*/
    if (qt) {
      qt_meta = qt.querySelector(".QuoteTweet-fullname").innerText + qt.querySelector(".username").innerText;
      qt_message = qt.querySelector(".QuoteTweet-text").innerText;
      message += `<div class="frame0">
<div class="meta">${qt_meta}</div>
<p class="frame2">${qt_message}</p>
${qt.getElementsByClassName("AdaptiveMedia-badgeText").length ? "video" : ""}
</div>`
    }

    reply_href = t.querySelector(".time>a").getAttribute("href");

    var time_ms = t.querySelector("._timestamp").getAttribute("data-time-ms");
    date = new Date(Number(time_ms));

    dayOfWeek = "日月火水木金土"[date.getDay()];
    dt = `${date.getFullYear()}/${((date.getMonth() + 1) + "").padStart(2, "0")}/${(date.getDate() + "").padStart(2, "0")}(${dayOfWeek}) ${(date.getHours() + "").padStart(2, "0")}:${(date.getMinutes() + "").padStart(2, "0")}`;

    name = t.getAttribute("data-name") + "@" + t.getAttribute("data-screen-name");
    threaded_conversation_flag = t.parentElement.parentElement.previousElementSibling && t.parentElement.parentElement.previousElementSibling.classList.contains("ThreadedConversation-tweet");

    classpost = "post";
    if (threaded_conversation_flag) classpost += " threaded_conversation";
    if (retweet_flag) classpost += " retweet";

    reply_html = `<a href="${reply_href}">${reply_count}</a>`;
    meta = `<div class="meta">${index}　<span class="name">${name}</span>　${dt}　返:${reply_html}　リ:${retweet_count}　い:${fav_count}</div>`;

    wdoc.write(`${pinned_flag ? '<div class="type">固定されたツイート</div>' : ''}
${retweet_flag ? '<div class="type"><span class="retweet">リツイート</span></div>' : ''}
<div class="${classpost}">
 ${meta}
 <div class="message">${message}</div>
 ${card_url_html}
 ${quote_tweet_html}
</div>
<br ${retweet_flag ? 'class="retweet"' : ''}>`);
  }

  function caseOuter() {
    document.querySelectorAll(".tweet").forEach(t => {
      writeTweet(t);
      index++;
    });
  }

  function caseOverlay(po) {
    po.querySelectorAll(".tweet").forEach(t => {
      writeTweet(t);
      index++;
    });
  }

  po = document.getElementById("permalink-overlay");
  if (!po) {
    console.error("not supported");
    return;
  }

  wdoc = window.open('', '_blank').document;
  wdoc.write(html_head);

  if (po.style.display !== "none" && po.querySelector(".tweet")) {
    caseOverlay(po);
  } else {
    caseOuter();
  }

  wdoc.write(`<br><div class="head"><a href="${location_href}">${location_href}</a>　${title}</div>`);
  wdoc.close();
})()
