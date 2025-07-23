'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockEvents, filterEvents } from '@/lib/mock-data';
import { EVENT_TYPES } from '@/lib/constants';
import { EventType } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';
import {
  HiSearch,
  HiFilter,
  HiCalendar,
  HiClock,
  HiLocationMarker,
  HiUsers,
  HiArrowRight,
  HiGlobe,
  HiVideoCamera,
} from 'react-icons/hi';

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // 期間フィルター用の日付計算
  const getDateRange = (period: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (period) {
      case 'today':
        return { from: today, to: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
      case 'week':
        return { 
          from: today, 
          to: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) 
        };
      case 'month':
        return { 
          from: today, 
          to: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) 
        };
      default:
        return {};
    }
  };

  // フィルタリングされたイベントリスト
  const filteredEvents = useMemo(() => {
    const dateRange = getDateRange(selectedPeriod);
    
    return filterEvents(mockEvents, {
      search: searchTerm,
      type: selectedType || undefined,
      dateFrom: dateRange.from,
      dateTo: dateRange.to,
      isOnline: showOnlineOnly ? true : undefined,
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [searchTerm, selectedType, selectedPeriod, showOnlineOnly]);

  // イベントタイプ別の数を計算
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockEvents.forEach(event => {
      counts[event.type] = (counts[event.type] || 0) + 1;
    });
    return counts;
  }, []);

  // フィルターをリセット
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedPeriod('');
    setShowOnlineOnly(false);
  };

  // イベントが今日かどうかをチェック
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // イベントが開催中かどうかをチェック
  const isOngoing = (event: typeof mockEvents[0]) => {
    const now = new Date();
    const eventStart = new Date(`${event.date.toDateString()} ${event.startTime}`);
    const eventEnd = new Date(`${event.date.toDateString()} ${event.endTime}`);
    return now >= eventStart && now <= eventEnd;
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* ヘッダーセクション */}
        <section className="bg-harajuku-gradient py-16">
          <div className="container-responsive text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              イベント一覧 
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              原宿エリアで開催される{mockEvents.length}個のデザインイベントや交流会をご紹介します。
              あなたにぴったりのイベントを見つけて、新しいつながりを作りましょう。
            </p>
          </div>
        </section>

        {/* 検索・フィルターセクション */}
        <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
          <div className="container-responsive py-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 検索バー */}
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="イベント名、説明、タグで検索..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-harajuku-pink-200 focus:border-harajuku-pink-400 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* フィルターボタン */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline lg:hidden"
              >
                <HiFilter className="w-5 h-5 mr-2" />
                フィルター
              </button>
            </div>

            {/* フィルターオプション */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* イベントタイプフィルター */}
                <div>
                  <label className="form-label">イベントタイプ</label>
                  <select
                    className="form-input"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">すべてのタイプ</option>
                    {Object.entries(EVENT_TYPES).map(([key, type]) => (
                      <option key={key} value={key}>
                        {type.name} ({typeCounts[key] || 0})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 期間フィルター */}
                <div>
                  <label className="form-label">期間</label>
                  <select
                    className="form-input"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="">すべての期間</option>
                    <option value="today">今日</option>
                    <option value="week">今週</option>
                    <option value="month">今月</option>
                  </select>
                </div>

                {/* オンラインフィルター */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="online-only"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    className="w-4 h-4 text-harajuku-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-harajuku-pink-500 focus:ring-2"
                  />
                  <label htmlFor="online-only" className="ml-2 text-sm font-medium text-gray-700">
                    オンラインイベントのみ
                  </label>
                </div>

                {/* リセットボタン */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full btn-secondary"
                  >
                    フィルターをリセット
                  </button>
                </div>
              </div>
            </div>

            {/* 検索結果数 */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {filteredEvents.length}個のイベントが見つかりました
              </p>
              {(searchTerm || selectedType || selectedPeriod || showOnlineOnly) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm text-harajuku-pink-600 hover:text-harajuku-pink-700"
                >
                  すべて表示
                </button>
              )}
            </div>
          </div>
        </section>

        {/* イベント一覧セクション */}
        <section className="section-spacing bg-gray-50">
          <div className="container-responsive">
            {filteredEvents.length > 0 ? (
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="card hover:shadow-harajuku-lg transition-all duration-300 relative overflow-hidden"
                  >
                    {/* ステータスバッジ */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {isToday(event.date) && (
                        <span className="badge badge-warning">今日開催</span>
                      )}
                      {isOngoing(event) && (
                        <span className="badge badge-success animate-pulse">開催中</span>
                      )}
                      {event.isOnline && (
                        <span className="badge bg-blue-100 text-blue-800">
                          <HiVideoCamera className="w-3 h-3 mr-1" />
                          オンライン
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* 日付表示 */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-r from-harajuku-pink-500 to-harajuku-purple-500 rounded-xl flex flex-col items-center justify-center text-white">
                          <div className="text-xs font-medium">
                            {event.date.toLocaleDateString('ja-JP', { month: 'short' })}
                          </div>
                          <div className="text-2xl font-bold">
                            {event.date.getDate()}
                          </div>
                        </div>
                      </div>

                      {/* イベント詳細 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span
                              className={`tag mb-2 ${EVENT_TYPES[event.type].color}`}
                            >
                              {EVENT_TYPES[event.type].icon} {EVENT_TYPES[event.type].name}
                            </span>
                            <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-ellipsis-2">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        {/* イベント情報 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <HiCalendar className="w-4 h-4 mr-2 text-harajuku-pink-500" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <HiClock className="w-4 h-4 mr-2 text-harajuku-pink-500" />
                            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <HiLocationMarker className="w-4 h-4 mr-2 text-harajuku-pink-500" />
                            <span className="truncate">
                              {event.isOnline ? 'オンライン' : event.location.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <HiUsers className="w-4 h-4 mr-2 text-harajuku-pink-500" />
                            <span>
                              {event.registeredCount}/{event.capacity}名
                              {event.registeredCount >= event.capacity && (
                                <span className="text-red-500 ml-1">満席</span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* タグ */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.slice(0, 4).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {event.tags.length > 4 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{event.tags.length - 4}
                            </span>
                          )}
                        </div>

                        {/* 主催者情報とアクション */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            主催: {event.organizer.name}
                            {event.organizer.company && (
                              <span> / {event.organizer.company}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {event.fee && (
                              <span className="text-sm font-medium text-gray-900">
                                ¥{event.fee.toLocaleString()}
                              </span>
                            )}
                            <Link
                              href={`/events/${event.id}`}
                              className="btn-primary text-sm"
                            >
                              詳細・申込
                              <HiArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 検索結果なし
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiCalendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
                  イベントが見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-6">
                  検索条件を変更するか、フィルターをリセットしてお試しください。
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  フィルターをリセット
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTAセクション */}
        <section className="section-spacing bg-white">
          <div className="container-responsive text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                イベントを開催しませんか？
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                原宿デザイン会社交流会では、メンバー企業によるイベント開催を支援しています。
                あなたの専門知識を共有して、コミュニティに貢献しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn-primary">
                  イベント企画相談
                  <HiArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/about" className="btn-outline">
                  詳細を見る
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}