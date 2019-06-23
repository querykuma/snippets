/* console.logを取り戻す */
(function regainConsoleLogFromTwitter() {
 if (!/^https?:\/\/twitter\.com/.test("https://twitter.com/")) return;

 iframe = document.getElementsByTagName("iframe")[0];
 if (!iframe) {
  iframe = document.createElement("iframe");
  document.body.insertAdjacentElement("beforeend", iframe);
 }
 console.log = iframe.contentWindow.console.log;
})();
