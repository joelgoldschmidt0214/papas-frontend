"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Public assets（パスは実際の環境に合わせてください）
const imgUserIcon = "/images/icon_image_01.png";
const imgPhotoIcon = "/icons/icon_photo.svg";
const imgTextIcon = "/icons/icon_text.svg";

interface BtnPostProps {
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * 修正点1: 「ポスト」ボタンのコンポーネントを修正
 * - `leading-[0]`と複雑な`inset`指定を廃止し、Flexboxでシンプルに中央揃え
 */
function BtnPost({ disabled = false, onClick }: BtnPostProps) {
  // NOTE: `bg-brand-blue` が定義されていない可能性があるため、Tailwind標準の `bg-blue-500` を使用しています。
  //       必要に応じて元のクラス名に戻してください。
  const bgColor = disabled ? "bg-gray-400" : "bg-blue-500";
  
  return (
    <button 
      className={`w-full h-full ${bgColor} rounded-lg flex items-center justify-center text-white font-bold text-sm ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
    "＃おすすめ施設情報",
    "＃お得情報", 
    "＃グルメ",
    "＃子育て",
    "＃イベント",
    "＃デコ活"
  ];

  const handleCancel = () => {
    router.push("/mypage");
  };

  const handlePost = () => {
    if (postText.trim()) {
      // TODO: API呼び出しでpost送信
      console.log("投稿:", postText, "タグ:", selectedTags);
      router.push("/mypage");
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  /**
   * 修正点2: 全体のレイアウトをFlexboxベースに修正
   * - `absolute`での固定配置をやめ、画面サイズに追従できるようにする
   * - これにより、画面下部の謎の白いフレームが解消されます
   */
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ナビゲーションバー */}
      <header className="relative flex-shrink-0 h-[92px] w-full border-b">
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

      {/* メインコンテンツエリア (プロフィールアイコンとテキスト入力) */}
      <main className="flex-grow p-4 flex">
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
          />
        </div>
      </main>

      {/* タグエリア */}
      <footer className="flex-shrink-0 bg-gray-50 border-t">
        {/* ツールバー */}
        <div className="h-12 flex items-center px-4 space-x-10">
          <div className="w-[23px] h-[23px]">
            <Image alt="テキストアイコン" src={imgTextIcon} width={23} height={23} />
          </div>
          <div className="w-6 h-6">
            <Image alt="写真アイコン" src={imgPhotoIcon} width={24} height={24} />
          </div>
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>

        {/* タグセクション */}
        <div className="p-4">
          <p className="text-gray-800 text-sm mb-3">タグ</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                // NOTE: `border-brand-blue` や `bg-brand-blue` を標準カラーに変更しています
                className={`px-3 py-1 rounded-lg border border-blue-500 text-xs transition-colors duration-150
                  ${selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-black'}
                `}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}