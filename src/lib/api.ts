// API関連のユーティリティ関数（Phase 2で実装予定）

import { ApiResponse, PaginatedResponse } from '@/types';

// APIのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// APIリクエストの共通設定
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * APIリクエストを送信する共通関数
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// 企業関連のAPI
export const companiesApi = {
  // 企業一覧取得
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    location?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return apiRequest<PaginatedResponse<any>>(
      `/companies?${searchParams.toString()}`
    );
  },

  // 企業詳細取得
  getById: async (id: string) => {
    return apiRequest<any>(`/companies/${id}`);
  },

  // 企業登録
  create: async (data: any) => {
    return apiRequest<any>('/companies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 企業情報更新
  update: async (id: string, data: any) => {
    return apiRequest<any>(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// イベント関連のAPI
export const eventsApi = {
  // イベント一覧取得
  getAll: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    isOnline?: boolean;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return apiRequest<PaginatedResponse<any>>(
      `/events?${searchParams.toString()}`
    );
  },

  // イベント詳細取得
  getById: async (id: string) => {
    return apiRequest<any>(`/events/${id}`);
  },

  // イベント作成
  create: async (data: any) => {
    return apiRequest<any>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // イベント参加申込
  register: async (eventId: string, data: any) => {
    return apiRequest<any>(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // イベント参加キャンセル
  unregister: async (eventId: string) => {
    return apiRequest<any>(`/events/${eventId}/unregister`, {
      method: 'DELETE',
    });
  },
};

// ユーザー関連のAPI（Phase 2で実装）
export const usersApi = {
  // プロフィール取得
  getProfile: async () => {
    return apiRequest<any>('/users/profile');
  },

  // プロフィール更新
  updateProfile: async (data: any) => {
    return apiRequest<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 参加イベント履歴
  getEventHistory: async () => {
    return apiRequest<any>('/users/events');
  },
};

// 認証関連のAPI（Phase 2で実装）
export const authApi = {
  // ログイン
  login: async (email: string, password: string) => {
    return apiRequest<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // ログアウト
  logout: async () => {
    return apiRequest<any>('/auth/logout', {
      method: 'POST',
    });
  },

  // パスワードリセット
  resetPassword: async (email: string) => {
    return apiRequest<any>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// お問い合わせ・申請関連のAPI
export const contactApi = {
  // 参加申請送信
  submitRegistration: async (data: any) => {
    return apiRequest<any>('/contact/registration', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // お問い合わせ送信
  submitContact: async (data: any) => {
    return apiRequest<any>('/contact/inquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// エラーハンドリング用のユーティリティ
export const handleApiError = (error: any) => {
  if (error.response) {
    // サーバーからのエラーレスポンス
    const status = error.response.status;
    switch (status) {
      case 400:
        return '入力内容に問題があります。';
      case 401:
        return 'ログインが必要です。';
      case 403:
        return 'アクセス権限がありません。';
      case 404:
        return '対象が見つかりませんでした。';
      case 500:
        return 'サーバーエラーが発生しました。';
      default:
        return 'エラーが発生しました。';
    }
  } else if (error.request) {
    // ネットワークエラー
    return 'ネットワークエラーが発生しました。';
  } else {
    // その他のエラー
    return '予期しないエラーが発生しました。';
  }
};