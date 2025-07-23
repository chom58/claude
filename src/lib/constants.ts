import { CompanyCategory, EventType } from '@/types';

// サイトメタデータ
export const SITE_CONFIG = {
  name: '原宿デザイン会社交流会',
  nameEn: 'Harajuku Design Company Network',
  description: '原宿エリアのデザイン会社が集まる交流プラットフォーム。創造性と革新性を追求するデザイナーたちのネットワーキングサイトです。',
  url: 'https://harajuku-design-network.com',
  ogImage: '/og-image.png',
  keywords: ['原宿', 'デザイン', '交流会', 'ネットワーキング', 'クリエイティブ', '会社'],
} as const;

// ナビゲーションメニュー
export const NAVIGATION_ITEMS = [
  {
    name: 'ホーム',
    nameEn: 'Home',
    href: '/',
    description: 'トップページ',
  },
  {
    name: '会社一覧',
    nameEn: 'Companies',
    href: '/companies',
    description: '参加企業の一覧',
  },
  {
    name: 'イベント',
    nameEn: 'Events',
    href: '/events',
    description: '開催予定のイベント',
  },
  {
    name: '登録',
    nameEn: 'Register',
    href: '/register',
    description: '新規登録',
  },
] as const;

// 会社カテゴリー
export const COMPANY_CATEGORIES: Record<CompanyCategory, { name: string; nameEn: string; color: string; icon: string }> = {
  'web-design': {
    name: 'Webデザイン',
    nameEn: 'Web Design',
    color: 'bg-blue-100 text-blue-800',
    icon: '🌐',
  },
  'graphic-design': {
    name: 'グラフィックデザイン',
    nameEn: 'Graphic Design',
    color: 'bg-purple-100 text-purple-800',
    icon: '🎨',
  },
  'ui-ux': {
    name: 'UI/UX',
    nameEn: 'UI/UX',
    color: 'bg-pink-100 text-pink-800',
    icon: '📱',
  },
  'branding': {
    name: 'ブランディング',
    nameEn: 'Branding',
    color: 'bg-indigo-100 text-indigo-800',
    icon: '🏷️',
  },
  'advertising': {
    name: '広告・マーケティング',
    nameEn: 'Advertising',
    color: 'bg-green-100 text-green-800',
    icon: '📢',
  },
  'digital-marketing': {
    name: 'デジタルマーケティング',
    nameEn: 'Digital Marketing',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '📊',
  },
  'illustration': {
    name: 'イラストレーション',
    nameEn: 'Illustration',
    color: 'bg-red-100 text-red-800',
    icon: '✏️',
  },
  'animation': {
    name: 'アニメーション',
    nameEn: 'Animation',
    color: 'bg-orange-100 text-orange-800',
    icon: '🎬',
  },
  'photography': {
    name: '写真・映像',
    nameEn: 'Photography',
    color: 'bg-gray-100 text-gray-800',
    icon: '📷',
  },
  'other': {
    name: 'その他',
    nameEn: 'Other',
    color: 'bg-slate-100 text-slate-800',
    icon: '🔧',
  },
} as const;

// イベントタイプ
export const EVENT_TYPES: Record<EventType, { name: string; nameEn: string; color: string; icon: string }> = {
  'networking': {
    name: 'ネットワーキング',
    nameEn: 'Networking',
    color: 'bg-harajuku-pink-100 text-harajuku-pink-800',
    icon: '🤝',
  },
  'workshop': {
    name: 'ワークショップ',
    nameEn: 'Workshop',
    color: 'bg-harajuku-purple-100 text-harajuku-purple-800',
    icon: '🛠️',
  },
  'seminar': {
    name: 'セミナー',
    nameEn: 'Seminar',
    color: 'bg-harajuku-blue-100 text-harajuku-blue-800',
    icon: '📚',
  },
  'panel-discussion': {
    name: 'パネルディスカッション',
    nameEn: 'Panel Discussion',
    color: 'bg-purple-100 text-purple-800',
    icon: '💬',
  },
  'showcase': {
    name: 'ショーケース',
    nameEn: 'Showcase',
    color: 'bg-pink-100 text-pink-800',
    icon: '✨',
  },
  'social': {
    name: 'ソーシャル',
    nameEn: 'Social',
    color: 'bg-green-100 text-green-800',
    icon: '🎉',
  },
  'other': {
    name: 'その他',
    nameEn: 'Other',
    color: 'bg-gray-100 text-gray-800',
    icon: '📝',
  },
} as const;

// 原宿エリアの主要な場所
export const HARAJUKU_LOCATIONS = [
  {
    name: '原宿駅周辺',
    nameEn: 'Harajuku Station Area',
    address: '東京都渋谷区神宮前1丁目',
  },
  {
    name: '表参道',
    nameEn: 'Omotesando',
    address: '東京都渋谷区神宮前4-5丁目',
  },
  {
    name: '竹下通り',
    nameEn: 'Takeshita Street',
    address: '東京都渋谷区神宮前1丁目',
  },
  {
    name: 'キャットストリート',
    nameEn: 'Cat Street',
    address: '東京都渋谷区神宮前3-6丁目',
  },
  {
    name: '明治神宮前',
    nameEn: 'Meiji-Jingumae',
    address: '東京都渋谷区神宮前1丁目',
  },
] as const;

// ソーシャルリンクの設定
export const SOCIAL_LINKS = {
  twitter: {
    name: 'Twitter',
    icon: '🐦',
    baseUrl: 'https://twitter.com/',
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    baseUrl: 'https://instagram.com/',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    baseUrl: 'https://linkedin.com/in/',
  },
  portfolio: {
    name: 'Portfolio',
    icon: '🌐',
    baseUrl: '',
  },
} as const;

// ページネーションの設定
export const PAGINATION_CONFIG = {
  defaultLimit: 12,
  maxLimit: 50,
  companies: {
    defaultLimit: 12,
    maxLimit: 24,
  },
  events: {
    defaultLimit: 8,
    maxLimit: 16,
  },
} as const;

// 画像の設定
export const IMAGE_CONFIG = {
  company: {
    logo: {
      width: 200,
      height: 200,
      quality: 90,
    },
  },
  event: {
    thumbnail: {
      width: 400,
      height: 300,
      quality: 85,
    },
    hero: {
      width: 1200,
      height: 600,
      quality: 90,
    },
  },
  user: {
    avatar: {
      width: 150,
      height: 150,
      quality: 90,
    },
  },
} as const;

// フォームバリデーションの設定
export const VALIDATION_CONFIG = {
  name: {
    minLength: 2,
    maxLength: 50,
  },
  email: {
    maxLength: 255,
  },
  company: {
    name: {
      minLength: 2,
      maxLength: 100,
    },
    description: {
      minLength: 10,
      maxLength: 1000,
    },
  },
  event: {
    title: {
      minLength: 5,
      maxLength: 100,
    },
    description: {
      minLength: 20,
      maxLength: 2000,
    },
    capacity: {
      min: 1,
      max: 1000,
    },
  },
  message: {
    minLength: 10,
    maxLength: 1000,
  },
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  required: '必須項目です',
  email: '有効なメールアドレスを入力してください',
  url: '有効なURLを入力してください',
  minLength: (min: number) => `${min}文字以上で入力してください`,
  maxLength: (max: number) => `${max}文字以内で入力してください`,
  min: (min: number) => `${min}以上の値を入力してください`,
  max: (max: number) => `${max}以下の値を入力してください`,
  network: 'ネットワークエラーが発生しました',
  server: 'サーバーエラーが発生しました',
  notFound: '見つかりませんでした',
  unauthorized: '認証が必要です',
  forbidden: 'アクセス権限がありません',
} as const;