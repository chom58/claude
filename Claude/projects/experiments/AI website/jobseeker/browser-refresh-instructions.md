# ブラウザ更新手順 / Browser Refresh Instructions

## 変更を反映させる方法 / How to See Changes

### 1. ハードリロード (強制更新) / Hard Reload
**Windows:**
- `Ctrl + Shift + R`
- または `Ctrl + F5`

**Mac:**
- `Cmd + Shift + R`
- または `Cmd + Option + R`

### 2. 開発者ツールでキャッシュ無効化 / Disable Cache in DevTools
1. `F12` または右クリック→「検証」を選択
2. 開発者ツールを開いた状態で
3. 更新ボタンを**長押し**
4. 「キャッシュの消去とハード再読み込み」を選択

### 3. ブラウザキャッシュを完全にクリア / Clear All Browser Cache
**Chrome:**
1. `Ctrl/Cmd + Shift + Delete`
2. 「キャッシュされた画像とファイル」にチェック
3. 「データを削除」をクリック

### 4. プライベート/シークレットウィンドウで確認 / Use Incognito Mode
- Chrome: `Ctrl/Cmd + Shift + N`
- Firefox: `Ctrl/Cmd + Shift + P`
- Safari: `Cmd + Shift + N`

## 現在の変更内容 / Current Changes Applied

✅ **ヘッダーの背景色を変更**
- Dark theme: `rgba(15, 23, 42, 0.95)`
- Backdrop blur effect added

✅ **ロゴとテキストの視認性向上**
- Logo text: White (#ffffff)
- Badge: Green accent (#10B981)

✅ **ナビゲーションリンク**
- White with transparency
- Green hover effect

✅ **CTAボタン**
- Green gradient background
- Shadow and hover animation

✅ **言語切り替えボタン**
- Proper contrast in dark header
- Active state with green background

## ファイルの場所 / File Locations
- **編集中のHTML:** `/Users/205-000132-skoike/Claude/projects/experiments/AI website/jobseeker/index.html`
- **インラインCSS:** `<style>` タグ内に直接記述（行35-211）
- **外部CSS:** `header-improvements.css` も作成済み

## サーバーURL / Server URL
http://localhost:8081

## 確認ポイント / Check Points
1. ヘッダーが暗い背景になっているか
2. ロゴとナビゲーションが白色で表示されているか
3. 言語切り替えボタンが見えるか
4. ヒーローセクションに上部マージンがあるか