// src/app/timeline/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EngageButton from "@/components/ui/EngageButton";
import Menubar from "@/components/ui/menubar";
// ContextからusePostsフックとPost型をインポートします
import { usePosts, Post } from "@/contexts/PostContext";

/* ============ 画像パス（実ファイル名に合わせる） ============ */
const ICON = {
  logo: "/images/app_logo.png",
  compose: "/icons/btn-compose.svg",
  comment: "/icons/comments-duotone.svg",
  like: {
    default: "/icons/engade_heart=default.svg",
    active: "/icons/engade_heart=click.svg",
  },
  bookmark: {
    default: "/icons/engage_bookmark=default.svg",
    active: "/icons/engage_bookmark=click.svg",
  },
};

/* ============ 投稿カード ============ */
function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.is_liked);
  const [bookmarked, setBookmarked] = useState(post.is_bookmarked);

  const avatar = post.author.profile_image_url || "/images/default-avatar.png";
  const displayName = post.author.display_name || post.author.username;
  return (
    <article className="bg-white px-4 py-3">
      <div className="flex items-start gap-3">
        <Image
          src={avatar}
          alt={displayName}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover bg-gray-200"
        />
        <div className="flex-1">
          <p className="text-[14px] font-bold text-text-primary">
            {displayName}
          </p>

          {/* タグ */}
          <div className="mt-1.5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t.tag_id}
                className="rounded-full bg-brand-secondary px-2 py-0.5 text-[11px] font-semibold text-brand-blue"
              >
                #{t.tag_name}
              </span>
            ))}
          </div>

          {/* 本文 */}
          <p className="my-2 whitespace-pre-line text-[14px] leading-relaxed text-text-primary">
            {post.content}
          </p>

          {/* 画像（1枚想定） */}
          {post.images?.length > 0 && (
            <div className="mt-2 overflow-hidden rounded-lg">
              <Image
                src={post.images[0].image_url}
                alt="投稿画像"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* エンゲージメント（数値は固定） */}
          <div className="mt-3 flex items-center gap-5 text-text-secondary">
            <EngageButton
              iconDefault={ICON.comment}
              iconActive={ICON.comment}
              count={post.comments_count}
              ariaLabel="コメント数"
            />
            <EngageButton
              iconDefault={ICON.like.default}
              iconActive={ICON.like.active}
              count={post.likes_count}
              ariaLabel="いいね"
            />
            <EngageButton
              iconDefault={ICON.bookmark.default}
              iconActive={ICON.bookmark.active}
              count={post.bookmarks_count}
              ariaLabel="ブックマーク"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============ タイムラインページ本体 ============ */
export default function TimelinePage() {
  const tabs = [
    "すべて",
    "フォロー",
    "ご近所さん",
    "イベント",
    "グルメ",
  ] as const;
  type Tab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<Tab>("すべて");

  const { posts, isLoading, error, fetchPosts } = usePosts();

  // このコンポーネントが表示された時に、もし投稿データが空っぽなら取得処理を実行する
  useEffect(() => {
    // データがなく、かつ現在ローディング中でもない場合に実行
    if (posts.length === 0 && !isLoading) {
      console.log("Timeline data is empty, fetching now...");
      fetchPosts();
    }
  }, [posts, isLoading, fetchPosts]); // これらの値が変わった時に再評価する

  const filtered = posts;

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        ローディング中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        エラーが発生しました: {error}
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white">
      {/* 上余白（約40px） */}
      <div className="h-10" aria-hidden />

      {/* 中央ロゴ（40px） */}
      <div className="flex items-center justify-center">
        <Image src={ICON.logo} alt="TOMOSU" width={40} height={40} />
      </div>
      {/* ロゴ下の全幅の線 */}
      <div className="my-3 h-[0.5px] w-full bg-black/10" />

      {/* タブ（5分割・タブ下のグレー線なし、アクティブのみ下線） */}
      <nav className="sticky top-0 z-10 bg-white">
        {/* ★ 親ラッパーの className は固定（Hydration対策） */}
        <div className="grid w-full grid-cols-5">
          {tabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex h-11 w-full items-center justify-center text-[12px] font-semibold ${
                  active ? "text-brand-primary" : "text-text-secondary"
                }`}
              >
                {tab}
                {active && (
                  <span className="pointer-events-none absolute bottom-0 left-0 block h-[2px] w-full bg-brand-primary" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
      {/* 投稿一覧 */}
      <main className="flex-1">
        <div className="divide-y divide-gray-200/70">
          {filtered.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      </main>

      {/* 投稿ボタン（apphome と同じ仕様） */}
      <button
        type="button"
        aria-label="投稿する"
        className="fixed bottom-24 right-5 inline-flex size-14 items-center justify-center rounded-full bg-brand-blue shadow-md"
      >
        <Image src={ICON.compose} alt="" width={32} height={32} />
      </button>

      {/* 共通フッター */}
      <Menubar active="timeline" />
    </div>
  );
}
