/* console.logを取り戻す */
(function regainConsoleLogFromTwitter() {
 if (!/^https?:\/\/twitter\.com/.test(document.URL)) return;

 var iframe = document.getElementsByTagName("iframe");
 if (iframe.length) {
  iframe = iframe[0];
 } else {
  iframe = document.createElement("iframe");
  document.body.insertAdjacentElement("beforeend", iframe);
 }
 console.log = iframe.contentWindow.console.log;
})();
