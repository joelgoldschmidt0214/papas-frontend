// src/app/surveys/[id]/results/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Menubar from "@/components/ui/menubar";
import {
  getSurveyStatistics,
  getSurveyComments,
  type SurveyStatistics,
  type SurveyCommentsResponse,
} from "@/lib/api/surveys";

// --- 型定義 ---
type UserAnswer = {
  choice: "agree" | "disagree";
  comment: string;
};

// ダミーデータを削除して、APIから取得したデータを使用

// --- メインページコンポーネント ---
export default function SurveyResultsPage() {
  const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null);
  const [surveyStats, setSurveyStats] = useState<SurveyStatistics | null>(null);
  const [surveyComments, setSurveyComments] =
    useState<SurveyCommentsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const surveyId = Number(params?.id);
  const pathname = usePathname();

  useEffect(() => {
    // URLから現在のアンケートIDを取得 (例: '/surveys/1/results' -> '1')
    const pathSegments = pathname.split("/");
    const surveyId = pathSegments[pathSegments.length - 2];

    if (surveyId) {
      const allAnswersJSON = sessionStorage.getItem("surveyAnswers");
      if (allAnswersJSON) {
        const allAnswers = JSON.parse(allAnswersJSON);
        // 現在のIDに該当する回答をセット
        setUserAnswer(allAnswers[surveyId] || null);
        // データを読み込んだら、すぐにsessionStorageから削除する
        sessionStorage.removeItem("surveyAnswers");
      }
    }
  }, [pathname]); // pathnameが変わった時に再実行

  useEffect(() => {
    if (surveyId) {
      fetchSurveyData();
    }
  }, [surveyId]);

  const fetchSurveyData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 集計データとコメントデータを並行取得
      const [stats, comments] = await Promise.all([
        getSurveyStatistics(surveyId),
        getSurveyComments(surveyId),
      ]);

      setSurveyStats(stats);
      setSurveyComments(comments);
    } catch (err) {
      console.error("Failed to fetch survey data:", err);
      setError("データの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 割合の計算
  const agreePercentage =
    surveyStats?.choice_statistics?.agree?.percentage || 0;
  const disagreePercentage =
    surveyStats?.choice_statistics?.disagree?.percentage || 0;

  return (
    <div
      className={`
        relative mx-auto flex h-screen w-full max-w-[440px]
        flex-col bg-white
      `}
    >
      {/* --- ヘッダーエリア（スクロール固定） --- */}
      <header className="flex-shrink-0 px-4">
        <div className="pt-12 text-center">
          <p className="text-sm text-gray-600">ご回答ありがとうございます。</p>
          <div className="relative mt-2 inline-flex items-center">
            <Image
              src="/icons/icon_survey_right.svg"
              alt=""
              width={48}
              height={48}
            />
            <h1 className="mx-2 text-2xl font-bold text-text-primary">
              まちに声が届きました
            </h1>
            <Image
              src="/icons/icon_survey_left.svg"
              alt=""
              width={48}
              height={48}
            />
          </div>
        </div>
        <div className="mt-8">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">集計データを読み込み中...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchSurveyData}
                className="mt-2 px-4 py-2 bg-brand-blue text-white rounded"
              >
                再試行
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between px-2 text-3xl font-bold">
                <span className="text-component-accent">
                  {Math.round(agreePercentage)}%
                </span>
                <span className="text-brand-blue">
                  {Math.round(disagreePercentage)}%
                </span>
              </div>
              <div className="mt-2 flex h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-component-accent"
                  style={{ width: `${agreePercentage}%` }}
                ></div>
                <div
                  className="bg-brand-secondary"
                  style={{ width: `${disagreePercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between px-2">
                <span className="text-sm font-bold text-component-accent">
                  賛成
                </span>
                <span className="text-sm font-bold text-brand-blue">反対</span>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  総回答数: {surveyStats?.total_responses || 0}件
                </p>
              </div>
            </>
          )}
        </div>
        <div className="mt-10 mb-4 text-center">
          <h2 className="font-bold text-text-primary">みんなの声</h2>
        </div>
      </header>

      {/* --- みんなの声リスト（スクロール可能エリア） --- */}
      <main className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="space-y-3">
          {userAnswer?.comment && (
            <div
              className={`
                rounded-lg border-2 bg-white p-3
                text-sm text-text-primary shadow
                ${
                  userAnswer.choice === "agree"
                    ? "border-component-accent"
                    : "border-brand-blue"
                }
              `}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold">あなたの声</span>
                <span
                  className={`
                    rounded-full px-2 py-0.5 text-xs font-bold
                    ${
                      userAnswer.choice === "agree"
                        ? "bg-component-accent text-white"
                        : "bg-brand-blue text-white"
                    }
                  `}
                >
                  {userAnswer.choice === "agree" ? "賛成" : "反対"}
                </span>
              </div>
              <p className="leading-relaxed">{userAnswer.comment}</p>
            </div>
          )}

          {surveyComments?.comments.map((comment) => (
            <div
              key={comment.response_id}
              className="rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700"
            >
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`
                    rounded-full px-2 py-0.5 text-xs font-bold
                    ${
                      comment.choice === "agree"
                        ? "bg-component-accent text-white"
                        : "bg-brand-secondary text-brand-blue"
                    }
                  `}
                >
                  {comment.choice === "agree" ? "賛成" : "反対"}
                </span>
                {comment.is_anonymous && (
                  <span className="text-xs text-gray-500">匿名</span>
                )}
              </div>
              <p className="leading-relaxed">{comment.comment}</p>
              <div className="mt-2 text-xs text-gray-400">
                {new Date(comment.submitted_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          )) || []}

          {surveyComments?.comments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>まだコメントがありません</p>
            </div>
          )}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Menubar active="survey" />
      </div>
    </div>
  );
}
