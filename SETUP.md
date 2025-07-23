# セットアップガイド - 原宿デザイン会社交流会サイト

## 前提条件

- Node.js 18.17.0以上
- npm または yarn
- PostgreSQL データベース

## 環境セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`をコピーして`.env.local`を作成し、以下の変数を設定してください：

```bash
cp .env.local.example .env.local
```

### 3. 必要な環境変数

#### データベース設定
```
DATABASE_URL="postgresql://username:password@localhost:5432/harajuku_design_networking"
```

#### NextAuth.js設定
```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
```

**NEXTAUTH_SECRET**の生成方法：
```bash
openssl rand -base64 32
```

#### Google OAuth設定（オプション）
```
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Google OAuth設定手順：
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存プロジェクトを選択
3. APIs & Services > Credentials に移動
4. OAuth 2.0 Client IDsを作成
5. 承認済みリダイレクトURIに`http://localhost:3000/api/auth/callback/google`を追加

### 4. データベースのセットアップ

#### PostgreSQLのインストール・起動
```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# PostgreSQL公式サイトからインストーラーをダウンロード
```

#### データベースの作成
```bash
psql -U postgres
CREATE DATABASE harajuku_design_networking;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE harajuku_design_networking TO your_username;
```

### 5. Prismaの初期化

```bash
# Prismaクライアントの生成
npx prisma generate

# マイグレーションの実行
npx prisma migrate dev --name init

# データベースの初期化（開発環境のみ）
npx prisma db push
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

サイトは http://localhost:3000 でアクセスできます。

## データベース管理

### Prisma Studio（GUI）の起動
```bash
npx prisma studio
```

### マイグレーション作成
```bash
npx prisma migrate dev --name migration_name
```

### データベースリセット（開発環境のみ）
```bash
npx prisma migrate reset
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. データベース接続エラー
- `DATABASE_URL`が正しく設定されているか確認
- PostgreSQLサービスが起動しているか確認
- データベースとユーザーが作成されているか確認

#### 2. NextAuth認証エラー
- `NEXTAUTH_SECRET`が設定されているか確認
- `NEXTAUTH_URL`が正しいか確認（本番環境では実際のドメインを使用）

#### 3. Google OAuth エラー
- Google Cloud ConsoleでClient IDとSecretが正しく設定されているか確認
- リダイレクトURIが正しく設定されているか確認

#### 4. Prismaエラー
```bash
# Prismaクライアントの再生成
npx prisma generate

# データベーススキーマの同期
npx prisma db push
```

## 本番環境デプロイ

### 環境変数の設定
本番環境では以下の環境変数を必ず設定してください：

```
DATABASE_URL="実際のデータベースURL"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="本番用のシークレット"
GOOGLE_CLIENT_ID="本番用のGoogle Client ID"
GOOGLE_CLIENT_SECRET="本番用のGoogle Client Secret"
```

### ビルドとデプロイ
```bash
npm run build
npm start
```

## 追加機能

### メール送信機能（将来実装予定）
```
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_FROM="noreply@example.com"
```

## セキュリティ注意事項

1. 本番環境では必ず強力な`NEXTAUTH_SECRET`を使用
2. データベースのパスワードは複雑なものを使用
3. 環境変数ファイル（`.env.local`）をGitにコミットしない
4. 定期的な依存関係の更新とセキュリティチェック

## サポート

問題が解決しない場合は、以下を確認してください：
- Node.jsのバージョンが18.17.0以上か
- 全ての環境変数が正しく設定されているか
- データベースが正常に動作しているか

詳細については、プロジェクトのIssueページまたは開発チームにお問い合わせください。