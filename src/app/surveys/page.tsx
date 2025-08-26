// src/app/surveys/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Menubar from "@/components/ui/menubar";

// --- 型定義 ---
type Survey = {
  id: number;
  targetAudience: "myTOKYOGAS会員限定" | "一般";
  title: string;
  description: string;
  deadline: string;
  points: number;
  isAnswered: boolean;
};

// --- ダミーデータ ---

const dummySurveys: Survey[] = [
  {
    id: 1,
    targetAudience: "myTOKYOGAS会員限定",
    title: "TOMOSUアプリの体験について",
    description:
      "PAPA'Sが本気で作ったアプリについてあなたの感想を教えてください。",
    deadline: "2025年9月1日",
    points: 100,
    isAnswered: false,
  },
  {
    id: 2,
    targetAudience: "myTOKYOGAS会員限定",
    title: "新しい店舗誘致に関するアンケート",
    description: "開発区画に誘致する店舗として、望ましい業種を教えてください。",
    deadline: "2025年9月6日",
    points: 100,
    isAnswered: true,
  },
  {
    id: 3,
    targetAudience: "一般",
    title: "まちの景観づくりに関するアンケート",
    description: "今後の街並みを整える際に、どの要素を重視して欲しいですか？",
    deadline: "2025年9月4日",
    points: 30,
    isAnswered: true,
  },
  {
    id: 4,
    targetAudience: "一般",
    title: "移動・交通手段に関するアンケート",
    description: "地域内の移動をより便利にするために、どんな課題がありますか？",
    deadline: "2025年9月10日",
    points: 30,
    isAnswered: true,
  },
];

// --- アンケートカードコンポーネント ---
const SurveyCardContent: FC<{ survey: Survey }> = ({ survey }) => {
  const audienceLabelClass =
    survey.targetAudience === "myTOKYOGAS会員限定"
      ? "bg-brand-secondary text-brand-blue"
      : "bg-gray-200 text-text-primary";

  return (
    <div
      className={`
        group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm
        transition-all duration-200 group-hover:shadow-md
        ${survey.isAnswered ? "opacity-70" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-grow pr-4">
          <div className="flex items-center space-x-2">
            <span
              className={`
                rounded-full px-2 py-1 text-xs font-bold
                ${audienceLabelClass}
              `}
            >
              {survey.targetAudience}
            </span>
            {survey.isAnswered && (
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <h3 className="mt-2 font-bold text-text-primary">{survey.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {survey.description}
          </p>
        </div>
        <div className="flex-shrink-0 text-gray-400">
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
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">締め切り {survey.deadline}まで</p>
        <span
          className={`
            rounded-full border border-component-accent bg-white
            px-2 py-0.5 text-xs font-bold text-component-accent
          `}
        >
          パッチョポイント : {survey.points}pt
        </span>
      </div>
    </div>
  );
};

// --- メインページコンポーネント ---
export default function SurveysPage() {
  const [activeTab, setActiveTab] = useState<"all" | "unanswered" | "answered">(
    "all"
  );
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    // 1. sessionStorageから回答済みの全回答データを取得します
    let answeredSurveyIds: number[] = [];
    try {
      // (キー名は'answeredSurveyIds'に統一するのが分かりやすいです)
      const answeredIdsJSON = sessionStorage.getItem("answeredSurveyIds");
      if (answeredIdsJSON) {
        answeredSurveyIds = JSON.parse(answeredIdsJSON);
      }
    } catch (e) {
      console.error(
        "Failed to load answered survey IDs from sessionStorage:",
        e
      );
    }

    // 2. dummySurveys の isAnswered フラグを、sessionStorage の情報で上書きします
    const updatedSurveys = dummySurveys.map((survey) => ({
      ...survey,
      isAnswered: answeredSurveyIds.includes(survey.id),
    }));

    // 3. 状態が更新されたアンケートリストを state にセットします
    setSurveys(updatedSurveys);
  }, []); // この処理はページが最初に読み込まれた時に一度だけ実行されます

  const filteredSurveys = useMemo(() => {
    switch (activeTab) {
      case "unanswered":
        return surveys.filter((survey) => !survey.isAnswered);
      case "answered":
        return surveys.filter((survey) => survey.isAnswered);
      default:
        return surveys;
    }
  }, [activeTab, surveys]);

  // タブボタン用の共通スタイルを変数として定義
  const tabBaseStyle =
    "py-3 text-center text-sm font-semibold transition-colors";
  const activeTabStyle = "border-b-2 border-brand-blue text-brand-blue";
  const inactiveTabStyle = "border-b-2 border-transparent text-text-secondary";

  return (
    <div
      className={`
        relative mx-auto flex h-screen w-full max-w-[440px]
        flex-col bg-background-primary
      `}
    >
      <header className="flex-shrink-0 bg-white shadow-sm">
        <div className="flex items-center justify-between p-2 h-12">
          <Link href="/home" className="p-2">
            <Image
              src="/icons/arrow_left.svg"
              alt="戻る"
              width={24}
              height={24}
            />
          </Link>
          <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
            まちのアンケート
          </h1>
          <div className="w-8"></div>
        </div>
        <nav className="grid grid-cols-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`${tabBaseStyle} ${
              activeTab === "all" ? activeTabStyle : inactiveTabStyle
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setActiveTab("unanswered")}
            className={`${tabBaseStyle} ${
              activeTab === "unanswered" ? activeTabStyle : inactiveTabStyle
            }`}
          >
            未回答
          </button>
          <button
            onClick={() => setActiveTab("answered")}
            className={`${tabBaseStyle} ${
              activeTab === "answered" ? activeTabStyle : inactiveTabStyle
            }`}
          >
            回答済
          </button>
        </nav>
      </header>

      <main className="flex-1 space-y-4 overflow-y-auto p-4">
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey) =>
            survey.isAnswered ? (
              // 回答済みの場合は結果ページへリンク
              <Link
                key={survey.id}
                href={`/surveys/${survey.id}/results`}
                className="block"
              >
                <SurveyCardContent survey={survey} />
              </Link>
            ) : (
              // 未回答の場合は回答ページへリンク
              <Link
                key={survey.id}
                href={`/surveys/${survey.id}`}
                className="block"
              >
                <SurveyCardContent survey={survey} />
              </Link>
            )
          )
        ) : (
          <div className="pt-10 text-center text-gray-500">
            <p>表示するアンケートはありません。</p>
          </div>
        )}
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Menubar active="survey" />
      </div>
    </div>
  );
}
