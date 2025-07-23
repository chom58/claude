'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { HiMenu, HiX, HiSparkles } from 'react-icons/hi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューを閉じる
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ロゴ */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-harajuku-pink-500 to-harajuku-purple-500 rounded-xl">
              <HiSparkles className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-lg text-gradient">
                {SITE_CONFIG.nameEn}
              </div>
              <div className="text-xs text-gray-600 -mt-1">
                {SITE_CONFIG.name}
              </div>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link',
                  pathname === item.href && 'active'
                )}
                title={item.description}
              >
                <span className="hidden xl:inline">{item.name}</span>
                <span className="xl:hidden">{item.nameEn}</span>
              </Link>
            ))}
          </div>

          {/* CTAボタン（デスクトップ） */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/register"
              className="btn-primary text-sm"
            >
              参加登録
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* モバイルメニュー */}
        <div
          className={cn(
            'lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300 overflow-hidden',
            isMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 px-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-lg font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-harajuku-pink-50 text-harajuku-pink-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                onClick={closeMenu}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="text-sm text-gray-500">{item.nameEn}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.description}
                </div>
              </Link>
            ))}
            
            {/* モバイル用CTAボタン */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/register"
                className="block w-full btn-primary text-center"
                onClick={closeMenu}
              >
                参加登録
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* オーバーレイ（モバイル） */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}