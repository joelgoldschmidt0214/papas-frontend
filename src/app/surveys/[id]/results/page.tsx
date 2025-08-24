// src/app/surveys/[id]/results/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Menubar from "@/components/ui/menubar";

// --- 型定義 ---
type UserAnswer = {
  choice: 'agree' | 'disagree';
  comment: string;
}

type OtherComment = {
  id: number;
  choice: 'agree' | 'disagree';
  comment: string;
};

const dummyOtherComments: OtherComment[] = [
  { id: 1, choice: 'agree', comment: "ちょっとお金かかっても、安心して子どもを連れて行ける場所ならアリだと思う！" },
  { id: 2, choice: 'agree', comment: "無料だと人が多すぎて落ち着かないし…有料のほうがゆったり使えそう😊" },
  { id: 3, choice: 'disagree', comment: "子育てってお金かかるから…交流スペースくらいは無料で気軽に行ける場所にしてほしい！" },
  { id: 4, choice: 'agree', comment: "お金払った分、サービスもちゃんとしてるなら納得かな！" },
  { id: 5, choice: 'agree', comment: "ちょっと有料でも、子どもの遊び場がキレイで安全なら安心して通える✨" },
  { id: 6, choice: 'disagree', comment: "せっかく交流の場なのに、お金の心配があると行きづらいと思うなあ" },
];

// --- メインページコンポーネント ---
export default function SurveyResultsPage() {
  const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null);

  useEffect(() => {
    const savedAnswer = sessionStorage.getItem('surveyAnswer');
    if (savedAnswer) {
      setUserAnswer(JSON.parse(savedAnswer));
      sessionStorage.removeItem('surveyAnswer');
    }
  }, []);

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
            <Image src="/icons/icon_survey_right.svg" alt="" width={48} height={48} />
            <h1 className="mx-2 text-2xl font-bold text-text-primary">まちに声が届きました</h1>
            <Image src="/icons/icon_survey_left.svg" alt="" width={48} height={48} />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between px-2 text-3xl font-bold">
            <span className="text-component-accent">82%</span>
            <span className="text-brand-blue">18%</span>
          </div>
          <div className="mt-2 flex h-4 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="bg-component-accent" style={{ width: '82%' }}></div>
            <div className="bg-brand-secondary" style={{ width: '18%' }}></div>
          </div>
          <div className="mt-2 flex justify-between px-2">
            <span className="text-sm font-bold text-component-accent">賛成</span>
            <span className="text-sm font-bold text-brand-blue">反対</span>
          </div>
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
                ${userAnswer.choice === 'agree' ? 'border-component-accent' : 'border-brand-blue'}
              `}
            >
               <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold">あなたの声</span>
                <span
                  className={`
                    rounded-full px-2 py-0.5 text-xs font-bold
                    ${userAnswer.choice === 'agree' ? 'bg-component-accent text-white' : 'bg-brand-blue text-white'}
                  `}
                >
                  {userAnswer.choice === 'agree' ? '賛成' : '反対'}
                </span>
               </div>
              <p className="leading-relaxed">{userAnswer.comment}</p>
            </div>
          )}
          
          {dummyOtherComments.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700"
            >
              <div className="flex items-center space-x-2 mb-2">
                  <span
                   className={`
                     rounded-full px-2 py-0.5 text-xs font-bold
                     ${item.choice === 'agree' ? 'bg-component-accent text-white' : 'bg-brand-secondary text-brand-blue'}
                   `}
                 >
                   {item.choice === 'agree' ? '賛成' : '反対'}
                 </span>
              </div>
              <p className="leading-relaxed">{item.comment}</p>
            </div>
          ))}
        </div>
      </main>
      
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Menubar active="survey" />
      </div>
    </div>
  );
}