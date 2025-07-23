import type { Metadata } from 'next';
import { Inter, Poppins, Noto_Sans_JP } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants';
import './globals.css';

// フォントの設定
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

// メタデータの設定
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: '原宿デザイン会社交流会実行委員会' }],
  creator: '原宿デザイン会社交流会実行委員会',
  publisher: '原宿デザイン会社交流会実行委員会',
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: '@harajuku_design',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console用（実際の運用時に設定）
    google: 'your-google-verification-code',
  },
  category: 'design',
};

// ViewportメタデータをサポートするNext.js 14の新しい形式
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcedf9' },
    { media: '(prefers-color-scheme: dark)', color: '#722454' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${poppins.variable} ${notoSansJP.variable}`}
    >
      <head>
        {/* プリロード用のリンクタグ */}
        <link
          rel="preload"
          href="/images/hero-bg.jpg"
          as="image"
          type="image/jpeg"
        />
        {/* ファビコン */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data（構造化データ） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              alternateName: SITE_CONFIG.nameEn,
              url: SITE_CONFIG.url,
              description: SITE_CONFIG.description,
              logo: `${SITE_CONFIG.url}/logo.png`,
              sameAs: [
                'https://twitter.com/harajuku_design',
                'https://instagram.com/harajuku_design_network',
                'https://linkedin.com/company/harajuku-design-network',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: '渋谷区',
                addressRegion: '東京都',
                addressCountry: 'JP',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'info@harajuku-design-network.com',
                availableLanguage: ['ja', 'en'],
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {/* Skip to main content（アクセシビリティ向上） */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-harajuku-pink-600 text-white px-4 py-2 z-50 rounded-br-lg"
        >
          メインコンテンツにスキップ
        </a>
        
        {/* グローバルローディング用のスピナー（将来の拡張用） */}
        <div id="global-loading" className="hidden">
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="loading-spinner w-12 h-12"></div>
          </div>
        </div>
        
        {/* メインコンテンツ */}
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        
        {/* JavaScript無効時のメッセージ */}
        <noscript>
          <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black p-4 text-center z-50">
            このサイトの一部機能を利用するにはJavaScriptを有効にしてください。
          </div>
        </noscript>
        
        {/* 将来のAnalytics用のスクリプトタグ（コメントアウト） */}
        {/* Google Analytics 4 */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script> */}
      </body>
    </html>
  );
}