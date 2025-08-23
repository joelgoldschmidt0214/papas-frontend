// src/app/timeline/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EngageButton from "@/components/ui/EngageButton";
import Menubar from "@/components/ui/menubar";

/* ================== 型 ================== */
type Author = {
  user_id: number;
  username: string;
  display_name: string | null;
  profile_image_url: string | null;
};

type Tag = {
  tag_id: number;
  tag_name: string;
  posts_count: number;
};

type PostImage = {
  image_url: string;
  display_order: number;
};

type Post = {
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  author: Author;
  images: PostImage[];
  tags: Tag[];
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
};

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

/* ============ ダミーデータ（フォールバック用） ============ */
const dummyPosts: Post[] = [
  {
    post_id: 1,
    content:
      "豊洲の近くにできた焼肉屋さん美味しかった！今なら500円クーポンがあるらしい。",
    created_at: "2024-05-20T12:00:00Z",
    updated_at: "2024-05-20T12:00:00Z",
    author: {
      user_id: 1,
      username: "username-1",
      display_name: "グルメな豊洲民",
      profile_image_url: "/images/default-avatar.png",
    },
    images: [],
    tags: [
      { tag_id: 1, tag_name: "お得情報", posts_count: 101 },
      { tag_id: 2, tag_name: "グルメ", posts_count: 250 },
    ],
    likes_count: 12,
    comments_count: 1,
    bookmarks_count: 3,
    is_liked: false,
    is_bookmarked: true,
  },
  {
    post_id: 2,
    content:
      "豊洲のららぽーとに行ってきたよ！雨の日でも楽しめるから子連れに最高✨ 広々としたキッズスペースで、子どもたちは大はしゃぎ！おむつ替えスペースや授乳室も完備されてて、ママパパにも優しい設計でした😊",
    created_at: "2024-05-19T18:30:00Z",
    updated_at: "2024-05-19T18:30:00Z",
    author: {
      user_id: 2,
      username: "username-2",
      display_name: "豊洲ママ",
      profile_image_url: "/images/default-avatar.png",
    },
    images: [{ image_url: "/images/kids-space.jpg", display_order: 1 }],
    tags: [
      { tag_id: 3, tag_name: "おすすめ施設", posts_count: 88 },
      { tag_id: 4, tag_name: "子育て", posts_count: 123 },
    ],
    likes_count: 32,
    comments_count: 4,
    bookmarks_count: 16,
    is_liked: true,
    is_bookmarked: false,
  },
];

/* ============ API（必要時に利用） ============ */
const fetchTimelinePosts = async (skip = 0, limit = 20): Promise<Post[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL が未設定です。");
  const res = await fetch(
    `${baseUrl}/api/v1/posts/timeline?skip=${skip}&limit=${limit}`
  );
  if (!res.ok) throw new Error("API取得に失敗しました");
  return res.json();
};

/* ============ 投稿カード ============ */
function PostCard({ post }: { post: Post }) {
  // 見た目のみ切り替え（数値は固定のまま）
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
          <p className="text-[14px] font-bold text-text-primary">{displayName}</p>

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
  const tabs = ["すべて", "フォロー", "ご近所さん", "イベント", "グルメ"] as const;
  type Tab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<Tab>("すべて");

  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // API有効化する場合はコメントアウト外す
    // (SSR/CSR差分を避けるため、親ラッパーの className は固定文字列のまま)
    // const run = async () => {
    //   try {
    //     setIsLoading(true);
    //     const data = await fetchTimelinePosts().catch(() => dummyPosts);
    //     setPosts(data ?? dummyPosts);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // run();
  }, []);

  const filtered = posts;

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
        {isLoading ? (
          <div className="p-4 text-text-secondary">読み込み中…</div>
        ) : (
          <div className="divide-y divide-gray-200/70">
            {filtered.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        )}
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
