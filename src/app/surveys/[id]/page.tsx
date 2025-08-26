// src/app/surveys/[id]/page.tsx
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Menubar from "@/components/ui/menubar";

// --- 型定義 ---
type SurveyDetails = {
  id: number;
  targetAudience: "myTOKYOGAS会員限定" | "一般";
  title: string;
  question: string;
};

// --- ダミーデータ ---
const dummySurveyData: SurveyDetails = {
  id: 1,
  targetAudience: "myTOKYOGAS会員限定",
  title: "子育て交流スペースに関するアンケート",
  question:
    "子育て交流スペースで無料で使える場所より、一部有料でも質の高いサービスがある場所を優先すべきだと思いますか。",
};

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
  const router = useRouter();

  const { id } = use(params);

  const handleSubmit = () => {
    if (!selectedChoice) {
      alert("賛成か反対かを選択してください。");
      return;
    }

    try {
      // 1. sessionStorageから現在の全回答データを取得
      const allAnswersJSON = sessionStorage.getItem("surveyAnswers");
      const allAnswers = allAnswersJSON ? JSON.parse(allAnswersJSON) : {};

      // 2. 今回の回答データを作成
      const newAnswer = {
        choice: selectedChoice,
        comment: comment,
      };

      // 3. 全回答データに今回の回答を追加（または上書き）
      allAnswers[id] = newAnswer;

      // 4. 更新した全回答データをsessionStorageに保存し直す
      sessionStorage.setItem("surveyAnswers", JSON.stringify(allAnswers));
    } catch (e) {
      console.error("Failed to save survey answer to sessionStorage:", e);
    }
    router.push(`/surveys/${id}/results`);
  };

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
        <div className="space-y-4 rounded-lg bg-white p-4 border border-gray-200">
          <span className="rounded-full bg-brand-secondary px-2.5 py-1 text-xs font-bold text-brand-blue">
            {dummySurveyData.targetAudience}
          </span>
          <h2 className="text-lg font-bold text-text-primary">
            {dummySurveyData.title}
          </h2>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {dummySurveyData.question}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setSelectedChoice("agree")}
              className={`py-3 text-sm font-bold rounded-lg border-2 transition-colors
                ${
                  selectedChoice === "agree"
                    ? "bg-component-accent text-white border-component-accent"
                    : "bg-white text-component-accent border-component-accent"
                }
              `}
            >
              賛成する
            </button>
            <button
              onClick={() => setSelectedChoice("disagree")}
              className={`py-3 text-sm font-bold rounded-lg border-2 transition-colors
                ${
                  selectedChoice === "disagree"
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "bg-white text-brand-blue border-brand-blue"
                }
              `}
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

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full rounded-full bg-brand-blue py-3.5 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            disabled={!selectedChoice}
          >
            声を届ける
          </button>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Menubar active="survey" />
      </div>
    </div>
  );
}
