import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockCompanies, mockEvents } from '@/lib/mock-data';
import { SITE_CONFIG, COMPANY_CATEGORIES, EVENT_TYPES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import {
  HiSparkles,
  HiUsers,
  HiCalendar,
  HiOfficeBuilding,
  HiArrowRight,
  HiStar,
  HiLocationMarker,
  HiClock,
} from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'ホーム',
  description: `${SITE_CONFIG.description} 最新のイベント情報や参加企業をご紹介します。`,
};

export default function HomePage() {
  // 最新のイベント（3件）
  const latestEvents = mockEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  // 注目の企業（6件）
  const featuredCompanies = mockCompanies
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 6);

  const stats = [
    {
      icon: HiOfficeBuilding,
      value: mockCompanies.length,
      label: '参加企業',
      suffix: '社',
    },
    {
      icon: HiCalendar,
      value: mockEvents.length,
      label: '開催イベント',
      suffix: '回',
    },
    {
      icon: HiUsers,
      value: 250,
      label: '参加者',
      suffix: '名',
    },
    {
      icon: HiStar,
      value: 4.8,
      label: '満足度',
      suffix: '/5',
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* ヒーローセクション */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 背景アニメーション */}
          <div className="absolute inset-0 bg-harajuku-gradient">
            <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-harajuku-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-harajuku-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
            <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-harajuku-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container-responsive text-center">
            <div className="max-w-4xl mx-auto">
              {/* メインタイトル */}
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                  <HiSparkles className="w-5 h-5 text-harajuku-pink-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Harajuku Design Community
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-4 leading-tight">
                  クリエイティブが
                  <br />
                  <span className="text-gradient-blue">つながる場所</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  原宿エリアのデザイン会社が集まる交流プラットフォーム。
                  創造性と革新性を追求するデザイナーたちのネットワーキングサイトです。
                </p>
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/events" className="btn-primary text-lg px-8 py-4">
                  <HiCalendar className="w-5 h-5 mr-2" />
                  イベントを見る
                </Link>
                <Link href="/companies" className="btn-secondary text-lg px-8 py-4">
                  <HiOfficeBuilding className="w-5 h-5 mr-2" />
                  参加企業を見る
                </Link>
              </div>

              {/* 統計情報 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="card text-center p-4 hover:shadow-harajuku-lg transition-all duration-300"
                  >
                    <stat.icon className="w-8 h-8 text-harajuku-pink-500 mx-auto mb-2" />
                    <div className="font-display font-bold text-2xl text-gray-900">
                      {stat.value}
                      <span className="text-sm text-gray-500 ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* スクロール指示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-ping"></div>
            </div>
          </div>
        </section>

        {/* 最新イベントセクション */}
        <section className="section-spacing bg-white">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                最新イベント
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                原宿エリアで開催される最新のデザインイベントや交流会をご紹介します。
              </p>
            </div>

            <div className="grid-responsive">
              {latestEvents.map((event) => (
                <div
                  key={event.id}
                  className="card card-hover group cursor-pointer"
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`tag ${EVENT_TYPES[event.type].color}`}
                      >
                        {EVENT_TYPES[event.type].icon} {EVENT_TYPES[event.type].name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-xl text-gray-900 mb-2 group-hover:text-harajuku-pink-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-ellipsis-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <HiClock className="w-4 h-4 mr-2" />
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center">
                      <HiLocationMarker className="w-4 h-4 mr-2" />
                      {event.isOnline ? 'オンライン' : event.location.name}
                    </div>
                    <div className="flex items-center">
                      <HiUsers className="w-4 h-4 mr-2" />
                      {event.registeredCount}/{event.capacity}名参加予定
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center text-harajuku-pink-600 hover:text-harajuku-pink-700 font-medium text-sm group-hover:translate-x-1 transition-transform"
                    >
                      詳細を見る
                      <HiArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/events" className="btn-outline">
                すべてのイベントを見る
                <HiArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* 参加企業セクション */}
        <section className="section-spacing bg-gray-50">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                参加企業
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                原宿エリアで活動する様々なデザイン会社が参加しています。
              </p>
            </div>

            <div className="grid-responsive">
              {featuredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="card card-hover group cursor-pointer"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-harajuku-pink-100 to-harajuku-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-harajuku-pink-600">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 group-hover:text-harajuku-pink-600 transition-colors">
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

                  <p className="text-gray-600 text-sm text-ellipsis-3 mb-4">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
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

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <HiLocationMarker className="w-4 h-4 mr-1" />
                      原宿・表参道エリア
                    </div>
                    <Link
                      href={`/companies/${company.id}`}
                      className="inline-flex items-center text-harajuku-pink-600 hover:text-harajuku-pink-700 font-medium group-hover:translate-x-1 transition-transform"
                    >
                      詳細
                      <HiArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/companies" className="btn-outline">
                すべての企業を見る
                <HiArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="section-spacing bg-gradient-to-r from-harajuku-pink-500 to-harajuku-purple-500 text-white">
          <div className="container-responsive text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                一緒にクリエイティブな未来を築きませんか？
              </h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                原宿デザイン会社交流会に参加して、同じ志を持つクリエイターたちとつながり、
                新しいプロジェクトやコラボレーションの機会を見つけましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="btn-secondary bg-white text-harajuku-purple-600 hover:bg-gray-50"
                >
                  今すぐ参加登録
                  <HiArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about"
                  className="btn-outline border-white text-white hover:bg-white/10"
                >
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