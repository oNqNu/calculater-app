※ このアプリケーションは Roo Code を使って開発しました.あなたが今読んでいるREADME含め、人間の手作業によるコーディング等を一切行っていません.すごいですね.

# 電卓アプリケーション

シンプルでモダンな電卓アプリケーションです。React + Viteを使用して開発された、基本的な四則演算が可能な電卓です。画面中央に配置された洗練されたデザインで、使いやすさと視認性を重視しています。ダークモードとライトモードの切り替えにも対応しています。背景には宗教的なモチーフを取り入れた美しいアニメーションが施されており、計算機能と芸術性を融合させています。

## デプロイ

このアプリケーションはGitHub Pagesで公開されています。以下のURLでアクセスできます:

[https://onqnu.github.io/calculater-app/](https://onqnu.github.io/calculater-app/)

mainブランチにプッシュされた変更は、自動的にGitHub Pagesにデプロイされます。

## 技術スタック

- React 18.2.0
- Vite 4.5.1
- Node.js (v16.13.1以上推奨)
- npm (v8.1.2以上推奨)

## 環境構築

1. リポジトリのクローン
```bash
git clone https://github.com/oNqNu/calculater-app.git
cd calculater-app
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```

4. ブラウザでアプリケーションにアクセス
```
http://localhost:5173 (または表示されたURLにアクセス)
```

## アプリケーションの使用方法

### テーマ切り替え

電卓の上部に配置されたテーマ切り替えボタンをクリックすることで、ダークモードとライトモードを切り替えることができます:
- 🌙 (月アイコン): ライトモードからダークモードへ切り替え
- ☀️ (太陽アイコン): ダークモードからライトモードへ切り替え

### 基本的な操作

1. 数値入力
   - 数字ボタン(0-9)をクリックして数値を入力
   - 小数点(.)ボタンは0と=の間に配置されています
   - ±ボタンは最上部に配置され、Cボタンと÷ボタンの間にあります。クリックすると数値の正負が切り替わります

2. 演算操作
   - すべての演算子ボタンは右端に配置されています
   - 除算(÷)、乗算(×)、減算(-)、加算(+)の順で上から配置

3. その他の機能
   - C: 入力をクリア(2マス分の幅で表示)
   - =: 計算を実行
   - 状態の永続化: ブラウザを閉じても入力値や計算式が保持されます

### 使用例

1. 基本的な計算
   - 例: 2 + 3 = 5
     1. "2"をクリック
     2. "+"をクリック
     3. "3"をクリック
     4. "="をクリック
     5. 結果"5"が表示されます

2. 連続した計算
   - 計算結果に対して続けて演算を行うことが可能です
   - 例: 2 + 3 = 5 → 5 + 4 = 9
   - イコール(=)を押さなくても、演算子を押すたびに計算が実行されます
   - 例: 1 + 2 + 3 = 6 (1 + 2 = 3、その後 3 + 3 = 6)

## 開発者向け情報

### プロジェクト構造

```
calculater-app/
├── src/
│   ├── App.tsx        # メインのアプリケーションコンポーネント
│   ├── App.css        # メインのスタイリング
│   ├── styles/
│   │   └── tokens.css # カラートークンの定義
│   ├── utils/
│   │   ├── calculator.ts  # 計算ロジックの実装
│   │   └── easterEggs.ts  # イースターエッグ機能の実装
│   ├── hooks/
│   │   ├── useLocalStorage.ts  # ローカルストレージ管理
│   │   └── useSystemTheme.ts   # テーマ管理
│   └── main.tsx       # エントリーポイント
├── public/            # 静的ファイル
├── package.json       # プロジェクト設定と依存関係
└── README.md          # このファイル
```

### スタイリング

アプリケーションのスタイリングは、CSS変数(カラートークン)を使用して管理されています。
すべてのカラー値は `src/styles/tokens.css` で一元管理され、以下のカテゴリに分類されています:

- ベースカラー(背景、サーフェス)
- アクセントカラー(プライマリカラーとそのバリエーション)
- テキストカラー(プライマリ、セカンダリ)
- ボタンカラー
- エフェクト(シャドウなど)

各カラートークンは、ライトモードとダークモードの両方に対応する値を持っており、テーマ切り替えによって自動的に適切な色が適用されます。また、スムーズな遷移のためのトランジション効果も実装されています。

### 背景アニメーション

アプリケーションの背景には、宗教的なモチーフを取り入れた複雑な幾何学模様のアニメーションが実装されています:

- マンダラをイメージした同心円パターン
- 放射状に広がる光の表現
- 複数のレイヤーによる奥行きのある表現
- 回転と脈動を組み合わせたアニメーション効果

これらの視覚効果は、CSSアニメーションとグラデーションを組み合わせて実現されており、計算機の操作性を損なうことなく、美しい視覚体験を提供します。

### ビルド方法

プロダクション用のビルドを作成する場合:

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。ビルド時には以下の最適化が適用されます:

- JavaScriptコードの難読化(オブファスケーション)
  - 変数名・関数名の短縮化
  - デッドコードの除去
  - コンソールログの削除
  - デバッガーステートメントの削除
- ソースマップの無効化によるセキュリティ強化
- gzip圧縮による配信サイズの最適化(約67%の圧縮率)

### GitHub Pagesへのデプロイ

このプロジェクトは、mainブランチへのプッシュ時に自動的にGitHub Pagesにデプロイされます。デプロイは以下の手順で行われます:

1. mainブランチへの変更をプッシュ
2. GitHub Actionsが自動的にビルドとテストを実行
3. テストが成功した場合、ビルドされたファイルがGitHub Pagesにデプロイ
4. デプロイ完了後、[https://onqnu.github.io/calculater-app/](https://onqnu.github.io/calculater-app/) でアプリケーションにアクセス可能
