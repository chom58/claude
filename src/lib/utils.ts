import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * TailwindCSSクラス名を結合するユーティリティ関数
 * clsxとtailwind-mergeを組み合わせて使用
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日付をフォーマットする関数
 */
export function formatDate(date: Date | string, locale: string = 'ja-JP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 時間をフォーマットする関数
 */
export function formatTime(time: string): string {
  // HH:MM形式の時間を受け取り、表示用にフォーマット
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
}

/**
 * 日付と時間を組み合わせてフォーマットする関数
 */
export function formatDateTime(date: Date | string, time?: string, locale: string = 'ja-JP'): string {
  const formattedDate = formatDate(date, locale);
  if (time) {
    return `${formattedDate} ${formatTime(time)}`;
  }
  return formattedDate;
}

/**
 * 相対時間を表示する関数（例: 2時間前、3日前）
 */
export function formatRelativeTime(date: Date | string, locale: string = 'ja-JP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const timeUnits = [
    { unit: 'year', seconds: 31536000, label: '年' },
    { unit: 'month', seconds: 2592000, label: 'ヶ月' },
    { unit: 'week', seconds: 604800, label: '週間' },
    { unit: 'day', seconds: 86400, label: '日' },
    { unit: 'hour', seconds: 3600, label: '時間' },
    { unit: 'minute', seconds: 60, label: '分' },
  ];

  for (const { seconds, label } of timeUnits) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval}${label}前`;
    }
  }

  return 'たった今';
}

/**
 * URLが有効かどうかをチェックする関数
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * メールアドレスが有効かどうかをチェックする関数
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 文字列をスラッグ形式に変換する関数
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を削除
    .replace(/[\s_-]+/g, '-') // スペース、アンダースコア、ハイフンをハイフンに変換
    .replace(/^-+|-+$/g, ''); // 前後のハイフンを削除
}

/**
 * 配列をチャンクに分割する関数
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 配列から重複を削除する関数
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * オブジェクトから空の値を削除する関数
 */
export function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== '') {
      result[key as keyof T] = value;
    }
  }
  
  return result;
}

/**
 * 数値を日本語の形式でフォーマットする関数
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ja-JP').format(num);
}

/**
 * ファイルサイズを人間が読みやすい形式でフォーマットする関数
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * デバウンス関数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * スロットル関数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}