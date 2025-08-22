// pages/surveys/page.tsx

// 'use client' は、このコンポーネントがクライアントサイドで動作することを示します。
// useStateやuseEffectなどのReactフックを使用するために必要です。
"use client";

import { useState, useMemo, useEffect } from "react";
import type { FC } from "react";

// --- 型定義 ---
// APIから取得するアンケートデータの型を定義します。
// バックエンドの仕様（er_2025-08-19.md や API_USAGE_EXAMPLES.md）と整合性を取ることが重要です。
// isAnsweredは、このユーザーがそのアンケートに回答済みかどうかを示すフラグです。
// 本番環境では、APIから取得するデータにこの情報を含める必要があります。
type Survey = {
  id: number;
  targetAudience: "myTOKYOGAS会員限定" | "一般";
  title: string;
  description: string;
  deadline: string;
  points: number;
  isAnswered: boolean; // ユーザーが回答済みかどうかのフラグ
};

// --- ダミーデータ ---
// APIが完成するまでの仮のデータです。
// スクリーンショットに表示されている情報を元に作成しています。
const dummySurveys: Survey[] = [
  {
    id: 1,
    targetAudience: "myTOKYOGAS会員限定",
    title: "子育て交流イベントに関するアンケート",
    description: "子育てをサポートするイベントで参加したいものを教えてください。",
    deadline: "2025年9月1日",
    points: 100,
    isAnswered: true, // このユーザーは回答済み
  },
  {
    id: 2,
    targetAudience: "myTOKYOGAS会員限定",
    title: "新しい店舗誘致に関するアンケート",
    description: "開発区画に誘致する店舗として、望ましい業種を教えてください。",
    deadline: "2025年9月6日",
    points: 100,
    isAnswered: false, // このユーザーは未回答
  },
  {
    id: 3,
    targetAudience: "一般",
    title: "まちの景観づくりに関するアンケート",
    description: "今後の街並みを整える際に、どの要素を重視して欲しいですか？",
    deadline: "2025年9月4日",
    points: 30,
    isAnswered: false, // このユーザーは未回答
  },
  {
    id: 4,
    targetAudience: "一般",
    title: "移動・交通手段に関するアンケート",
    description: "地域ないの移動をより便利にするために、どんな課題がありますか？",
    deadline: "2025年9月10日",
    points: 30,
    isAnswered: false, // このユーザーは未回答
  },
];

// --- アンケートカードコンポーネント ---
// 個々のアンケート情報をカード形式で表示するためのコンポーネントです。
const SurveyCard: FC<{ survey: Survey }> = ({ survey }) => {
  // アンケートの対象者によってラベルのスタイルを変更します。
  const audienceLabelClass =
    survey.targetAudience === "myTOKYOGAS会員限定"
      ? "bg-brand-secondary text-brand-blue" // tailwind.config.tsで定義したカスタムカラー
      : "bg-gray-200 text-text-primary";

  return (
    // 本番ではLinkコンポーネントなどを使用してアンケート詳細ページへ遷移させます。
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          {/* 対象者ラベル */}
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${audienceLabelClass}`}
          >
            {survey.targetAudience}
          </span>
          {/* アンケートタイトル */}
          <h3 className="font-bold text-text-primary mt-2">{survey.title}</h3>
          {/* アンケート説明文 */}
          <p className="text-sm text-gray-600 mt-1">{survey.description}</p>
        </div>
        {/* 遷移を示す矢印アイコン */}
        <div className="flex-shrink-0 ml-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* 締め切り */}
        <p className="text-xs text-gray-500">締め切り {survey.deadline}まで</p>
        {/* ポイント */}
        <span className="text-sm font-bold text-component-pink bg-pink-100 px-3 py-1 rounded-full">
          パッチョポイント : {survey.points}pt
        </span>
      </div>
    </div>
  );
};

// --- メインページコンポーネント ---
export default function SurveysPage() {
  // 現在選択されているタブ（すべて, 未回答, 回答済）の状態を管理します。
  const [activeTab, setActiveTab] = useState<"all" | "unanswered" | "answered">("all");
  
  // アンケートデータのリストを状態として管理します。
  // API連携時には、このstateにAPIから取得したデータが格納されます。
  const [surveys, setSurveys] = useState<Survey[]>([]);

  // --- データ取得処理 ---
  // useEffectは、コンポーネントがマウントされた後に一度だけ実行されます。
  // ここでAPIからデータを取得し、surveysステートを更新するのが一般的な実装です。
  useEffect(() => {
    // TODO: バックエンド担当者の方へ
    // 以下の部分は、実際のAPIからデータを取得する処理に置き換えてください。
    // APIクライアント(src/lib/apiClient.tsなど)を使って /api/v1/surveys エンドポイントからデータを取得します。
    // APIレスポンスには、各アンケートが現在のユーザーにとって回答済みかどうかの情報(`isAnswered`のようなフラグ)を含める必要があります。
    
    // 例:
    // const fetchSurveys = async () => {
    //   try {
    //     const fetchedData = await apiClient.get<Survey[]>('/surveys');
    //     setSurveys(fetchedData);
    //   } catch (error) {
    //     console.error("アンケートの取得に失敗しました:", error);
    //     // ここでエラーハンドリングUI（例: トースト表示）を実装
    //   }
    // };
    // fetchSurveys();

    // 今回はダミーデータをセットします。
    setSurveys(dummySurveys);
  }, []); // 空の依存配列は、このeffectが初回レンダリング後に一度だけ実行されることを意味します。


  // --- 表示データのフィルタリング ---
  // useMemoを使うことで、activeTabまたはsurveysが変更された場合にのみフィルタリング処理が再実行されます。
  // これにより、不要な再計算を防ぎ、パフォーマンスを最適化します。
  const filteredSurveys = useMemo(() => {
    switch (activeTab) {
      case "unanswered":
        return surveys.filter((survey) => !survey.isAnswered);
      case "answered":
        return surveys.filter((survey) => survey.isAnswered);
      case "all":
      default:
        return surveys;
    }
  }, [activeTab, surveys]);

  // タブの共通スタイル
  const tabBaseStyle = "pb-2 px-4 text-center text-sm font-semibold cursor-pointer";
  // アクティブなタブのスタイル
  const activeTabStyle = "border-b-2 border-brand-primary text-brand-primary";
  // 非アクティブなタブのスタイル
  const inactiveTabStyle = "border-b-2 border-transparent text-text-secondary hover:text-brand-primary";

  return (
    // 【修正点①】
    // h-full から h-screen に変更。
    // コンポーネント全体の高さをビューポート（画面表示領域）の高さに固定します。
    // これにより、中の要素でflex-growやoverflow-y-autoが意図通りに機能し、
    // 画面内でスクロールが完結するようになります。
    <div className="flex flex-col h-screen w-full bg-background-primary">
      
      {/* --- ヘッダーとタブ（固定エリア） --- */}
      {/* 
        【修正点②】
        ヘッダーとタブをdivで囲み、以下のクラスを適用して固定表示を実現します。
        - sticky: スクロール時に親要素内で特定の位置に留まるようにします。
        - top-0: 親要素の最上部に固定します。
        - z-10: 他の要素より手前に表示されるように重なり順を指定します。
        - bg-white: スクロールしたコンテンツが透けないように背景色を指定します。
      */}
      <div className="sticky top-0 z-10 bg-white">
        {/* ヘッダーエリア */}
        <header className="w-full text-center py-4 border-b">
          <h1 className="text-lg font-bold text-text-primary">まちのアンケート</h1>
        </header>

        {/* タブナビゲーション */}
        <nav className="grid grid-cols-3 shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`${tabBaseStyle} ${activeTab === 'all' ? activeTabStyle : inactiveTabStyle}`}
          >
            すべて
          </button>
          <button
            onClick={() => setActiveTab("unanswered")}
            className={`${tabBaseStyle} ${activeTab === 'unanswered' ? activeTabStyle : inactiveTabStyle}`}
          >
            未回答
          </button>
          <button
            onClick={() => setActiveTab("answered")}
            className={`${tabBaseStyle} ${activeTab === 'answered' ? activeTabStyle : inactiveTabStyle}`}
          >
            回答済
          </button>
        </nav>
      </div>

      {/* --- アンケートリストエリア（スクロール可能エリア） --- */}
      {/* 
        このmainエリアが、固定されたヘッダーの下の残りのスペースをすべて使い、
        コンテンツが多すぎてはみ出した場合にのみ、縦方向にスクロールします。
        - flex-grow: 親要素の残りのスペースを埋めるように伸長
        - overflow-y-auto: コンテンツがはみ出した場合に縦方向のスクロールバーを表示
      */}
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} />
          ))
        ) : (
          // 表示するアンケートがない場合のメッセージ
          <div className="text-center text-gray-500 pt-10">
            <p>表示するアンケートはありません。</p>
          </div>
        )}
      </main>
      
      {/* フッターは指定通り、ここでは含めません。 */}
      {/* RootLayoutまたは他のレイアウトコンポーネントで共通のフッターが挿入されることを想定しています。 */}
    </div>
  );
}