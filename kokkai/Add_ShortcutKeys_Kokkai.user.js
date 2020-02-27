// ==UserScript==
// @name         Kokkai Add ShortcutKeys
// @namespace    https://github.com/querykuma/
// @version      1.0
// @description  国会動画(衆議院インターネット審議中継、参議院インターネット審議中継)にショートカットキー追加
// @author       Query Kuma
// @match        http://www.shugiintv.go.jp/jp/index.php*
// @match        https://www.webtv.sangiin.go.jp/webtv/detail.php*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	var video, volume;

	if (document.URL.search(/sangiin/) > 0) {

		video = document.querySelectorAll('video')[1];

		//これをしないと一度クリックしないといけなくなる
		video.parentElement.focus();
	} else {

		video = document.querySelectorAll('video')[0];
	}

	var moveTime = 5; //←,→
	var moveTime2 = 10; //J,L
	var moveTime3 = 30; //ctrlKey+←,→
	var moveVolume = 0.05; //↑,↓

	var event_keydown = (e) => {
		//ctrlKeyを押している場合
		if (e.ctrlKey) {
			switch (e.code) {
				case 'ArrowLeft':
					e.preventDefault();
					video.currentTime -= moveTime3;
					return;

				case 'ArrowRight':
					e.preventDefault();
					video.currentTime += moveTime3;
					return;

				default:
					//ctrlKeyを押している場合は以降何もしない
					return;
			}
		}

		//shiftKeyなどを押している場合は以降何もしない
		if (e.shiftKey) return;
		if (e.altKey) return;

		switch (e.code) {
			case 'Space':
				e.preventDefault();
				console.log("Space: video.currentTime = " + video.currentTime);
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
				return;

			case 'ArrowLeft':
				e.preventDefault();
				video.currentTime -= moveTime;
				return;

			case 'ArrowRight':
				e.preventDefault();
				video.currentTime += moveTime;
				return;

			case 'KeyJ':
				e.preventDefault();
				video.currentTime -= moveTime2;
				return;

			case 'KeyL':
				e.preventDefault();
				video.currentTime += moveTime2;
				return;

			case 'ArrowUp':
				e.preventDefault();
				volume = Math.round((video.volume + moveVolume) * 100) / 100;
				if (volume > 1) volume = 1;
				video.volume = volume;
				return;

			case 'ArrowDown':
				e.preventDefault();
				volume = Math.round((video.volume - moveVolume) * 100) / 100;
				if (volume < 0) volume = 0;
				video.volume = volume;
				return;

			case 'KeyF':
				e.preventDefault();
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					video.requestFullscreen();
				}
				// eslint-disable-next-line no-useless-return
				return;

			default:
				// eslint-disable-next-line no-useless-return
				return;
		}
	};

	document.addEventListener('keydown', event_keydown);
})();
