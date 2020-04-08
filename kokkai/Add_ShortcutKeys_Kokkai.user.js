// ==UserScript==
// @name         Kokkai Add ShortcutKeys
// @namespace    https://github.com/querykuma/snippets/
// @version      1.03
// @description  国会動画(衆議院インターネット審議中継, 参議院インターネット審議中継)にショートカットキー追加
// @author       Query Kuma
// @license      MIT
// @copyright    Copyright (c) 2020, by Query Kuma
// @match        http*://www.shugiintv.go.jp/jp/index.php*
// @match        https://www.webtv.sangiin.go.jp/webtv/detail.php*
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==
/* global GM */

(async function () {
	'use strict';

	const moveTime = 5; //←,→
	const moveTime2 = 10; //J,L
	const moveTime3 = 30; //ctrlKey+←,→
	const moveTime4 = 60; //ctrlKey+shiftKey+←,→
	const moveVolume = 0.05; //↑,↓

	const playbackSpeed1 = 1; //Q
	const playbackSpeed2 = 1.25; //W
	const playbackSpeed3 = 1.5; //E
	const playbackSpeed4 = 2; //R

	var video, volume;
	var show_text_remove_setTimeout_id = 0;

	//Bで戻るための1つ前のvideo.currentTime
	var back_previous_currentTime_val = await GM.getValue("back_previous_currentTime_val") || 0;

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

		const show_text_remove = function () {
			var display_kokkai = document.getElementById('display_kokkai');
			display_kokkai && display_kokkai.remove();
		};

		const show_text = function (text) {
			show_text_remove();

			video.parentElement.insertAdjacentHTML('beforeend', `<span id="display_kokkai">${text}</span>`);

			var display_kokkai = document.getElementById('display_kokkai');
			display_kokkai.style.zIndex = 1000;
			display_kokkai.style.position = 'absolute';
			display_kokkai.style.color = "#fff";
			display_kokkai.style.textShadow = "1px 1px 0 #000, -1px -1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, 0px 1px 0 #000,  0-1px 0 #000, -1px 0 0 #000, 1px 0 0 #000";
			display_kokkai.style.fontSize = 'calc(10vh)';

			var video_bcr = video.getBoundingClientRect();
			var display_kokkai_bcr = display_kokkai.getBoundingClientRect();

			display_kokkai.style.left = (video_bcr.width - display_kokkai_bcr.width) / 2 + 'px';
			display_kokkai.style.top = (video_bcr.height - display_kokkai_bcr.height) / 2 + 'px';

			clearTimeout(show_text_remove_setTimeout_id);
			show_text_remove_setTimeout_id = setTimeout(show_text_remove, 500);
		};

		const change_playbackSpeed = function (playbackSpeed) {

			e.preventDefault();

			video.playbackRate = playbackSpeed;
			console.log("change speed to " + video.playbackRate);

			show_text('x' + video.playbackRate);
		};

		const add_back_currentTime = function () {

			back_previous_currentTime_val = video.currentTime;
			GM.setValue("back_previous_currentTime_val", back_previous_currentTime_val);
		};

		const back_previous_currentTime = function () {

			var temp = video.currentTime;
			video.currentTime = back_previous_currentTime_val;
			back_previous_currentTime_val = temp;
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

						console.log(e.code + ": video.currentTime = " + video.currentTime);
						add_back_currentTime();

						e.preventDefault();
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

						case 'KeyB':
							e.preventDefault();
							back_previous_currentTime();

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

	const event_beforeunload = () => {

		// closeしたときvideo.currentTimeを保存→openした後KeyBで戻る
		GM.setValue("back_previous_currentTime_val", video.currentTime);
	};

	document.addEventListener('keydown', event_keydown);
	window.addEventListener('beforeunload', event_beforeunload);
})();
