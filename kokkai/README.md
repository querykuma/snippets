# 国会動画にショートカットキーを追加するユーザースクリプト

## ファイル

Add_ShortcutKeys_Kokkai.user.js

## 対象サイト

- [衆議院インターネット審議中継](http://www.shugiintv.go.jp/)
- [参議院インターネット審議中継](https://www.webtv.sangiin.go.jp/webtv/index.php)

## キー

|キーボード ショートカット  |機能  |
|---|---|
|Space キー  |再生 / 一時停止。  |
|左矢印キー / 右矢印キー  |5 秒巻き戻し / 早送り。  |
|j / l キー |10 秒巻き戻し / 早送り。  |
|Control+左矢印キー / Control+右矢印キー  |30 秒巻き戻し / 早送り。  |
|Control+Shift+左矢印キー / Control+Shift+右矢印キー  |60 秒巻き戻し / 早送り。  |
|数字の 1～9|動画の 10～90% の位置に移動。|
|数字の 0|動画の先頭(0%の位置)に移動。|
|上矢印キー / 下矢印キー  |音量を 5% 上げる / 下げる。  |
|f  |全画面モードで表示。全画面モードが有効になっているときに F キーまたは Esc キーを押すと全画面モードが終了します。  |
|q / w / e / r キー|再生速度を1倍、1.25倍、1.5倍、2倍にする。 |
|b キー|直前の再生位置に戻る(qwerキーと1234キーを間違えて押したときのため)。動画を閉じて開き直した場合、直前に開いていた再生位置に戻る。|

## 動作検証環境

- Chrome 80.0.3987.149
- Tampermonkey 4.9
- Firefox 74.0
