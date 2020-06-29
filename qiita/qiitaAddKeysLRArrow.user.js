// ==UserScript==
// @name         Qiita Add LRArrow ShortcutKeys
// @namespace    https://github.com/querykuma/snippets/
// @version      0.8
// @description  QiitaのXHRで前後のページを取得するページにおいて左右矢印キーで前後のページに移動
// @author       Query Kuma
// @license      MIT
// @copyright    Copyright (c) 2019, by Query Kuma
// @match        https://qiita.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (location.pathname === "/") {

        // トップページ
        return;
    } else {

        const is_url_target = (category, rest) => {

            if (["tags", "organizations"].indexOf(category) >= 0) {
                return true;
            }

            if (rest.search(/(lgtms|following_users|comments|edit_requests)/) === 0) {
                return true;
            }

            return false;
        }

        // 頭の"/"を除いたpathname
        var pathname2 = location.pathname.slice(1);
        var m = pathname2.match(/([^/]+)\/(.*)?/);
        if (m) {

            var category = m[1];
            var rest = m[2];
            if (!is_url_target(category, rest)) {
                return;
            }
        }
        // 2つ目の"/"がなければユーザーページのはず
    }

    const delayed = () => {

        if (document.getElementsByClassName("st-Pager_next").length) {

            if (document.getElementsByClassName("st-Pager_next")[0].querySelector("a[href]")) {
                return;
            }

        } else if (document.getElementsByClassName("st-Pager_prev").length) {

            if (document.getElementsByClassName("st-Pager_prev")[0].querySelector("a[href]")) {
                return;
            }
        } else {
            return;
        }


        const keydown_pager = e => {

            const scroll_to_node = () => {

                // tags 最近の記事
                let scroll_node = document.querySelector(".p-tagShow_mainBottom");

                if (!scroll_node) {

                    // organization 最新の記事
                    scroll_node = document.querySelectorAll(".od-Content");
                    if (scroll_node.length) {

                        scroll_node = scroll_node[scroll_node.length - 1];
                    } else {

                        scroll_node = null;
                    }
                }

                if (!scroll_node) {

                    // ユーザーページ
                    var user_class_name = [...document.getElementsByTagName('div')].map(a => a.classList[0]).filter(a => a && a.search('UserMain__Content') === 0)[0];

                    scroll_node = document.getElementsByClassName(user_class_name);
                    scroll_node = scroll_node[scroll_node.length - 1];
                }

                if (scroll_node) {

                    scrollTo(0, scroll_node.offsetTop);
                }
            }

            if (e.key === 'ArrowRight') {

                document.getElementsByClassName("st-Pager_next")[0].firstElementChild.click();
                scroll_to_node();

            } else if (e.key === 'ArrowLeft') {

                var pager_prev = document.getElementsByClassName("st-Pager_prev");
                if (pager_prev.length) {
                    pager_prev[0].firstElementChild.click();
                }

                scroll_to_node();
            };

        };

        document.addEventListener('keydown', keydown_pager);
    };

    setTimeout(delayed, 800);

})();
