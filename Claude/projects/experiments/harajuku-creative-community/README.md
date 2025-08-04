# 原宿クリエイティブコミュニティ

原宿を拠点とするデザイナー、アパレルブランド、クリエイターのためのマッチングプラットフォームです。

## 📋 プロジェクト概要

デザイン会社とアパレルブランドをつなぎ、クリエイティブなコラボレーションを促進するコミュニティプラットフォーム。原宿カルチャーを中心に、新しい価値創造をサポートします。

## 🚀 主な機能

### デザイン会社向け
- 会社プロフィール管理
- ポートフォリオ掲載
- スキル・専門分野の登録
- コラボレーション提案

### アパレルブランド向け
- ブランドプロフィール管理
- ルックブック掲載
- デザインニーズの投稿
- デザイナーマッチング

### コミュニティ機能
- クリエイティブイベント情報
- コラボレーション事例紹介
- マッチングリクエスト
- レビュー・評価システム

## 📁 プロジェクト構造

```
harajuku-creative-community/
├── src/
│   ├── app.js              # メインアプリケーション
│   ├── config/             # 設定ファイル
│   ├── controllers/        # コントローラー
│   ├── middleware/         # ミドルウェア
│   ├── models/             # データモデル
│   │   ├── User.js         # ユーザーモデル
│   │   ├── DesignCompany.js    # デザイン会社
│   │   ├── ApparelBrand.js     # アパレルブランド
│   │   ├── CreativeEvent.js    # イベント
│   │   ├── Collaboration.js    # コラボレーション
│   │   └── MatchingRequest.js  # マッチングリクエスト
│   ├── routes/             # ルーティング
│   └── seeders/            # サンプルデータ
├── .env.example            # 環境変数テンプレート
├── package.json
└── README.md
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

### 3. データベースの初期化

```bash
npm run seed
```

### 4. アプリケーションの起動

```bash
# 開発環境
npm run dev

# 本番環境
npm start
```

## 🎨 登録企業例

### デザイン会社
- HARAJUKU DESIGN STUDIO - ブランディング専門
- NEON CREATIVE COLLECTIVE - デジタル体験デザイン
- KAWAII GRAPHICS LAB - かわいいデザイン研究所

### アパレルブランド
- HARAJUKU REBELS - ストリート×ハイファッション
- CYBER KAWAII - サイバーパンク×かわいい
- TOKYO MINIMAL - ミニマルデザイン

## 🔧 技術スタック

- **フレームワーク**: Express.js
- **ORM**: Sequelize
- **データベース**: SQLite (開発) / PostgreSQL (本番)
- **画像処理**: Sharp, Multer
- **認証**: JWT
- **ロギング**: Winston

## 🌐 特徴

- 原宿カルチャーに特化
- クリエイター同士の直接マッチング
- 実績に基づく評価システム
- 多様なコラボレーション形態に対応

## 🤝 ライセンス

MIT License