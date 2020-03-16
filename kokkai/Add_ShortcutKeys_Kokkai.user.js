// ==UserScript==
// @name         Kokkai Add ShortcutKeys
// @namespace    https://github.com/querykuma/
// @version      1.02
// @description  国会動画(衆議院インターネット審議中継, 参議院インターネット審議中継)にショートカットキー追加
// @author       Query Kuma
// @match        http*://www.shugiintv.go.jp/jp/index.php*
// @match        https://www.webtv.sangiin.go.jp/webtv/detail.php*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	var video, volume;

	if (document.location.hostname.search(/sangiin/) > 0) {

		video = document.querySelectorAll('video')[1];

		//これをしないと一度クリックしないといけなくなる
		video.parentElement.focus();
	} else if (document.location.hostname.search(/shugiintv/) > 0) {

		video = document.querySelectorAll('video')[0];
	} else {
		console.log('error: no hostname');
		return;
	}

	if (!video) return;

	var moveTime = 5; //←,→
	var moveTime2 = 10; //J,L
	var moveTime3 = 30; //ctrlKey+←,→
	var moveTime4 = 60; //ctrlKey+shiftKey+←,→
	var moveVolume = 0.05; //↑,↓

	var playbackSpeed1 = 1; //Q
	var playbackSpeed2 = 1.25; //W
	var playbackSpeed3 = 1.5; //E
	var playbackSpeed4 = 2; //R

	// eslint-disable-next-line complexity
	var event_keydown = (e) => {

		//ctrlKey+shiftKeyを押している場合
		if (e.ctrlKey && e.shiftKey && !e.altKey) {
			switch (e.code) {
				case 'ArrowLeft':
					e.preventDefault();
					video.currentTime -= moveTime4;
					return;

				case 'ArrowRight':
					e.preventDefault();
					video.currentTime += moveTime4;
					return;

				default:
					//ctrlKey+shiftKeyを押している場合は以降何もしない
					return;
			}
		}

		//ctrlKeyだけを押している場合
		if (e.ctrlKey && !e.shiftKey && !e.altKey) {
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

		var change_playbackSpeed = function (playbackSpeed) {

			e.preventDefault();

			video.playbackRate = playbackSpeed;
			console.log("change speed to " + video.playbackRate);
		};

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
				//liveの場合、durationを使用できない
				var uploaded = document.querySelector(".theo-live-control.vjs-hidden");
				if (uploaded) {

					var m = e.code.match(/^Digit(\d)$/);
					if (m) {
						//ショートカットキーがDigit0からDigit9のとき
						var digit = m[1];

						e.preventDefault();
						console.log(e.code + ": video.currentTime = " + video.currentTime);
						video.currentTime = video.duration / 10 * digit;
					}

					//再生速度変更
					switch (e.code) {
						case 'KeyQ':
							change_playbackSpeed(playbackSpeed1);
							return;

						case 'KeyW':
							e.preventDefault();
							change_playbackSpeed(playbackSpeed2);
							return;

						case 'KeyE':
							e.preventDefault();
							change_playbackSpeed(playbackSpeed3);
							return;

						case 'KeyR':
							e.preventDefault();
							change_playbackSpeed(playbackSpeed4);
							// eslint-disable-next-line no-useless-return
							return;

						default:
							// eslint-disable-next-line no-useless-return
							return;
					}
				}
				// eslint-disable-next-line no-useless-return
				return;
		}
	};

	document.addEventListener('keydown', event_keydown);
})();
