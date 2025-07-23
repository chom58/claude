// 会社情報の型定義（Prismaスキーマに基づく）
export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
  isActive: boolean;
  foundedYear?: number;
  employeeCount?: string;
  specialties: string[];
  services: string[];
  createdAt: Date;
  updatedAt: Date;
  // リレーション
  members?: CompanyMember[];
  eventRegistrations?: EventRegistration[];
}

// 会社メンバー情報の型定義
export interface CompanyMember {
  id: string;
  userId: string;
  companyId: string;
  role: string; // 'admin', 'manager', 'member'
  position?: string;
  isActive: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  // リレーション
  user?: User;
  company?: Company;
}

// イベント情報の型定義（Prismaスキーマに基づく）
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  venue?: string;
  maxParticipants?: number;
  currentParticipants: number;
  isActive: boolean;
  eventType: string; // 'networking', 'workshop', 'seminar', 'exhibition'
  tags: string[];
  imageUrl?: string;
  price?: number;
  currency: string;
  registrationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  // リレーション
  registrations?: EventRegistration[];
}

// イベント参加登録の型定義
export interface EventRegistration {
  id: string;
  eventId: string;
  userId?: string;
  companyId?: string;
  // ゲストユーザー情報
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  guestCompany?: string;
  status: string; // 'registered', 'attended', 'cancelled', 'no-show'
  notes?: string;
  registeredAt: Date;
  updatedAt: Date;
  // リレーション
  event?: Event;
  user?: User;
  company?: Company;
}

// ユーザー情報の型定義（Prismaスキーマに基づく）
export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  // リレーション
  companyMembers?: CompanyMember[];
  eventRegistrations?: EventRegistration[];
  accounts?: Account[];
  sessions?: Session[];
}

// NextAuth.jsのAccount型
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

// NextAuth.jsのSession型
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

// イベントタイプ
export type EventType = 
  | 'networking'
  | 'workshop'
  | 'seminar'
  | 'exhibition';

// フォーム関連の型定義
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface EventRegistrationFormData {
  eventId: string;
  companyId?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  guestCompany?: string;
  notes?: string;
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
  search?: string;
  specialty?: string;
  page?: number;
  limit?: number;
}

export interface EventFilter {
  search?: string;
  eventType?: string;
  upcoming?: boolean;
  page?: number;
  limit?: number;
}