# Apptronik - 詳細企業レポート

**優先度**: A
**カテゴリ**: Early-Stage Startup / Humanoid Robots
**最終更新**: 2026-02-04

---

## 📊 企業概要

### 基本情報
| 項目 | 詳細 |
|------|------|
| **企業名** | Apptronik |
| **本社所在地** | 米国テキサス州オースティン |
| **創業** | 2016年 |
| **創業者・CEO** | Jeff Cardenas（共同創業者4名） |
| **従業員数** | 170名以上（2025年、今後50%以上増員予定） |
| **事業内容** | 汎用ヒューマノイドロボットの開発・製造 |
| **資金調達** | Series A $403M（2025年3月完了） |
| **主要投資家** | B Capital（リード）、Capital Factory、Google、Mercedes-Benz、Japan Post Capital、ARK Invest、Korea Investment Partners |
| **公式サイト** | https://apptronik.com/ |
| **LinkedIn** | https://www.linkedin.com/company/apptronik-inc. |

---

## 🚀 Physical AI技術・プロダクト

### 1. Apollo ヒューマノイドロボット

**基本スペック**:
- **身長**: 約1.7m（5フィート8インチ）
- **体重**: 約73kg（160ポンド）
- **可搬重量**: 最大25kg（55ポンド）
- **稼働時間**: 1日22時間、週7日稼働可能
- **バッテリー**: 交換可能なバッテリーシステム

**設計思想**:
- **人間中心設計（Human-Centered Design）**
  - 人間と一緒に働くために最適化
  - 親しみやすく、温かみのある外観
  - 人間の作業環境（工場、倉庫）での動作を前提
- **安全性重視**
  - 力覚制御アーキテクチャ（Force Control Architecture）
  - 協働ロボット（Cobot）レベルの安全性
  - 人の周りでも安全な腕の動き

**NASA Valkyrieの遺産**:
- NASA Valkyrie（宇宙用ヒューマノイド）を含む10以上のロボットの開発経験
- テキサス大学オースティン校Human Centered Robotics Labでの研究成果
- 2016年創業から10イテレーション以上の開発を経て現在の商用モデルに到達

### 2. 技術スタック

#### **コンピューティングプラットフォーム**
- **NVIDIA Jetson AGX Orin**: メインコンピューティング
- **NVIDIA Jetson Orin NX**: 補助処理
- エッジAI推論に最適化（ローカル処理重視、一部クラウド連携）

#### **ソフトウェアアーキテクチャ**
- **ROS/ROS2統合**: ロボット制御の基盤
- **RT Linux統合**: リアルタイム処理
- **力覚制御システム**: 安全な人間協働
- **全身制御スタック**: モーションプランニング、力制御、バランス制御
- **フリート管理ソフトウェア**: 複数ロボットの一元管理
- **ポイント&クリック制御**: 操作の簡素化

#### **AI統合（2024-2025年の大型提携）**

**Google DeepMind提携（2024年12月）**:
- **Gemini Robotics**: Gemini 2.0ベースの次世代VLA（Vision-Language-Action）モデル
- **Gemini Robotics 1.5**: 視覚・言語・動作の統合モデル
- **Gemini Robotics-ER 1.5**: Embodied Reasoning（具現化推論）モデル
  - 「単一指示」から「真の理解と問題解決」へ進化
- **Gemini Robotics On-Device**: ロボットデバイス上でのローカル実行に最適化
- 目標: 物理タスクの真の理解と問題解決能力

**NVIDIA提携（2024年3月）**:
- **Project GR00T**: 汎用基盤モデル（Foundation Models for Humanoid Robots）
- **Isaac Lab**: ロボットシミュレーション環境
- **OSMO**: 計算オーケストレーションサービス
- NVIDIA のAIポートフォリオ全体を活用

#### **プラットフォーム戦略**
- **「ロボットのiPhone」コンセプト**
  - 開発パートナーがApptronikのソリューションを拡張可能
  - アプリストア型のエコシステム構築
  - Boston DynamicsのSpot的なプラットフォーム展開

### 3. ターゲット産業と用途

**現在のフォーカス**:
1. **物流（Logistics）**
   - 倉庫内ピッキング
   - 箱の運搬・仕分け
   - 棚からの荷物取り出し

2. **製造業（Manufacturing）**
   - 自動車製造（Mercedes-Benz提携）
   - 電子機器製造
   - 部品供給（ラインサイドデリバリー）

3. **その他産業**
   - サードパーティ物流（3PL）
   - 飲料ボトリング
   - フルフィルメントセンター

**Mercedes-Benz商用契約（2024年3月）**:
- Apolloの最初の公開商用導入
- Mercedes-Benz初のヒューマノイドロボット適用
- Mercedes-Benzから€100M（約$109M）超の投資
- **用途**: 物流での部品供給（生産ラインへの部材運搬）
- **現状**: パイロットフェーズ（2025年初頭時点）
  - 生産環境データの収集中
  - 人間作業者によるテレオペレーションでのデータ転送
  - 次ステップ: 自律動作の実現

### 4. 2025年の製品ロードマップ

**新型Apollo発表予定**:
- 2025年末までに新バージョンを発表予定
- 主要なアップグレード実施
- CES 2025でのデモ実施済み
- Fast Company 2025 Innovation by Design Awardを受賞

---

## 🌍 米国市場戦略とグローバル展開

### 1. 米国市場でのポジション

**市場の捉え方**:
- CEO Jeff Cardenas: 「ヒューマノイドロボティクスは我々の時代の宇宙開発競争」
- 米国で信頼できるプレーヤーは**5社未満**との認識
- 商用化で先行するポジション確立

**ターゲット市場**:
- 米国製造業（自動車、電子機器）
- 米国物流業（Amazon、FedEx、UPS等の大手3PL）
- 米国政府機関（DoD、NASA）

**競争優位性**:
- NASAとの協業実績（Valkyrie）
- 大学研究機関との連携（UT Austin）
- $403Mの豊富な資金調達
- Google、NVIDIA、Mercedes-Benzとの戦略的提携

### 2. 日本市場展開の可能性

**Japan Post Capital投資（2025年3月）**:
- Series Aラウンドに参加（$403Mの一部）
- Yuta Ogura（Senior Manager）のコメント:
  - 「物流でのヒューマノイドロボット実装を優先しつつ、製造業やその他産業への拡大を目指すApptronikに投資できることを嬉しく思う」
  - 「資本効率の高い実環境での実装に焦点を当てたGo-to-Market戦略」
  - 「**実践的でフィールド志向のマインドセットは、日本市場での成功に不可欠**」

**日本市場の魅力**:
- 深刻な労働力不足（成人用おむつが子供用を上回る）
- 急速に減少する生産年齢人口
- 物流・製造業の自動化ニーズ
- 政府の労働力不足対策（ロボット導入支援）

**想定される展開**:
- Japan Post Capitalを通じた日本市場進出の準備
- 日本の物流・製造業大手との提携検討
- 日本語対応・日本市場向けカスタマイズ
- 東京・大阪等への拠点設立の可能性

### 3. グローバル展開戦略

**韓国市場**:
- Korea Investment Partners（KIP）が投資（Series A）
- 韓国市場への進出も視野

**欧州市場**:
- Mercedes-Benz提携を通じたドイツ市場
- 欧州製造業への展開可能性

---

## 👥 組織・拠点

### オースティン本社

**設立経緯**:
- 2016年: テキサス大学オースティン校Human Centered Robotics Lab内で4名で創業
- 初期: ブートストラップ運営（外部資金なし）で40-50名まで成長
- 2023年頃: 大型本社オフィスに移転、従業員90名
- 2025年: 従業員170名以上、今後50%以上増員予定（255名以上へ）

**チーム構成**:
- CEO: Jeff Cardenas（共同創業者、UT Austin出身）
- UT Austin Human Centered Robotics Lab出身者多数
- ロボティクスエンジニア、AIエンジニア、機械・電気エンジニア
- ソフトウェアエンジニア（ROS、AI/ML、DevOps、Navigation、RL）

**企業文化**:
- **人間中心設計の哲学**: ロボットの外見が人々の認識・対話に影響
- **Apolloの設計思想**: 親しみやすく、フレンドリー、温かみ
- **ミッション**: ロボットヘルパーで生活と仕事を改善
- **大学との強い結びつき**: UT Austinとの産学連携

### 主要拠点
- **本社**: テキサス州オースティン（R&D、製造、ビジネス開発）
- **将来的な拠点展開**: 日本、韓国、欧州の可能性

---

## 💼 採用状況

### 1. 現在募集中のポジション（2025年）

**エンジニアリング職**:
- **Staff Systems Engineer**: ロボットソフトウェアプロジェクトのリード
- **Senior Mechanical Engineer**: ヒューマノイドロボット用アクチュエーターの設計・解析
- **Senior Software Engineer**: 複数専門分野
  - DevOps（CI/CD、インフラ自動化）
  - Navigation（自律走行、経路計画）
  - Reinforcement Learning（強化学習）
- **Firmware Engineer**: 組込みソフトウェア、リアルタイム制御
- **Robotics Integration Engineer**: ハードウェア・ソフトウェア統合
- **AI Engineer**: Computer Vision、Machine Learning

**その他職種**:
- **Contract Technical Recruiter**: ハードウェア・エンジニア採用支援
- **Business Development**: 新規顧客開拓、パートナーシップ

**インターンシップ**:
- **Mechanical Engineer, Intern**
- **Robotics Software Engineering Intern**
- UT Austin等の大学院生・学部生向け

### 2. 求めるスキル・経験

**技術要件**:
- **ロボティクス**: センサー、コントローラー、アクチュエーター、通信デバイス
- **ロボット運動学（Kinematics）**: 基礎知識
- **Computer Vision**: 物体認識、シーン理解
- **ROS/ROS2**: 実務経験（優遇）
- **プログラミング**: C++、Python、C#/.NET
- **AI/ML**: PyTorch、TensorFlow、強化学習
- **ハードウェア**: 機械設計、電気回路、制御システム

**求める人物像**:
- ヒューマノイドロボットの商用化に情熱を持つ人材
- 人間中心設計の価値観を共有できる人材
- スタートアップ環境でのスピード感ある開発に適応できる人材
- 学際的なチームでの協業能力

### 3. 言語要件

- **英語**: ビジネスレベル必須（本社はオースティン）
- **日本語**: 日本市場展開時には有利（将来的な需要）

### 4. ビザサポート

- H-1Bビザスポンサー可能性あり
- テキサス州オースティンでの勤務

---

## 💰 資金・成長

### 資金調達履歴

| ラウンド | 時期 | 金額 | 主要投資家 |
|---------|------|------|-----------|
| Series A Extension | 2025年3月 | $53M | Japan Post Capital、Mercedes-Benz、ARK Invest、Korea Investment Partners、RyderVentures等 |
| Series A | 2025年2月 | $350M | B Capital（リード）、Capital Factory、Google |
| 初期ラウンド | 2023年 | $14.6M | - |
| **累計** | - | **$403M+** | - |

**特筆すべき投資家**:
- **Japan Post Capital**: 日本郵政グループのVC、日本市場展開を示唆
- **Mercedes-Benz**: 商用契約パートナー兼投資家（€100M超投資）
- **Google**: DeepMind提携、AI技術連携
- **ARK Invest**: Cathie Woodのファンド、破壊的技術投資
- **Korea Investment Partners**: 韓国市場展開の可能性

### 成長指標

**チーム拡大**:
- 2016年: 4名（創業）
- 2021年: 40-50名
- 2023年: 90名
- 2025年: 170名以上
- 目標: 今後50%以上増員（255名以上へ）

**技術マイルストーン**:
- 2023年8月: Apollo発表
- 2024年3月: Mercedes-Benz商用契約
- 2024年3月: NVIDIA提携発表
- 2024年12月: Google DeepMind提携発表
- 2025年: Fast Company Innovation by Design Award受賞
- 2025年末: 新型Apollo発表予定

**事業拡大**:
- Mercedes-Benzパイロット進行中
- 自動車、電子機器、3PL、飲料等への展開
- プラットフォームエコシステム構築（開発パートナー拡大）

---

## 🎯 外国人材提案の切り口

### 1. ヒューマノイドロボティクスの専門性

**希少な専門家**:
- ヒューマノイドロボット（二足歩行、全身制御）は地上ロボットより複雑
- 世界的にも限られた研究機関・企業（MIT、CMU、Boston Dynamics等）
- 商用ヒューマノイドは更に希少（Figure、Tesla、Apptronik等のみ）

**提案ポイント**:
- グローバルなヒューマノイドロボティクス人材ネットワーク
- MIT、CMU、Stanford、ETH等のトップ研究機関出身者
- Boston Dynamics、Figure、Tesla Optimus等の競合出身者
- NASA、国際宇宙機関でのヒューマノイド開発経験者

### 2. AI/ML統合の最先端技術

**Google・NVIDIA提携による需要**:
- Gemini Robotics（VLAモデル）の実装エンジニア
- GR00T基盤モデルの活用・カスタマイズ
- 強化学習・Embodied AIの専門家
- Computer Visionの最新技術（物体認識、シーン理解、操作計画）

**提案ポイント**:
- Google DeepMind、NVIDIA Research出身のAI研究者
- VLA（Vision-Language-Action）モデルの実装経験
- 大規模言語モデル（LLM）とロボティクスの融合経験
- Embodied AI / Physical AIの研究者・エンジニア

### 3. 急速な組織拡大（50%増員計画）

**大量採用の必要性**:
- 現在170名 → 255名以上（今後1-2年で85名以上採用）
- 全職種での大量採用（エンジニア、営業、事業開発、オペレーション）
- Mercedes-Benz、Google、NVIDIA提携の拡大に伴う需要

**提案ポイント**:
- 一括での複数候補者提案
- 多様な職種・レベルでのパイプライン構築
- スタートアップ経験者（急成長環境に適応）
- チームビルディング・組織拡大経験者

### 4. 日本市場展開の準備

**Japan Post Capital投資の意味**:
- 日本市場進出の明確な意図
- 日本郵政グループのネットワーク活用（物流業界）
- 「実践的でフィールド志向」の重視 = 日本市場の特性理解

**提案ポイント**:
- 日英バイリンガルのビジネス開発人材
- 日本製造業・物流業界での経験者
- 日本市場での事業開発・営業経験（外資系企業）
- 日本のロボティクス業界人脈を持つ人材

---

## 📝 採用担当への提案内容

### 1. ヒューマノイドロボティクスエンジニア

**Senior Mechanical Engineer**:
- MIT、CMU、Stanford等のロボティクスPhD
- Boston Dynamics、Figure、Tesla Optimus等の競合経験者
- 二足歩行ロボット、アクチュエーター設計の専門家
- NASA Valkyrie等の宇宙用ヒューマノイド開発経験

**Senior Software Engineer（Navigation/Control）**:
- ROS/ROS2の5年以上の実務経験
- SLAM、モーションプランニング、パスプランニングの専門知識
- 全身制御・バランス制御の実装経験
- CMU、Stanford、UT Austin等のロボティクスプログラム出身

### 2. AI/MLエンジニア（Google・NVIDIA提携関連）

**AI Engineer（Vision-Language-Action）**:
- Google DeepMind、NVIDIA Research、OpenAI等の出身者
- VLAモデル（Vision-Language-Action）の研究・実装経験
- Embodied AI / Physical AIの論文実績
- PyTorch、TensorFlow、JAXの深い知識

**Reinforcement Learning Engineer**:
- 強化学習の博士号 or 同等の実務経験
- ロボティクス分野でのRL適用経験（Isaac Gym、MuJoCo等）
- Google DeepMind、UC Berkeley、CMU等の出身者
- Sim-to-Real転移の専門知識

### 3. ビジネス開発（日本市場）

**Business Development Manager（Japan）**:
- 日英バイリンガル（ネイティブレベル）
- 日本製造業・物流業界での事業開発経験5年以上
- 外資系ロボティクス企業での日本市場開拓経験
- トヨタ、日産、ホンダ等の自動車メーカー人脈
- ヤマト運輸、佐川急便、日本郵便等の物流業界人脈

**Sales Engineer（Japan）**:
- 技術バックグラウンド（工学修士以上）+ 営業経験
- ロボティクス製品の技術営業経験
- 日本顧客向けのデモ・PoC実施経験
- 日英バイリンガル（技術説明が英語でも可能）

### 4. インターン・若手人材

**新卒・インターン**:
- UT Austin、MIT、CMU、Stanford等のロボティクス専攻
- NASA、国際宇宙ステーション関連の研究室出身
- ROS/ROS2、C++、Python、AI/MLの基礎スキル
- 将来の正社員候補としての育成

---

## ❓ 採用担当に確認すべき質問

### 組織・体制
1. 現在の従業員170名の職種別内訳は？（エンジニア、営業、オペレーション等）
2. 今後の50%増員計画（85名以上）の優先職種は？
3. エンジニアチームの専門分野別構成は？（機械、電気、ソフトウェア、AI）
4. Google・NVIDIA提携に伴うAIチームの拡大計画は？

### 採用計画
5. 2025年の採用目標（ポジション数、優先順位）は？
6. 特に急募のポジションは？（エンジニア、ビジネス開発等）
7. 日本市場向けの採用計画は？（時期、ポジション）
8. インターンから正社員への登用実績は？

### 技術・プロジェクト
9. Mercedes-Benzパイロット以外の商用プロジェクトは？
10. 2025年末の新型Apollo発表の詳細は？（主要アップグレード内容）
11. Google DeepMindとのGemini Robotics統合のタイムラインは？
12. NVIDIA GR00Tの実装状況は？

### 日本市場展開
13. Japan Post Capital投資後の日本市場展開計画は？
14. 日本市場向けのカスタマイズ（言語、機能）の予定は？
15. 日本拠点設立の可能性・時期は？
16. 日本の製造業・物流業大手との提携交渉状況は？

### グローバル人材
17. 外国人エンジニアの採用実績は？（国籍構成）
18. ビザスポンサーの方針は？（H-1B、グリーンカード）
19. 日英バイリンガル人材の需要は？（日本市場展開に向けて）
20. リモートワークの方針は？（オースティン拠点以外の可能性）

### 競合・パートナー
21. Boston Dynamics、Figure、Tesla Optimusとの競争をどう見るか？
22. 他の自動車メーカー（トヨタ、ホンダ等）との交渉状況は？
23. 大学・研究機関との共同研究は？（UT Austin以外）
24. 次回の資金調達計画は？（Series Bのタイミング）

---

## 🚀 次のアクション

### 即座に実行可能（1週間以内）

1. **LinkedInでのターゲティング**
   - キーワード: "humanoid robot" "ROS" "NASA" "Boston Dynamics" "Figure"
   - 所在地: 米国（オースティン、ボストン、サンフランシスコ）
   - 業界: ロボティクス、AI/ML、宇宙開発
   - 現職: Boston Dynamics、Figure、Tesla Optimus、NASA等

2. **大学・研究機関へのアプローチ**
   - UT Austin Human Centered Robotics Lab
   - MIT Computer Science and AI Lab (CSAIL)
   - CMU Robotics Institute
   - Stanford AI Lab
   - UC Berkeley BAIR（Berkeley AI Research）

3. **日本人材のサーチ開始**
   - 日英バイリンガルのビジネス開発人材
   - 日本製造業・物流業界経験者
   - Japan Post関連企業出身者

### 中期的な取り組み（1-3ヶ月）

4. **Apptronik採用担当との関係構築**
   - LinkedIn経由でのコンタクト
   - 採用ニーズの詳細ヒアリング（特に日本市場関連）
   - 人材提案の優先順位確認

5. **候補者プールの構築**
   - ヒューマノイドロボティクス専門家のデータベース化
   - AI/ML人材（VLA、Embodied AI、RL専門）のリスト
   - 日英バイリンガル人材（ロボティクス業界経験）のリスト

6. **業界イベントでのネットワーキング**
   - IROS（IEEE International Conference on Intelligent Robots and Systems）
   - ICRA（IEEE International Conference on Robotics and Automation）
   - CES（Consumer Electronics Show）
   - RoboBusiness

### 長期的な戦略（3-6ヶ月）

7. **Apptronikのニュース・マイルストーンの追跡**
   - Mercedes-Benzパイロットの進捗
   - 新型Apollo発表（2025年末）
   - 日本市場進出の発表
   - 追加資金調達ラウンド

8. **競合分析**
   - Boston Dynamics（Atlas）、Figure（Figure 01）、Tesla（Optimus）との比較
   - Apptronikの競争優位性の理解
   - 候補者へのApptronik提案時の差別化ポイント

9. **日本市場展開への準備**
   - Japan Post Capital経由の情報収集
   - 日本郵便、ヤマト運輸、佐川急便等の物流業界動向
   - トヨタ、ホンダ等の自動車メーカーのロボット戦略
   - 日本政府の労働力不足対策・ロボット導入支援策

---

## 📚 リソース

### 公式情報
- **公式サイト**: https://apptronik.com/
- **Apollo製品ページ**: https://apptronik.com/apollo
- **LinkedIn**: https://www.linkedin.com/company/apptronik-inc.
- **採用ページ**: https://apptronik.com/careers

### ニュース・記事
- [Apptronik Closes $403M Series A Funding (2025年3月)](https://www.globenewswire.com/news-release/2025/03/18/3044434/0/en/Apptronik-Closes-Additional-Series-A-Funding-Bringing-Total-Round-to-403M.html)
- [Mercedes-Benz Commercial Agreement (2024年3月)](https://www.prnewswire.com/news-releases/apptronik-and-mercedes-benz-enter-commercial-agreement-that-will-pilot-apptroniks-apollo-humanoid-robot-in-mercedes-benz-manufacturing-facilities-302089972.html)
- [Google DeepMind Partnership (2024年12月)](https://www.globenewswire.com/news-release/2024/12/19/2999933/0/en/Apptronik-Partners-with-Google-DeepMind-Robotics-to-Accelerate-Advancement-on-AI-powered-Humanoid-Robots.html)
- [NVIDIA Collaboration (2024年3月)](https://www.prnewswire.com/news-releases/apptronik-collaborates-with-nvidia-to-advance-ai-for-general-purpose-humanoid-robots-302092085.html)
- [CEO Interview - "Space Race of Our Time"](https://www.humanoidsdaily.com/feed/apptronik-ceo-calls-humanoid-robotics-the-space-race-of-our-time-says-fewer-than-5-u-s-players-are-credible)

### 求人・採用
- Built In Austin: https://www.builtinaustin.com/company/apptronik/jobs
- B Capital Job Board: https://jobs.b.capital/companies/apptronik

### データベース
- Crunchbase: https://www.crunchbase.com/organization/apptronik
- Tracxn: https://tracxn.com/d/companies/apptronik/
- Sacra: https://sacra.com/c/apptronik/

---

**レポート作成日**: 2026-02-04
**次回更新推奨**: 2026年6月（日本市場展開、新型Apollo発表後）

---

**Sources**:
- [Apptronik Closes Additional Series A Funding, Bringing Total Round to $403M](https://www.globenewswire.com/news-release/2025/03/18/3044434/0/en/Apptronik-Closes-Additional-Series-A-Funding-Bringing-Total-Round-to-403M.html)
- [Apptronik and Mercedes-Benz Enter Commercial Agreement](https://www.prnewswire.com/news-releases/apptronik-and-mercedes-benz-enter-commercial-agreement-that-will-pilot-apptroniks-apollo-humanoid-robot-in-mercedes-benz-manufacturing-facilities-302089972.html)
- [Apptronik Apollo Product Page](https://apptronik.com/apollo)
- [Apptronik Partners with Google DeepMind Robotics](https://www.globenewswire.com/news-release/2024/12/19/2999933/0/en/Apptronik-Partners-with-Google-DeepMind-Robotics-to-Accelerate-Advancement-on-AI-powered-Humanoid-Robots.html)
- [Apptronik Collaborates with NVIDIA](https://www.prnewswire.com/news-releases/apptronik-collaborates-with-nvidia-to-advance-ai-for-general-purpose-humanoid-robots-302092085.html)
- [Apptronik CEO Calls Humanoid Robotics the "Space Race of Our Time"](https://www.humanoidsdaily.com/feed/apptronik-ceo-calls-humanoid-robotics-the-space-race-of-our-time-says-fewer-than-5-u-s-players-are-credible)
- [Apptronik Leadership Page](https://apptronik.com/leadership)
- [Apptronik Careers](https://apptronik.com/careers)
