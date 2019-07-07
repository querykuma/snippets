javascript: (() => {
 /* notranslateクラスを追加してGoogle翻訳対象外にするブックマークレット */
 document.querySelectorAll("pre").forEach(_ => _.classList.add("notranslate"));
})()
