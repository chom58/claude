/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScriptエラーがあってもビルドを続行（開発時のみ）
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLintエラーがあってもビルドを続行（開発時のみ）
    ignoreDuringBuilds: false,
  },
  experimental: {
    // App Routerを有効化
    appDir: true,
  },
  // 画像最適化の設定
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig