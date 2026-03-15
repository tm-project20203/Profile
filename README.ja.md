# Interactive Portfolio Town

[English README](README.md)

HTML、CSS、JavaScript で作成したゲーム風ポートフォリオサイトです。

閲覧者は小さな街を移動し、建物に近づいてキー操作で About、Experience、Projects、Skills、Contact などのセクションを開けます。

## 主な特徴

- Canvas を使ったインタラクティブな街マップ
- キーボードによる移動とインタラクション
- 英語 / 日本語の2言語対応
- 各セクションをモーダルで表示
- 保守しやすい複数ファイル構成

## 操作方法

- 移動: W A S D または矢印キー
- 調べる: E
- モーダルを閉じる: Escape
- 言語切り替え: 右上の言語ボタン

## プロジェクト構成

- index.html: ページ構造と UI コンテナ
- styles.css: すべてのスタイルとレスポンシブ設定
- script.js: ゲームロジック、翻訳データ、描画、操作処理

## ローカル実行

1. このリポジトリを clone またはダウンロードします。
2. プロジェクトフォルダを開きます。
3. ブラウザで index.html を開きます。

ブラウザ設定によっては、簡易ローカルサーバーを使ってください。

Python の例:

```bash
python -m http.server 8000
```

その後、http://localhost:8000 を開きます。

## GitHub Pages への公開

1. このフォルダを GitHub リポジトリに push します。
2. Settings > Pages を開きます。
3. main ブランチの root を公開元に設定します。
4. 保存して、公開 URL が生成されるまで待ちます。

## カスタマイズのヒント

- script.js の translations オブジェクト内テキストを更新する
- Contact セクションのプレースホルダーリンクを実リンクに置き換える
- styles.css で配色やデザインを調整する
- 必要に応じて Canvas の図形を独自ピクセルアートへ置き換える

## ライセンス

個人ポートフォリオ用途で自由に利用・改変できます。
