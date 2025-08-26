// src/app/surveys/[id]/page.tsx
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Menubar from "@/components/ui/menubar";
import { submitSurveyResponse } from "@/lib/api/surveys";

// --- 型定義 ---
type SurveyDetails = [
  {
    id: number;
    targetAudience: "myTOKYOGAS会員限定" | "一般";
    title: string;
    question: string;
  }
];

// --- ダミーデータ ---
const dummySurveys: SurveyDetails = [
  {
    id: 1,
    targetAudience: "myTOKYOGAS会員限定",
    title: "TOMOSUアプリの体験について",
    question:
      "TOMOSUのようなアプリがあれば、あなたのまちはもっと豊かになると思いますか？",
  },
];

// --- メインページコンポーネント ---
export default function SurveyResponsePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [selectedChoice, setSelectedChoice] = useState<
    "agree" | "disagree" | null
  >(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { id } = use(params);
  const surveyId = Number(id);

  // ★★★ 変更点①: 表示するアンケートデータをdummySurveysから検索 ★★★
  const surveyData = dummySurveys.find((s) => s.id === surveyId);

  // ★★★ 変更点②: handleSubmit関数を全面的に修正 ★★★
  const handleSubmit = async () => {
    if (!selectedChoice) {
      alert("賛成か反対かを選択してください。");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      // 1. APIに回答を送信 (DBへの永続化)
      await submitSurveyResponse(surveyId, selectedChoice, comment);

      // 2. resultsページに渡すための一時的な回答内容を保存
      const answerData = { choice: selectedChoice, comment };
      sessionStorage.setItem("tempUserAnswer", JSON.stringify(answerData));

      // 3. surveysページで使うための「回答済みID」を保存
      const answeredIdsJSON = sessionStorage.getItem("answeredSurveyIds");
      const answeredSurveyIds = answeredIdsJSON
        ? JSON.parse(answeredIdsJSON)
        : [];
      if (!answeredSurveyIds.includes(surveyId)) {
        answeredSurveyIds.push(surveyId);
        sessionStorage.setItem(
          "answeredSurveyIds",
          JSON.stringify(answeredSurveyIds)
        );
      }

      // 4. 結果ページへ遷移
      router.push(`/surveys/${surveyId}/results`);
    } catch (error) {
      console.error("Survey submission error:", error);
      setError("回答の送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!surveyData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>アンケートが見つかりません。</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[440px] flex-col bg-white">
      <header className="flex-shrink-0 bg-brand-blue text-white shadow">
        <div className="flex items-center p-3 h-14">
          <Link href="/surveys" className="p-2">
            <Image
              src="/icons/arrow_left.svg"
              alt="戻る"
              width={24}
              height={24}
              className="invert"
            />
          </Link>
          <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
            まちのアンケート
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-background-primary">
        {/* ★★★ 変更点③: dummySurveyDataをsurveyDataに置き換え ★★★ */}
        <div className="space-y-4 rounded-lg bg-white p-4 border border-gray-200">
          <span className="rounded-full bg-brand-secondary px-2.5 py-1 text-xs font-bold text-brand-blue">
            {surveyData.targetAudience}
          </span>
          <h2 className="text-lg font-bold text-text-primary">
            {surveyData.title}
          </h2>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {surveyData.question} {/* questionからdescriptionに変更 */}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setSelectedChoice("agree")}
              className={`py-3 text-sm font-bold rounded-lg border-2 transition-colors ${
                selectedChoice === "agree"
                  ? "bg-component-accent text-white border-component-accent"
                  : "bg-white text-component-accent border-component-accent"
              }`}
            >
              賛成する
            </button>
            <button
              onClick={() => setSelectedChoice("disagree")}
              className={`py-3 text-sm font-bold rounded-lg border-2 transition-colors ${
                selectedChoice === "disagree"
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-brand-blue border-brand-blue"
              }`}
            >
              反対する
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <label
              htmlFor="comment"
              className="text-sm font-bold text-text-primary"
            >
              あなたの声
            </label>
            <textarea
              id="comment"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              placeholder="ご意見・ご感想をお聞かせください"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full rounded-full bg-brand-blue py-3.5 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            disabled={!selectedChoice || isSubmitting}
          >
            {isSubmitting ? "送信中..." : "声を届ける"}
          </button>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Menubar active="survey" />
      </div>
    </div>
  );
}
