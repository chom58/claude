# Claude Code Action プロジェクト

このリポジトリはClaude Code Actionを使用して、AIアシスタントによる自動化を実現します。

## 🚀 クイックスタート

### 方法1: Claude CLIから設定（推奨）
```bash
claude /install-github-app
```
ガイドに従って設定を完了してください。

### 方法2: 手動設定

#### 1. Claude GitHubアプリのインストール
[Claude GitHub App](https://github.com/apps/claude-ai)をリポジトリにインストール

#### 2. 認証設定
以下のいずれかの方法で認証を設定：
- **Anthropic APIキー**: リポジトリの Settings → Secrets → Actions で `ANTHROPIC_API_KEY` を設定
- **Claude Code OAuthトークン**: Claude CLIで認証済みの場合は自動的に使用

#### 3. 使用方法
IssueやPull Requestで `@claude` とメンションすることで、AIアシスタントが対応します。

## 💬 使用例

### 例1: React コンポーネントの作成
```
@claude 
ユーザープロフィール表示用のReactコンポーネントを作成してください。
propsとしてname、email、avatarUrlを受け取り、
Tailwind CSSでスタイリングしてください。
```

### 例2: APIエンドポイントの実装
```
@claude 
/api/users/:idでユーザー情報を取得するNext.js APIルートを作成してください。
エラーハンドリング、TypeScriptの型定義、
入力値のバリデーションも含めてください。
```

### 例3: テストファイルの自動生成
```
@claude 
./src/components/UserProfile.tsxファイルに対応する
Jest + React Testing Libraryを使用した
包括的なテストファイルを作成してください。
```

## 📋 プロジェクト構成

```
.
├── .github/
│   └── workflows/
│       └── claude.yml    # Claude Code Action設定
├── .gitignore           # Git除外設定
├── CLAUDE.md            # プロジェクト規約・AI向け指示
└── README.md            # このファイル
```

## 🔧 カスタマイズ

`CLAUDE.md`ファイルを編集することで、プロジェクト固有のルールやコーディング規約を設定できます。

## ✅ セットアップ完了！

セットアップが正常に完了している場合、以下の動作が確認できます：

### 🎯 動作確認チェックリスト
- [ ] IssueやPRで `@claude` メンションが認識される
- [ ] Claude GitHub Appがリポジトリにインストール済み
- [ ] 認証情報（APIキーまたはOAuthトークン）が設定済み
- [ ] `CLAUDE.md`ファイルが適切に配置されている
- [ ] GitHub Actionsワークフローが正常に実行される

### 🚀 次のステップ
1. **初回テスト**: Issue に `@claude こんにちは` と投稿してみましょう
2. **プロジェクト設定**: `CLAUDE.md` でプロジェクト固有のルールを設定
3. **チーム共有**: チームメンバーに使用方法を共有
4. **運用開始**: 実際の開発タスクでClaude AIアシスタントを活用

### 🔍 トラブルシューティング
何か問題が発生した場合は、以下をご確認ください：
- GitHub App の権限設定
- Secret キーの設定
- ワークフローファイルの構文

## ⚠️ 注意事項

- 現在ベータ版のため、機能が変更される可能性があります
- 生成されたコードは必ず人間がレビューしてからマージしてください
- セキュリティに関わる変更は特に慎重に確認してください
- APIキーは絶対に公開しないでください

## 📚 参考リンク

- [Claude Code Action](https://github.com/anthropics/claude-code-action)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)