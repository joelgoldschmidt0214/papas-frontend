// src/app/timeline/page.tsx
"use client";

import { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import EngageButton from "@/components/ui/EngageButton";
import MenubarWithCompose from "@/components/ui/MenubarWithCompose";
import { usePosts, Post } from "@/contexts/PostContext";

/* ============ 画像パス ============ */
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

/* ============ ダミーデータ ============ */
// const dummyPosts: Post[] = [
//   {
//     post_id: 1,
//     content:
//       "豊洲の近くにできた焼肉屋さん美味しかった！今なら500円クーポンがあるらしい。",
//     created_at: "2024-05-20T12:00:00Z",
//     updated_at: "2024-05-20T12:00:00Z",
//     author: {
//       user_id: 1,
//       username: "username-1",
//       display_name: "グルメな豊洲民",
//       profile_image_url: "/icons/icon_image_01.svg",
//     },
//     images: [],
//     tags: [
//       { tag_id: 1, tag_name: "お得情報", posts_count: 101 },
//       { tag_id: 2, tag_name: "グルメ", posts_count: 250 },
//     ],
//     likes_count: 12,
//     comments_count: 1,
//     bookmarks_count: 3,
//     is_liked: false,
//     is_bookmarked: true,
//   },
//   {
//     post_id: 2,
//     content:
//       "豊洲のららぽーとに行ってきたよ！雨の日でも楽しめるから子連れに最高✨",
//     created_at: "2024-05-19T18:30:00Z",
//     updated_at: "2024-05-19T18:30:00Z",
//     author: {
//       user_id: 2,
//       username: "username-2",
//       display_name: "豊洲ママ",
//       profile_image_url: "/icons/icon_image_01.svg",
//     },
//     images: [{ image_url: "/images/facility_image.png", display_order: 1 }],
//     tags: [
//       { tag_id: 3, tag_name: "おすすめ施設", posts_count: 88 },
//       { tag_id: 4, tag_name: "子育て", posts_count: 123 },
//     ],
//     likes_count: 32,
//     comments_count: 4,
//     bookmarks_count: 16,
//     is_liked: true,
//     is_bookmarked: false,
//   },
// ];

/* ============ 投稿カード ============ */
function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.is_liked);
  const [bookmarked, setBookmarked] = useState(post.is_bookmarked);
  const onToggleLike = () => setLiked(!liked);
  const onToggleBookmark = () => setBookmarked(!bookmarked);
  const avatar = post.author.profile_image_url || "/icons/icon_image_01.svg";
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
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary truncate">
            {displayName}
          </p>
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
          <p className="my-2 whitespace-pre-line text-sm leading-relaxed text-text-primary">
            {post.content}
          </p>
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
          <div className="mt-3 flex items-center gap-5 text-text-secondary">
            <EngageButton
              iconDefault={ICON.comment}
              iconActive={ICON.comment}
              count={post.comments_count}
              ariaLabel="コメント数"
            />
            <EngageButton
              active={liked}
              onToggle={onToggleLike}
              iconDefault={ICON.like.default}
              iconActive={ICON.like.active}
              count={post.likes_count}
              ariaLabel="いいね"
            />
            <EngageButton
              active={bookmarked}
              onToggle={onToggleBookmark}
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

/* ============ タイムラインページの中身 ============ */
function TimelineContent() {
  const tabs = [
    "すべて",
    "フォロー",
    "ご近所さん",
    "イベント",
    "グルメ",
    "子育て",
    "お得情報",
    "デコ活",
  ] as const;
  type Tab = (typeof tabs)[number];

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as Tab | null;

  const [activeTab, setActiveTab] = useState<Tab>(
    tabFromUrl && tabs.includes(tabFromUrl) ? tabFromUrl : "すべて"
  );

  const { posts, isLoading, error, fetchPosts } = usePosts();
  const navRef = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      fetchPosts();
    }
  }, [posts, isLoading, fetchPosts]);

  useEffect(() => {
    if (navRef.current && activeTabRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const tabRect = activeTabRef.current.getBoundingClientRect();
      const scrollLeft =
        navRef.current.scrollLeft +
        tabRect.left -
        navRect.left -
        navRect.width / 2 +
        tabRect.width / 2;
      navRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  const filteredPosts = useMemo(() => {
    if (activeTab === "すべて") {
      return posts;
    }
    return posts.filter((post) =>
      post.tags.some((tag) => tag.tag_name === activeTab)
    );
  }, [activeTab, posts]);

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[440px] flex-col bg-white">
      <header className="flex-shrink-0">
        <div className="h-6" aria-hidden />
        <div className="flex items-center justify-center">
          <Image src={ICON.logo} alt="TOMOSU" width={40} height={40} />
        </div>
        <div className="my-2" />
        <nav
          ref={navRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <div className="flex items-center px-2">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  ref={active ? activeTabRef : null}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-shrink-0 border-b-2 py-2.5 text-sm font-semibold transition-colors
                    w-1/5 min-w-16 flex justify-center
                    ${
                      active
                        ? "border-brand-primary text-brand-primary"
                        : "border-transparent text-text-secondary"
                    }
                  `}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto">
        {isLoading && posts.length === 0 ? (
          <div className="p-4 text-center text-text-secondary">
            投稿を読み込んでいます...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">エラー: {error}</div>
        ) : filteredPosts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredPosts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-text-secondary">
            このカテゴリの投稿はまだありません。
          </div>
        )}
      </main>
      {/* --- フッター（固定） --- */}
      <footer className="flex-shrink-0">
        <MenubarWithCompose active="timeline" />
      </footer>
    </div>
  );
}

/* ============ タイムラインページ本体（エントリーポイント） ============ */
export default function TimelinePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          読み込み中...
        </div>
      }
    >
      <TimelineContent />
    </Suspense>
  );
}
