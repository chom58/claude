import Link from 'next/link';
import { SITE_CONFIG, NAVIGATION_ITEMS, HARAJUKU_LOCATIONS } from '@/lib/constants';
import { HiSparkles, HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: 'https://twitter.com/harajuku_design',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://instagram.com/harajuku_design_network',
      color: 'hover:text-pink-400',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://linkedin.com/company/harajuku-design-network',
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/harajuku-design-network',
      color: 'hover:text-gray-600',
    },
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* メインフッターセクション */}
      <div className="container-responsive section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-harajuku-pink-500 to-harajuku-purple-500 rounded-xl">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-gradient">
                  {SITE_CONFIG.nameEn}
                </div>
                <div className="text-xs text-gray-600 -mt-1">
                  {SITE_CONFIG.name}
                </div>
              </div>
            </Link>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            
            {/* ソーシャルリンク */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={`${social.name}をフォロー`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="font-display font-semibold text-gray-900 mb-4">
              ナビゲーション
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-harajuku-pink-600 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="font-display font-semibold text-gray-900 mb-4">
              サポート
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-harajuku-pink-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* お問い合わせ情報 */}
          <div>
            <h3 className="font-display font-semibold text-gray-900 mb-4">
              お問い合わせ
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <HiMail className="w-5 h-5 text-harajuku-pink-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">
                    <a
                      href="mailto:info@harajuku-design-network.com"
                      className="hover:text-harajuku-pink-600 transition-colors"
                    >
                      info@harajuku-design-network.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <HiLocationMarker className="w-5 h-5 text-harajuku-pink-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">
                    東京都渋谷区神宮前
                    <br />
                    <span className="text-xs text-gray-500">
                      原宿・表参道エリア
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <HiPhone className="w-5 h-5 text-harajuku-pink-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">
                    平日 10:00-18:00
                    <br />
                    <span className="text-xs text-gray-500">
                      （土日祝日は休業）
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ニュースレター購読 */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container-responsive py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display font-semibold text-gray-900 mb-2">
              最新情報をお届け
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              イベント情報やデザイン業界のトレンドを定期的にお送りします。
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="form-input flex-1"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                購読する
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-t border-gray-100">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>Made with ❤️ in Harajuku</span>
              <Link
                href="/sitemap.xml"
                className="hover:text-harajuku-pink-600 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}