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
      className={`w-full h-full ${bgColor} ${textColor} rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
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

  const tags = ["＃イベント", "＃グルメ", "＃子育て", "＃お得情報", "＃デコ活"];

  const handleCancel = () => {
    router.push("/timeline");
  };

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        // post_idは既存のIDと重複しないように、一時的に大きな負の数などを使います
        post_id: -Math.floor(Math.random() * 1000),
        content: postText.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // MVP用の固定ユーザー情報を仮で設定します
        author: {
          user_id: 999, // 仮のユーザーID
          username: "username",
          display_name: "デモユーザー",
          profile_image_url: imgUserIcon, // 投稿画面で表示しているアイコン
        },
        images: [],
        // 選択されたタグをPost型に合うように変換します
        tags: selectedTags.map((tag, index) => ({
          tag_id: -(index + 1), // 仮のタグID
          tag_name: tag.replace("＃", ""), // 先頭の「＃」を削除
          posts_count: 1, // 仮の投稿数
        })),
        likes_count: 0,
        comments_count: 0,
        bookmarks_count: 0,
        is_liked: false,
        is_bookmarked: false,
      };
      console.log("投稿:", postText, "タグ:", selectedTags);

      // 2. 作成した投稿オブジェクトをsessionStorageに保存します
      sessionStorage.setItem("newPost", JSON.stringify(newPost));

      // 3. タイムラインページに「投稿完了」を知らせる合図を付けて遷移します
      router.push("/timeline?fromCompose=true");
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ナビゲーションバー */}
      <header className="relative flex-shrink-0 h-[92px] w-full border-b border-gray-200">
        <div className="absolute bottom-0 w-full h-[52px] flex items-center justify-between px-4">
          <button className="text-gray-800 text-base" onClick={handleCancel}>
            キャンセル
          </button>
          <div className="h-[32px] w-20">
            <BtnPost disabled={!postText.trim()} onClick={handlePost} />
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
                  ${
                    selectedTags.includes(tag)
                      ? "bg-brand-blue text-white"
                      : "bg-white text-brand-blue"
                  }
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
