'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COMPANY_CATEGORIES, VALIDATION_CONFIG, ERROR_MESSAGES } from '@/lib/constants';
import { isValidEmail, isValidUrl } from '@/lib/utils';
import {
  HiUser,
  HiOfficeBuilding,
  HiMail,
  HiPhone,
  HiGlobe,
  HiPhotograph,
  HiCheck,
  HiExclamation,
} from 'react-icons/hi';

interface FormData {
  // 基本情報
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // 会社情報
  companyName: string;
  companyNameEn: string;
  companyCategory: string;
  companyDescription: string;
  companyWebsite: string;
  companyLocation: string;
  establishedYear: string;
  employeeCount: string;
  
  // サービス・専門分野
  services: string;
  specialties: string;
  
  // 参加目的・期待
  participationGoals: string;
  expectations: string;
  
  // 利用規約・プライバシー
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToMarketing: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyName: '',
    companyNameEn: '',
    companyCategory: '',
    companyDescription: '',
    companyWebsite: '',
    companyLocation: '',
    establishedYear: '',
    employeeCount: '',
    services: '',
    specialties: '',
    participationGoals: '',
    expectations: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // フォームデータの更新
  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // バリデーション
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 必須項目のチェック
    const requiredFields = [
      'contactName',
      'contactEmail',
      'companyName',
      'companyCategory',
      'companyDescription',
      'companyLocation',
      'participationGoals',
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = ERROR_MESSAGES.required;
      }
    });

    // メールアドレスの形式チェック
    if (formData.contactEmail && !isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = ERROR_MESSAGES.email;
    }

    // WebサイトURLの形式チェック
    if (formData.companyWebsite && !isValidUrl(formData.companyWebsite)) {
      newErrors.companyWebsite = ERROR_MESSAGES.url;
    }

    // 文字数制限チェック
    if (formData.contactName.length < VALIDATION_CONFIG.name.minLength) {
      newErrors.contactName = ERROR_MESSAGES.minLength(VALIDATION_CONFIG.name.minLength);
    }
    
    if (formData.companyDescription.length < VALIDATION_CONFIG.company.description.minLength) {
      newErrors.companyDescription = ERROR_MESSAGES.minLength(VALIDATION_CONFIG.company.description.minLength);
    }

    // 設立年の形式チェック
    if (formData.establishedYear) {
      const year = parseInt(formData.establishedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        newErrors.establishedYear = '有効な設立年を入力してください';
      }
    }

    // 利用規約の同意チェック
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '利用規約への同意が必要です';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'プライバシーポリシーへの同意が必要です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ここで実際のAPI呼び出しを行う（Phase 2で実装）
      await new Promise(resolve => setTimeout(resolve, 2000)); // モック処理
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'エラーが発生しました。もう一度お試しください。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <>
        <Header />
        <main id="main-content" className="pt-20">
          <section className="section-spacing bg-harajuku-gradient">
            <div className="container-responsive text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiCheck className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  登録申請を受け付けました
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  ご登録いただき、ありがとうございます。<br />
                  内容を確認の上、3営業日以内にご連絡いたします。<br />
                  確認メールを送信いたしましたので、ご確認ください。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => window.location.href = '/'}
                    className="btn-primary"
                  >
                    ホームに戻る
                  </button>
                  <button
                    type="button"
                    onClick={() => window.location.href = '/events'}
                    className="btn-outline"
                  >
                    イベントを見る
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* ヘッダーセクション */}
        <section className="bg-harajuku-gradient py-16">
          <div className="container-responsive text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              参加登録
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              原宿デザイン会社交流会への参加をご希望の方は、以下のフォームからお申し込みください。
              審査の上、ご連絡いたします。
            </p>
          </div>
        </section>

        {/* 登録フォームセクション */}
        <section className="section-spacing bg-gray-50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* エラーメッセージ */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <HiExclamation className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700">{errors.submit}</span>
                  </div>
                )}

                {/* 担当者情報 */}
                <div className="card">
                  <div className="flex items-center mb-6">
                    <HiUser className="w-6 h-6 text-harajuku-pink-500 mr-3" />
                    <h2 className="text-xl font-display font-semibold text-gray-900">
                      担当者情報
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.contactName}
                        onChange={(e) => updateFormData('contactName', e.target.value)}
                        placeholder="田中 太郎"
                      />
                      {errors.contactName && (
                        <p className="form-error">{errors.contactName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="form-label">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        value={formData.contactEmail}
                        onChange={(e) => updateFormData('contactEmail', e.target.value)}
                        placeholder="tanaka@example.com"
                      />
                      {errors.contactEmail && (
                        <p className="form-error">{errors.contactEmail}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="form-label">電話番号</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={formData.contactPhone}
                        onChange={(e) => updateFormData('contactPhone', e.target.value)}
                        placeholder="03-1234-5678"
                      />
                    </div>
                  </div>
                </div>

                {/* 会社情報 */}
                <div className="card">
                  <div className="flex items-center mb-6">
                    <HiOfficeBuilding className="w-6 h-6 text-harajuku-pink-500 mr-3" />
                    <h2 className="text-xl font-display font-semibold text-gray-900">
                      会社情報
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">
                          会社名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          placeholder="株式会社デザインスタジオ"
                        />
                        {errors.companyName && (
                          <p className="form-error">{errors.companyName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="form-label">会社名（英語）</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.companyNameEn}
                          onChange={(e) => updateFormData('companyNameEn', e.target.value)}
                          placeholder="Design Studio Co., Ltd."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="form-label">
                        業種・カテゴリ <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="form-input"
                        value={formData.companyCategory}
                        onChange={(e) => updateFormData('companyCategory', e.target.value)}
                      >
                        <option value="">選択してください</option>
                        {Object.entries(COMPANY_CATEGORIES).map(([key, category]) => (
                          <option key={key} value={key}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.companyCategory && (
                        <p className="form-error">{errors.companyCategory}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="form-label">
                        会社説明 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="form-input h-32 resize-vertical"
                        value={formData.companyDescription}
                        onChange={(e) => updateFormData('companyDescription', e.target.value)}
                        placeholder="会社の概要、特徴、強みなどを詳しくご記入ください。"
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.companyDescription && (
                          <p className="form-error">{errors.companyDescription}</p>
                        )}
                        <p className="text-xs text-gray-500 ml-auto">
                          {formData.companyDescription.length}/1000文字
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">
                          所在地 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.companyLocation}
                          onChange={(e) => updateFormData('companyLocation', e.target.value)}
                          placeholder="東京都渋谷区神宮前1-2-3"
                        />
                        {errors.companyLocation && (
                          <p className="form-error">{errors.companyLocation}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="form-label">Webサイト</label>
                        <input
                          type="url"
                          className="form-input"
                          value={formData.companyWebsite}
                          onChange={(e) => updateFormData('companyWebsite', e.target.value)}
                          placeholder="https://example.com"
                        />
                        {errors.companyWebsite && (
                          <p className="form-error">{errors.companyWebsite}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">設立年</label>
                        <input
                          type="number"
                          className="form-input"
                          value={formData.establishedYear}
                          onChange={(e) => updateFormData('establishedYear', e.target.value)}
                          placeholder="2020"
                          min="1900"
                          max={new Date().getFullYear()}
                        />
                        {errors.establishedYear && (
                          <p className="form-error">{errors.establishedYear}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="form-label">従業員数</label>
                        <select
                          className="form-input"
                          value={formData.employeeCount}
                          onChange={(e) => updateFormData('employeeCount', e.target.value)}
                        >
                          <option value="">選択してください</option>
                          <option value="1名">1名</option>
                          <option value="2-5名">2-5名</option>
                          <option value="6-10名">6-10名</option>
                          <option value="11-20名">11-20名</option>
                          <option value="21-50名">21-50名</option>
                          <option value="51-100名">51-100名</option>
                          <option value="101名以上">101名以上</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* サービス・専門分野 */}
                <div className="card">
                  <div className="flex items-center mb-6">
                    <HiPhotograph className="w-6 h-6 text-harajuku-pink-500 mr-3" />
                    <h2 className="text-xl font-display font-semibold text-gray-900">
                      サービス・専門分野
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="form-label">主なサービス</label>
                      <textarea
                        className="form-input h-24 resize-vertical"
                        value={formData.services}
                        onChange={(e) => updateFormData('services', e.target.value)}
                        placeholder="Webデザイン、ブランディング、UI/UXデザインなど、提供しているサービスをご記入ください。"
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">専門分野・得意領域</label>
                      <textarea
                        className="form-input h-24 resize-vertical"
                        value={formData.specialties}
                        onChange={(e) => updateFormData('specialties', e.target.value)}
                        placeholder="特に力を入れている分野や、他社との差別化ポイントなどをご記入ください。"
                      />
                    </div>
                  </div>
                </div>

                {/* 参加目的・期待 */}
                <div className="card">
                  <div className="flex items-center mb-6">
                    <HiGlobe className="w-6 h-6 text-harajuku-pink-500 mr-3" />
                    <h2 className="text-xl font-display font-semibold text-gray-900">
                      参加目的・期待
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="form-label">
                        参加目的 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="form-input h-32 resize-vertical"
                        value={formData.participationGoals}
                        onChange={(e) => updateFormData('participationGoals', e.target.value)}
                        placeholder="交流会への参加目的や、実現したいことをご記入ください。"
                      />
                      {errors.participationGoals && (
                        <p className="form-error">{errors.participationGoals}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="form-label">期待・要望</label>
                      <textarea
                        className="form-input h-24 resize-vertical"
                        value={formData.expectations}
                        onChange={(e) => updateFormData('expectations', e.target.value)}
                        placeholder="交流会に期待することや、開催してほしいイベントなどがあればご記入ください。"
                      />
                    </div>
                  </div>
                </div>

                {/* 利用規約・同意 */}
                <div className="card">
                  <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
                    利用規約・プライバシー
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree-terms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                        className="w-4 h-4 text-harajuku-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-harajuku-pink-500 focus:ring-2 mt-1"
                      />
                      <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-700">
                        <a href="/terms" target="_blank" className="text-harajuku-pink-600 hover:underline">
                          利用規約
                        </a>
                        に同意します <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="form-error ml-6">{errors.agreeToTerms}</p>
                    )}
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree-privacy"
                        checked={formData.agreeToPrivacy}
                        onChange={(e) => updateFormData('agreeToPrivacy', e.target.checked)}
                        className="w-4 h-4 text-harajuku-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-harajuku-pink-500 focus:ring-2 mt-1"
                      />
                      <label htmlFor="agree-privacy" className="ml-2 text-sm text-gray-700">
                        <a href="/privacy" target="_blank" className="text-harajuku-pink-600 hover:underline">
                          プライバシーポリシー
                        </a>
                        に同意します <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {errors.agreeToPrivacy && (
                      <p className="form-error ml-6">{errors.agreeToPrivacy}</p>
                    )}
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree-marketing"
                        checked={formData.agreeToMarketing}
                        onChange={(e) => updateFormData('agreeToMarketing', e.target.checked)}
                        className="w-4 h-4 text-harajuku-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-harajuku-pink-500 focus:ring-2 mt-1"
                      />
                      <label htmlFor="agree-marketing" className="ml-2 text-sm text-gray-700">
                        イベント情報やニュースレターの配信を希望します（任意）
                      </label>
                    </div>
                  </div>
                </div>

                {/* 送信ボタン */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner w-5 h-5 mr-2" />
                        送信中...
                      </>
                    ) : (
                      '登録申請を送信'
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    送信後、3営業日以内にご連絡いたします。
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}