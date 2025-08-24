"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Public assets（パスは実際の環境に合わせてください）
const imgUserIcon = "/icons/icon_image_01.svg";

interface BtnPostProps {
  disabled?: boolean;
  onClick?: () => void;
}

function BtnPost({ disabled = false, onClick }: BtnPostProps) {
  const bgColor = disabled ? "bg-gray-300" : "bg-brand-blue";
  const textColor = disabled ? "text-text-primary" : "text-white";

  return (
    <button 
      className={`w-full h-full ${bgColor} ${textColor} rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      ポスト
    </button>
  );
}

export default function Compose() {
  const router = useRouter();
  const [postText, setPostText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    "＃イベント",
    "＃グルメ",
    "＃子育て",
    "＃お得情報",
    "＃デコ活"
  ];

  const handleCancel = () => {
    router.push("/timeline");
  };

  const handlePost = () => {
    if (postText.trim()) {
      console.log("投稿:", postText, "タグ:", selectedTags);
      router.push("/timeline");
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ナビゲーションバー */}
      <header className="relative flex-shrink-0 h-[92px] w-full border-b border-gray-200">
        <div className="absolute bottom-0 w-full h-[52px] flex items-center justify-between px-4">
          <button 
            className="text-gray-800 text-base"
            onClick={handleCancel}
          >
            キャンセル
          </button>
          <div className="h-[32px] w-20">
            <BtnPost 
              disabled={!postText.trim()} 
              onClick={handlePost}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col bg-background-primary">
        <div className="h-64 p-4 flex bg-white">
          <div className="flex-shrink-0 w-[36px] h-[36px]">
            <Image 
              alt="プロフィール画像" 
              src={imgUserIcon} 
              width={36} 
              height={36} 
              className="rounded-full object-cover"
            />
          </div>
          <div className="ml-4 flex-grow">
            <textarea
              className="w-full h-full text-base tracking-wide bg-transparent border-none outline-none resize-none placeholder-gray-400"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="いまなにしてる？"
              autoFocus
              maxLength={140}
            />
          </div>
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <p className="text-gray-800 text-sm mb-3">タグ</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full border border-brand-blue text-xs transition-colors duration-150
                  ${selectedTags.includes(tag)
                    ? 'bg-brand-blue text-white'
                    : 'bg-white text-brand-blue'}
                `}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}