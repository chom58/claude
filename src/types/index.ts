// 会社情報の型定義
export interface Company {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  category: CompanyCategory;
  logoUrl?: string;
  websiteUrl?: string;
  location: string;
  establishedYear?: number;
  employeeCount?: string;
  services: string[];
  tags: string[];
  contactEmail?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// 会社カテゴリ
export type CompanyCategory = 
  | 'web-design'
  | 'graphic-design'
  | 'ui-ux'
  | 'branding'
  | 'advertising'
  | 'digital-marketing'
  | 'illustration'
  | 'animation'
  | 'photography'
  | 'other';

// イベント情報の型定義
export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: Date;
  startTime: string;
  endTime: string;
  location: EventLocation;
  capacity: number;
  registeredCount: number;
  isOnline: boolean;
  meetingUrl?: string;
  tags: string[];
  organizer: {
    id: string;
    name: string;
    company?: string;
  };
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  registrationDeadline?: Date;
  fee?: number;
  imageUrl?: string;
  requirements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// イベントタイプ
export type EventType = 
  | 'networking'
  | 'workshop'
  | 'seminar'
  | 'panel-discussion'
  | 'showcase'
  | 'social'
  | 'other';

// イベント開催場所
export interface EventLocation {
  name: string;
  address: string;
  accessInfo?: string;
  mapUrl?: string;
}

// スピーカー情報
export interface Speaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio: string;
  avatarUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

// アジェンダアイテム
export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  duration: number; // 分
}

// ユーザー情報の型定義（Phase 2用）
export interface User {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  avatarUrl?: string;
  company?: string;
  position?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
  };
  isVerified: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ユーザーロール
export type UserRole = 'user' | 'company-admin' | 'event-organizer' | 'admin';

// 登録情報の型定義
export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  registeredAt: Date;
  attendedAt?: Date;
  cancelledAt?: Date;
  notes?: string;
}

// 登録ステータス
export type RegistrationStatus = 'registered' | 'cancelled' | 'attended' | 'no-show';

// フォーム関連の型定義
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface EventRegistrationFormData {
  name: string;
  email: string;
  company?: string;
  position?: string;
  dietaryRestrictions?: string;
  specialRequests?: string;
}

// API レスポンスの型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ページネーション
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// フィルター
export interface CompanyFilter {
  category?: CompanyCategory[];
  location?: string[];
  tags?: string[];
  services?: string[];
}

export interface EventFilter {
  type?: EventType[];
  date?: {
    from?: Date;
    to?: Date;
  };
  location?: string[];
  tags?: string[];
  isOnline?: boolean;
}