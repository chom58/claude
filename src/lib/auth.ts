// 認証関連のユーティリティ関数（Phase 2で実装予定）

import { User, UserRole } from '@/types';

// 認証状態の型定義
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// JWT トークンの型定義
export interface JWTPayload {
  sub: string; // ユーザーID
  email: string;
  role: UserRole;
  iat: number; // 発行時刻
  exp: number; // 有効期限
}

// ローカルストレージのキー
const TOKEN_KEY = 'harajuku_design_token';
const REFRESH_TOKEN_KEY = 'harajuku_design_refresh_token';

/**
 * JWT トークンをローカルストレージに保存
 */
export const setAuthToken = (token: string, refreshToken?: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }
};

/**
 * JWT トークンをローカルストレージから取得
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * リフレッシュトークンを取得
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

/**
 * 認証情報をクリア
 */
export const clearAuthTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

/**
 * JWT トークンをデコード
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error('JWT decode error:', error);
    return null;
  }
};

/**
 * トークンの有効期限をチェック
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) return true;
  
  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

/**
 * 認証が必要かどうかをチェック
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  
  return !isTokenExpired(token);
};

/**
 * ユーザーの権限をチェック
 */
export const hasPermission = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    'user': 1,
    'company-admin': 2,
    'event-organizer': 3,
    'admin': 4,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * 企業管理者かどうかをチェック
 */
export const isCompanyAdmin = (user: User | null): boolean => {
  return user?.role === 'company-admin' || user?.role === 'admin';
};

/**
 * イベント主催者かどうかをチェック
 */
export const isEventOrganizer = (user: User | null): boolean => {
  return user?.role === 'event-organizer' || user?.role === 'admin';
};

/**
 * サイト管理者かどうかをチェック
 */
export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

/**
 * 認証が必要なページかどうかをチェック
 */
export const requiresAuth = (pathname: string): boolean => {
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    '/admin',
    '/events/create',
    '/events/manage',
    '/companies/manage',
  ];
  
  return protectedRoutes.some(route => pathname.startsWith(route));
};

/**
 * 管理者権限が必要なページかどうかをチェック
 */
export const requiresAdmin = (pathname: string): boolean => {
  const adminRoutes = [
    '/admin',
  ];
  
  return adminRoutes.some(route => pathname.startsWith(route));
};

/**
 * リダイレクト先を決定
 */
export const getRedirectPath = (
  user: User | null,
  intendedPath?: string
): string => {
  // ログインしていない場合はログインページへ
  if (!user) {
    return `/login${intendedPath ? `?redirect=${encodeURIComponent(intendedPath)}` : ''}`;
  }
  
  // 意図したパスがある場合はそこへ
  if (intendedPath && !requiresAdmin(intendedPath)) {
    return intendedPath;
  }
  
  // 管理者の場合は管理画面へ
  if (isAdmin(user)) {
    return '/admin';
  }
  
  // 企業管理者の場合は企業管理画面へ
  if (isCompanyAdmin(user)) {
    return '/companies/manage';
  }
  
  // イベント主催者の場合はイベント管理画面へ
  if (isEventOrganizer(user)) {
    return '/events/manage';
  }
  
  // 一般ユーザーはダッシュボードへ
  return '/dashboard';
};

/**
 * パスワード強度をチェック
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('パスワードは8文字以上で入力してください');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('大文字を含めてください');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('小文字を含めてください');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('数字を含めてください');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('特殊文字を含めてください');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * メールアドレスの形式をチェック
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * セッションタイムアウトの警告
 */
export const checkSessionTimeout = (token: string): {
  isExpired: boolean;
  expiresIn: number; // 分単位
} => {
  const payload = decodeJWT(token);
  if (!payload) {
    return { isExpired: true, expiresIn: 0 };
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  const expiresIn = Math.floor((payload.exp - currentTime) / 60);
  
  return {
    isExpired: payload.exp < currentTime,
    expiresIn: Math.max(0, expiresIn),
  };
};

/**
 * 2要素認証用のQRコード生成（Phase 3で実装予定）
 */
export const generate2FASecret = async (email: string): Promise<{
  secret: string;
  qrCodeUrl: string;
}> => {
  // 実装はPhase 3で行う
  throw new Error('2FA is not implemented yet');
};

/**
 * 2要素認証コードの検証（Phase 3で実装予定）
 */
export const verify2FACode = async (
  secret: string,
  code: string
): Promise<boolean> => {
  // 実装はPhase 3で行う
  throw new Error('2FA is not implemented yet');
};