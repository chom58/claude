import { Company, Event, Speaker, AgendaItem } from '@/types';

// モック会社データ
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'クリエイティブスタジオ原宿',
    nameEn: 'Creative Studio Harajuku',
    description: '原宿の中心地に位置するクリエイティブスタジオ。ブランディングからWebデザインまで、幅広いデザインサービスを提供しています。若手デザイナーの育成にも力を入れており、常に新しいクリエイティブを追求しています。',
    category: 'branding',
    logoUrl: '/images/companies/creative-studio-harajuku.png',
    websiteUrl: 'https://creative-studio-harajuku.com',
    location: '東京都渋谷区神宮前1-2-3',
    establishedYear: 2018,
    employeeCount: '10-20名',
    services: ['ブランディング', 'ロゴデザイン', 'Webデザイン', 'パッケージデザイン'],
    tags: ['ブランディング', 'クリエイティブ', '若手育成'],
    contactEmail: 'info@creative-studio-harajuku.com',
    socialLinks: {
      twitter: 'creativestudiohrj',
      instagram: 'creativestudioharajuku',
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'ピクセルデザインワークス',
    nameEn: 'Pixel Design Works',
    description: 'UI/UXデザインに特化したデザインスタジオ。スマートフォンアプリからWebサービスまで、ユーザー体験を重視したデザインを得意としています。原宿の感性を活かした革新的なデザインソリューションを提供します。',
    category: 'ui-ux',
    logoUrl: '/images/companies/pixel-design-works.png',
    websiteUrl: 'https://pixel-design-works.jp',
    location: '東京都渋谷区神宮前3-4-5',
    establishedYear: 2020,
    employeeCount: '5-10名',
    services: ['UI/UXデザイン', 'アプリデザイン', 'プロトタイピング', 'ユーザビリティテスト'],
    tags: ['UI/UX', 'アプリ', 'ユーザー体験'],
    contactEmail: 'hello@pixel-design-works.jp',
    socialLinks: {
      twitter: 'pixeldesignworks',
      linkedin: 'pixel-design-works',
    },
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'ハラジュクグラフィックス',
    nameEn: 'Harajuku Graphics',
    description: '伝統的なグラフィックデザインと現代的なデジタル技術を融合させたデザインスタジオ。印刷物からデジタルメディアまで、幅広い媒体でのデザイン制作を行っています。原宿らしいポップで個性的なデザインが特徴です。',
    category: 'graphic-design',
    logoUrl: '/images/companies/harajuku-graphics.png',
    websiteUrl: 'https://harajuku-graphics.co.jp',
    location: '東京都渋谷区神宮前4-5-6',
    establishedYear: 2015,
    employeeCount: '15-25名',
    services: ['グラフィックデザイン', '印刷デザイン', 'ポスターデザイン', 'パッケージデザイン'],
    tags: ['グラフィック', '印刷', 'ポップアート'],
    contactEmail: 'contact@harajuku-graphics.co.jp',
    socialLinks: {
      instagram: 'harajukugraphics',
      twitter: 'hrjgraphics',
    },
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'デジタルクリエイターズ表参道',
    nameEn: 'Digital Creators Omotesando',
    description: 'デジタルマーケティングとWebデザインを専門とするクリエイティブエージェンシー。表参道の洗練された環境で、ブランドの価値を最大化するデジタル戦略を提案しています。データドリブンなアプローチが強みです。',
    category: 'digital-marketing',
    logoUrl: '/images/companies/digital-creators-omotesando.png',
    websiteUrl: 'https://dc-omotesando.com',
    location: '東京都渋谷区神宮前5-6-7',
    establishedYear: 2019,
    employeeCount: '20-30名',
    services: ['デジタルマーケティング', 'SNS運用', 'Webサイト制作', 'SEO対策'],
    tags: ['デジタルマーケティング', 'SNS', 'データ分析'],
    contactEmail: 'info@dc-omotesando.com',
    socialLinks: {
      linkedin: 'digital-creators-omotesando',
      twitter: 'dc_omotesando',
    },
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    id: '5',
    name: 'アートディレクション竹下',
    nameEn: 'Art Direction Takeshita',
    description: '竹下通りの賑やかな雰囲気からインスピレーションを得たアートディレクションスタジオ。若者文化に精通したクリエイターが、斬新で印象的な広告・マーケティングキャンペーンを企画・制作しています。',
    category: 'advertising',
    logoUrl: '/images/companies/art-direction-takeshita.png',
    websiteUrl: 'https://ad-takeshita.jp',
    location: '東京都渋谷区神宮前1-7-8',
    establishedYear: 2017,
    employeeCount: '8-15名',
    services: ['アートディレクション', '広告企画', 'キャンペーン制作', 'ブランド戦略'],
    tags: ['アートディレクション', '広告', '若者文化'],
    contactEmail: 'creative@ad-takeshita.jp',
    socialLinks: {
      instagram: 'adtakeshita',
      twitter: 'ad_takeshita',
    },
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2024-05-12'),
  },
  {
    id: '6',
    name: 'イラストレーションファクトリー',
    nameEn: 'Illustration Factory',
    description: 'イラストレーションに特化したクリエイティブスタジオ。キャラクターデザインからコンセプトアートまで、多様なスタイルのイラストレーションを提供しています。原宿のカルチャーを反映したユニークな作品が評価されています。',
    category: 'illustration',
    logoUrl: '/images/companies/illustration-factory.png',
    websiteUrl: 'https://illustration-factory.net',
    location: '東京都渋谷区神宮前2-8-9',
    establishedYear: 2021,
    employeeCount: '5-10名',
    services: ['イラストレーション', 'キャラクターデザイン', 'コンセプトアート', '絵本制作'],
    tags: ['イラスト', 'キャラクター', 'アート'],
    contactEmail: 'studio@illustration-factory.net',
    socialLinks: {
      instagram: 'illustrationfactory',
      twitter: 'illust_factory',
    },
    createdAt: new Date('2023-06-18'),
    updatedAt: new Date('2024-06-18'),
  },
];

// モックスピーカーデータ
export const mockSpeakers: Speaker[] = [
  {
    id: '1',
    name: '田中 美咲',
    title: 'クリエイティブディレクター',
    company: 'クリエイティブスタジオ原宿',
    bio: '10年以上のブランディング経験を持つクリエイティブディレクター。数々の有名ブランドのリブランディングを手がけ、現在は若手デザイナーの育成にも力を入れている。',
    avatarUrl: '/images/speakers/tanaka-misaki.jpg',
    socialLinks: {
      twitter: 'misaki_tanaka_cd',
      linkedin: 'misaki-tanaka',
    },
  },
  {
    id: '2',
    name: '佐藤 健太',
    title: 'UI/UXデザイナー',
    company: 'ピクセルデザインワークス',
    bio: 'Google、Appleでの勤務経験を持つUI/UXデザイナー。ユーザー中心設計の専門家として、多くのアプリやWebサービスのUX改善に貢献している。',
    avatarUrl: '/images/speakers/sato-kenta.jpg',
    socialLinks: {
      twitter: 'kenta_ux',
      linkedin: 'kenta-sato-ux',
    },
  },
  {
    id: '3',
    name: '山田 あかり',
    title: 'グラフィックデザイナー',
    company: 'ハラジュクグラフィックス',
    bio: '原宿のストリートカルチャーに精通したグラフィックデザイナー。独特の色彩感覚とタイポグラフィで注目を集め、国内外のデザイン賞を多数受賞。',
    avatarUrl: '/images/speakers/yamada-akari.jpg',
    socialLinks: {
      instagram: 'akari_graphic',
      twitter: 'akari_design',
    },
  },
];

// モックイベントデータ
export const mockEvents: Event[] = [
  {
    id: '1',
    title: '原宿デザイン交流会 2024春',
    description: '原宿エリアのデザイン会社が一堂に会する年4回の定期交流会。今回は「AIとデザインの未来」をテーマに、最新のデザインツールやワークフローについて議論します。異業種の方々とのネットワーキングの機会もご用意しています。',
    type: 'networking',
    date: new Date('2024-04-15'),
    startTime: '18:00',
    endTime: '21:00',
    location: {
      name: '原宿コミュニティセンター',
      address: '東京都渋谷区神宮前1-10-1',
      accessInfo: 'JR原宿駅徒歩5分、地下鉄明治神宮前駅徒歩3分',
      mapUrl: 'https://maps.google.com/...',
    },
    capacity: 80,
    registeredCount: 62,
    isOnline: false,
    tags: ['ネットワーキング', 'AI', 'デザイン', '交流'],
    organizer: {
      id: '1',
      name: '原宿デザイン会社交流会実行委員会',
      company: '',
    },
    speakers: [mockSpeakers[0], mockSpeakers[1]],
    agenda: [
      {
        id: '1',
        time: '18:00',
        title: '受付・ウェルカムドリンク',
        duration: 30,
      },
      {
        id: '2', 
        time: '18:30',
        title: '開会挨拶・趣旨説明',
        duration: 15,
      },
      {
        id: '3',
        time: '18:45',
        title: 'パネルディスカッション「AIとデザインの未来」',
        speaker: '田中 美咲、佐藤 健太',
        duration: 45,
      },
      {
        id: '4',
        time: '19:30',
        title: 'ネットワーキングタイム',
        duration: 90,
      },
    ],
    registrationDeadline: new Date('2024-04-13'),
    fee: 2000,
    imageUrl: '/images/events/harajuku-design-meetup-spring-2024.jpg',
    requirements: ['デザイン業界での経験（学生可）', '名刺持参'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Figmaワークショップ：プロトタイピング入門',
    description: 'Figmaを使った効果的なプロトタイピング手法を学ぶハンズオンワークショップ。初心者から中級者まで、実際にプロトタイプを作成しながらFigmaの機能を習得できます。ノートPC持参でお越しください。',
    type: 'workshop',
    date: new Date('2024-04-20'),
    startTime: '14:00',
    endTime: '17:00',
    location: {
      name: 'クリエイティブスタジオ原宿',
      address: '東京都渋谷区神宮前1-2-3',
      accessInfo: 'JR原宿駅徒歩3分',
    },
    capacity: 20,
    registeredCount: 18,
    isOnline: false,
    tags: ['ワークショップ', 'Figma', 'プロトタイピング', 'UI/UX'],
    organizer: {
      id: '2',
      name: '佐藤 健太',
      company: 'ピクセルデザインワークス',
    },
    speakers: [mockSpeakers[1]],
    agenda: [
      {
        id: '1',
        time: '14:00',
        title: 'Figmaの基本操作復習',
        duration: 30,
      },
      {
        id: '2',
        time: '14:30',
        title: 'プロトタイピングの基礎理論',
        duration: 30,
      },
      {
        id: '3',
        time: '15:00',
        title: 'ハンズオン：実際にプロトタイプを作成',
        duration: 90,
      },
      {
        id: '4',
        time: '16:30',
        title: 'プロトタイプの共有・フィードバック',
        duration: 30,
      },
    ],
    registrationDeadline: new Date('2024-04-18'),
    fee: 3500,
    imageUrl: '/images/events/figma-workshop-prototyping.jpg',
    requirements: ['Figmaアカウント', 'ノートPC持参', '基本的なFigma操作経験'],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '3',
    title: 'オンライン：グラフィックデザイントレンド2024',
    description: '2024年のグラフィックデザイントレンドを徹底解説するオンラインセミナー。色彩、タイポグラフィ、レイアウトの最新動向から、実際のプロジェクトでの活用方法まで幅広くカバーします。',
    type: 'seminar',
    date: new Date('2024-04-25'),
    startTime: '19:00',
    endTime: '20:30',
    location: {
      name: 'オンライン（Zoom）',
      address: '',
    },
    capacity: 100,
    registeredCount: 73,
    isOnline: true,
    meetingUrl: 'https://zoom.us/j/...',
    tags: ['セミナー', 'グラフィックデザイン', 'トレンド', 'オンライン'],
    organizer: {
      id: '3',
      name: '山田 あかり',
      company: 'ハラジュクグラフィックス',
    },
    speakers: [mockSpeakers[2]],
    agenda: [
      {
        id: '1',
        time: '19:00',
        title: '2024年デザイントレンド概観',
        duration: 20,
      },
      {
        id: '2',
        time: '19:20',
        title: '色彩トレンドの分析',
        duration: 25,
      },
      {
        id: '3',
        time: '19:45',
        title: 'タイポグラフィとレイアウトの新潮流',
        duration: 25,
      },
      {
        id: '4',
        time: '20:10',
        title: 'Q&Aセッション',
        duration: 20,
      },
    ],
    registrationDeadline: new Date('2024-04-24'),
    fee: 1500,
    imageUrl: '/images/events/graphic-design-trends-2024.jpg',
    requirements: ['Zoom環境', 'デザイン実務経験（学生可）'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-25'),
  },
  {
    id: '4',
    title: '原宿クリエイターズピッチ大会',
    description: '若手クリエイターが自身のプロジェクトやアイデアをプレゼンテーションするピッチイベント。審査員は業界のベテランデザイナーや投資家が務め、優秀者には賞金や投資の機会も。',
    type: 'showcase',
    date: new Date('2024-05-10'),
    startTime: '15:00',
    endTime: '18:00',
    location: {
      name: '表参道ヒルズ イベントスペース',
      address: '東京都渋谷区神宮前4-12-10',
      accessInfo: '地下鉄表参道駅直結',
    },
    capacity: 150,
    registeredCount: 89,
    isOnline: false,
    tags: ['ピッチ', 'スタートアップ', 'クリエイター', '投資'],
    organizer: {
      id: '1',
      name: '原宿デザイン会社交流会実行委員会',
    },
    speakers: mockSpeakers,
    agenda: [
      {
        id: '1',
        time: '15:00',
        title: '開会・審査員紹介',
        duration: 15,
      },
      {
        id: '2',
        time: '15:15',
        title: 'ピッチプレゼンテーション（1回戦）',
        duration: 60,
      },
      {
        id: '3',
        time: '16:15',
        title: '休憩・ネットワーキング',
        duration: 15,
      },
      {
        id: '4',
        time: '16:30',
        title: 'ピッチプレゼンテーション（決勝戦）',
        duration: 45,
      },
      {
        id: '5',
        time: '17:15',
        title: '審査・結果発表',
        duration: 30,
      },
      {
        id: '6',
        time: '17:45',
        title: 'クロージング・懇親会',
        duration: 15,
      },
    ],
    registrationDeadline: new Date('2024-05-08'),
    fee: 3000,
    imageUrl: '/images/events/harajuku-creators-pitch.jpg',
    requirements: ['ピッチ資料準備（発表者のみ）', 'クリエイティブ業界への関心'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-04-01'),
  },
];

// 検索・フィルタリング用のヘルパー関数
export function filterCompanies(
  companies: Company[],
  filters: {
    category?: string;
    location?: string;
    tags?: string[];
    search?: string;
  }
): Company[] {
  return companies.filter(company => {
    // カテゴリフィルター
    if (filters.category && company.category !== filters.category) {
      return false;
    }

    // ロケーションフィルター
    if (filters.location && !company.location.includes(filters.location)) {
      return false;
    }

    // タグフィルター
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        company.tags.some(companyTag => 
          companyTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    // 検索フィルター
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        company.name,
        company.nameEn || '',
        company.description,
        ...company.services,
        ...company.tags,
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

export function filterEvents(
  events: Event[],
  filters: {
    type?: string;
    dateFrom?: Date;
    dateTo?: Date;
    isOnline?: boolean;
    tags?: string[];
    search?: string;
  }
): Event[] {
  return events.filter(event => {
    // タイプフィルター
    if (filters.type && event.type !== filters.type) {
      return false;
    }

    // 日付フィルター
    if (filters.dateFrom && event.date < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo && event.date > filters.dateTo) {
      return false;
    }

    // オンライン/オフラインフィルター
    if (filters.isOnline !== undefined && event.isOnline !== filters.isOnline) {
      return false;
    }

    // タグフィルター
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        event.tags.some(eventTag => 
          eventTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    // 検索フィルター
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        event.title,
        event.description,
        event.location.name,
        event.organizer.name,
        ...event.tags,
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}