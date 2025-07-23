# 原宿デザイン会社交流会サイト

**Harajuku Design Company Networking Site**

原宿エリアのデザイン会社が集まる交流プラットフォーム。創造性と革新性を追求するデザイナーたちのネットワーキングサイトです。

## 🌟 プロジェクト概要

このプロジェクトは、原宿・表参道エリアで活動するデザイン会社やクリエイターが集まり、交流・協力・成長できるプラットフォームを提供することを目的としています。

### 主な機能

- **企業紹介**: 参加企業のプロフィール、サービス、実績の表示
- **イベント管理**: ネットワーキングイベント、ワークショップ、セミナーの開催・参加
- **参加登録**: 新規企業の参加申請とメンバー管理
- **検索・フィルタリング**: カテゴリー、地域、サービス別の企業・イベント検索

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 14**: React フレームワーク（App Router使用）
- **TypeScript**: 静的型付けによる開発効率向上
- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **React Icons**: アイコンライブラリ

### 開発ツール
- **ESLint**: コード品質管理
- **Prettier**: コードフォーマット（設定済み）
- **Git**: バージョン管理

### デザインシステム
- **カラーパレット**: ピンク-パープル-ブルーのグラデーション
- **フォント**: Inter, Poppins, Noto Sans JP
- **レスポンシブデザイン**: モバイルファースト

## 📁 プロジェクト構造

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ホームページ
│   │   ├── companies/         # 企業一覧・詳細
│   │   ├── events/            # イベント一覧・詳細
│   │   └── register/          # 参加登録
│   ├── components/            # 再利用可能コンポーネント
│   │   └── layout/           # レイアウト関連
│   │       ├── Header.tsx    # ヘッダーナビゲーション
│   │       └── Footer.tsx    # フッター
│   ├── lib/                  # ユーティリティ・設定
│   │   ├── utils.ts         # 汎用ユーティリティ関数
│   │   ├── constants.ts     # 定数・設定値
│   │   └── mock-data.ts     # モックデータ
│   └── types/               # TypeScript型定義
│       └── index.ts         # 共通型定義
├── public/                  # 静的ファイル
├── backup/                  # 元ファイルのバックアップ
├── next.config.js          # Next.js設定
├── tailwind.config.js      # Tailwind CSS設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係・スクリプト
```

## 🚀 開発環境のセットアップ

### 必要な環境

- Node.js 18.17.0以上
- npm または yarn

### インストール手順

1. **リポジトリのクローン**
   ```bash
   git clone [repository-url]
   cd harajuku-design-networking
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

### 利用可能なスクリプト

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start

# ESLintによるコードチェック
npm run lint

# TypeScript型チェック
npm run type-check
```

## 🎨 デザインシステム

### カラーパレット

```css
/* 原宿テーマカラー */
--harajuku-pink-500: #de4fba
--harajuku-purple-500: #7c3aed
--harajuku-blue-500: #3b82f6

/* グラデーション */
background: linear-gradient(135deg, #fcedf9 0%, #e9e2ff 50%, #dbeafe 100%)
```

### 主要コンポーネント

- **ボタン**: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **カード**: `.card`, `.card-hover`
- **フォーム**: `.form-input`, `.form-label`
- **タグ**: `.tag`, `.tag-pink`, `.tag-purple`, `.tag-blue`

### レスポンシブブレイクポイント

- **sm**: 640px以上
- **md**: 768px以上
- **lg**: 1024px以上
- **xl**: 1280px以上

## 📊 現在の実装状況

### Phase 1: 基本UI構築 ✅ 完了

- [x] プロジェクト初期化
- [x] デザインシステム構築
- [x] ページ構造・ルーティング
- [x] レスポンシブレイアウト
- [x] モックデータ実装
- [x] 検索・フィルタリング機能

### 実装済みページ

1. **ホームページ** (`/`)
   - ヒーローセクション
   - 最新イベント表示
   - 参加企業紹介
   - 統計情報

2. **企業一覧** (`/companies`)
   - 企業カード表示
   - カテゴリー別フィルタリング
   - 検索機能
   - ページネーション対応準備

3. **イベント一覧** (`/events`)
   - イベントカード表示
   - タイプ・期間別フィルタリング
   - オンライン/オフライン切り替え
   - 申込状況表示

4. **参加登録** (`/register`)
   - 多段階フォーム
   - バリデーション機能
   - 送信完了画面

### Phase 2: データベース・認証（準備完了）

準備済みの機能拡張ポイント：

- **データベース統合**: 型定義・API設計完了
- **ユーザー認証**: 会員制機能の型定義済み
- **管理画面**: イベント・企業管理機能
- **決済システム**: 有料イベント対応
- **通知システム**: メール・プッシュ通知

## 🔧 カスタマイズガイド

### 新しいページの追加

1. `src/app/` 内に新しいディレクトリを作成
2. `page.tsx` ファイルを追加
3. 必要に応じてレイアウトファイルを作成
4. `src/lib/constants.ts` にナビゲーション項目を追加

### コンポーネントの作成

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick 
}: ButtonProps) {
  return (
    <button 
      className={`btn-${variant} ${size === 'lg' ? 'text-lg px-8 py-4' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### スタイルの拡張

```css
/* src/app/globals.css */
@layer components {
  .custom-component {
    @apply bg-harajuku-gradient p-6 rounded-xl shadow-harajuku;
  }
}
```

## 🧪 テスト

現在はPhase 1のため、テストフレームワークは未導入です。
Phase 2では以下を導入予定：

- **Jest**: ユニットテスト
- **React Testing Library**: コンポーネントテスト  
- **Playwright**: E2Eテスト

## 📈 パフォーマンス最適化

実装済みの最適化：

- **画像最適化**: Next.js Image コンポーネント準備
- **フォント最適化**: Google Fonts の効率的読み込み
- **コード分割**: Next.js の自動分割機能
- **SEO対応**: メタタグ・構造化データ

## 🌍 多言語対応

現在は日本語のみですが、Phase 2で以下を予定：

- **i18n設定**: Next.js国際化機能
- **英語対応**: 原宿エリアの国際性を考慮
- **動的言語切り替え**: ユーザー設定による切り替え

## 📝 コーディング規約

### 命名規則

- **変数・関数**: camelCase (`userName`, `handleSubmit`)
- **コンポーネント・クラス**: PascalCase (`UserProfile`, `EventCard`)
- **定数**: UPPER_SNAKE_CASE (`SITE_CONFIG`, `API_ENDPOINTS`)
- **ファイル名**: kebab-case for pages, PascalCase for components

### コメント

```typescript
// 日本語コメントを推奨（グローバル向けは英語）
const handleUserRegistration = () => {
  // ユーザー登録処理を実行
  // Handles user registration process
};
```

### インポート順序

```typescript
// 1. React関連
import React from 'react';
import { useState } from 'react';

// 2. 外部ライブラリ
import Link from 'next/link';
import { HiUser } from 'react-icons/hi';

// 3. 内部モジュール
import { cn } from '@/lib/utils';
import { User } from '@/types';

// 4. 相対インポート
import './styles.css';
```

## 🚨 注意事項

### セキュリティ

- 環境変数（`.env.local`）は Git にコミットしない
- APIキーなどの機密情報は適切に管理
- XSS対策として`dangerouslySetInnerHTML`の使用を制限

### パフォーマンス

- 画像は適切な形式・サイズで配置（Phase 2で実装予定）
- 不要なライブラリの追加を避ける
- コンポーネントの適切なメモ化（必要に応じて）

## 🤝 コントリビューション

### 開発フロー

1. **Issue作成**: 機能追加・バグ修正の提案
2. **ブランチ作成**: `feature/機能名` または `fix/バグ名`
3. **開発・テスト**: 機能実装とテスト
4. **Pull Request**: レビュー依頼
5. **マージ**: 承認後にmainブランチへマージ

### Pull Request チェックリスト

- [ ] ESLint エラーなし
- [ ] TypeScript エラーなし
- [ ] レスポンシブデザイン対応
- [ ] アクセシビリティ考慮
- [ ] 適切なコメント・ドキュメント

## 📞 サポート・お問い合わせ

- **プロジェクト管理**: GitHub Issues
- **技術相談**: [Discord/Slack チャンネル]
- **緊急対応**: [メールアドレス]

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
詳細は [LICENSE](LICENSE) ファイルを参照してください。

---

**原宿デザイン会社交流会実行委員会**  
Made with ❤️ in Harajuku, Tokyo