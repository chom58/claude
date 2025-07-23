'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockCompanies, filterCompanies } from '@/lib/mock-data';
import { COMPANY_CATEGORIES } from '@/lib/constants';
import { CompanyCategory } from '@/types';
import {
  HiSearch,
  HiFilter,
  HiLocationMarker,
  HiArrowRight,
  HiOfficeBuilding,
  HiUsers,
  HiExternalLink,
} from 'react-icons/hi';

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // フィルタリングされた企業リスト
  const filteredCompanies = useMemo(() => {
    return filterCompanies(mockCompanies, {
      search: searchTerm,
      category: selectedCategory || undefined,
      location: selectedLocation || undefined,
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  // カテゴリー別の企業数を計算
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockCompanies.forEach(company => {
      counts[company.category] = (counts[company.category] || 0) + 1;
    });
    return counts;
  }, []);

  // フィルターをリセット
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* ヘッダーセクション */}
        <section className="bg-harajuku-gradient py-16">
          <div className="container-responsive text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              参加企業一覧
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              原宿エリアで活動する{mockCompanies.length}社のデザイン会社をご紹介します。
              カテゴリーや地域で絞り込んで、興味のある企業を見つけてください。
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
                  placeholder="企業名、サービス、タグで検索..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* カテゴリーフィルター */}
                <div>
                  <label className="form-label">カテゴリー</label>
                  <select
                    className="form-input"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">すべてのカテゴリー</option>
                    {Object.entries(COMPANY_CATEGORIES).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.name} ({categoryCounts[key] || 0})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 地域フィルター */}
                <div>
                  <label className="form-label">地域</label>
                  <select
                    className="form-input"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">すべての地域</option>
                    <option value="神宮前1">神宮前1丁目</option>
                    <option value="神宮前2">神宮前2丁目</option>
                    <option value="神宮前3">神宮前3丁目</option>
                    <option value="神宮前4">神宮前4丁目</option>
                    <option value="神宮前5">神宮前5丁目</option>
                  </select>
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
                {filteredCompanies.length}社の企業が見つかりました
              </p>
              {(searchTerm || selectedCategory || selectedLocation) && (
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

        {/* 企業一覧セクション */}
        <section className="section-spacing bg-gray-50">
          <div className="container-responsive">
            {filteredCompanies.length > 0 ? (
              <div className="grid-responsive">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="card card-hover group"
                  >
                    {/* 企業ヘッダー */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-harajuku-pink-100 to-harajuku-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-harajuku-pink-600">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-xl text-gray-900 mb-1 group-hover:text-harajuku-pink-600 transition-colors">
                          {company.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {company.nameEn}
                        </p>
                        <span
                          className={`tag text-xs ${COMPANY_CATEGORIES[company.category].color}`}
                        >
                          {COMPANY_CATEGORIES[company.category].icon} {COMPANY_CATEGORIES[company.category].name}
                        </span>
                      </div>
                    </div>

                    {/* 企業詳細 */}
                    <p className="text-gray-600 text-sm text-ellipsis-3 mb-4">
                      {company.description}
                    </p>

                    {/* サービス */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">
                        主なサービス
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {company.services.slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                        {company.services.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{company.services.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 企業情報 */}
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <HiLocationMarker className="w-4 h-4 mr-2" />
                        {company.location}
                      </div>
                      <div className="flex items-center">
                        <HiUsers className="w-4 h-4 mr-2" />
                        {company.employeeCount}
                      </div>
                      {company.establishedYear && (
                        <div className="flex items-center">
                          <HiOfficeBuilding className="w-4 h-4 mr-2" />
                          設立 {company.establishedYear}年
                        </div>
                      )}
                    </div>

                    {/* アクション */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        href={`/companies/${company.id}`}
                        className="inline-flex items-center text-harajuku-pink-600 hover:text-harajuku-pink-700 font-medium text-sm group-hover:translate-x-1 transition-transform"
                      >
                        詳細を見る
                        <HiArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                      {company.websiteUrl && (
                        <a
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
                        >
                          <HiExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 検索結果なし
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOfficeBuilding className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
                  企業が見つかりませんでした
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
                あなたの会社も参加しませんか？
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                原宿デザイン会社交流会に参加して、新しいビジネスチャンスを見つけましょう。
              </p>
              <Link href="/register" className="btn-primary">
                参加登録
                <HiArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}