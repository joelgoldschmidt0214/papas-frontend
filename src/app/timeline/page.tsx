// src/app/timeline/page.tsx

"use client"; // タブ切り替えのためにクライアントコンポーネントとしてマーク

import { useState, useEffect } from "react";
import Image from "next/image";

// --- 型定義 ---
// APIのレスポンスに合わせて調整してください
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
  created_at: string; // ISO 8601 形式の文字列
  updated_at: string;
  author: Author;
  images: PostImage[]; // 複数の画像に対応
  tags: Tag[];
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
};

// --- ダミーデータ ---
// API通信失敗時のフォールバック用
const dummyPosts: Post[] = [
  {
    post_id: 1,
    content:
      "豊洲の近くにできた焼肉屋さん美味しかった！今なら500円クーポンあるらしい。",
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

// --- API通信関数 ---
const fetchTimelinePosts = async (
  skip: number = 0,
  limit: number = 20
): Promise<Post[]> => {
  // 環境変数からAPIのベースURLを取得します
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // 環境変数が設定されていない場合のエラーハンドリングを追加
  if (!baseUrl) {
    console.error(
      "API URL is not defined. Please set the NEXT_PUBLIC_API_URL environment variable."
    );
    throw new Error("APIのURLが設定されていません。");
  }

  const response = await fetch(
    `${baseUrl}/api/v1/posts/timeline?skip=${skip}&limit=${limit}`
  );

  if (!response.ok) {
    // エラー時にレスポンス内容を確認できるようにすると、デバッグが楽になります
    const errorBody = await response.text();
    console.error(
      `API request failed with status ${response.status}: ${errorBody}`
    );
    throw new Error("APIからのデータ取得に失敗しました");
  }

  return await response.json();
};

// --- アイコンコンポーネント ---
const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);
const ChatBubbleOvalLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);
const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
    />
  </svg>
);
const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

// --- 投稿カードコンポーネント ---
const PostCard = ({ post }: { post: Post }) => {
  const profileImageUrl =
    post.author.profile_image_url || "/images/default-avatar.png";
  return (
    <div className="bg-white p-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={profileImageUrl}
            alt={post.author.username}
            width={48}
            height={48}
            className="rounded-full object-cover bg-gray-200"
          />
        </div>
        <div className="flex-1">
          <p className="font-bold text-text-primary">
            {post.author.display_name || post.author.username}
          </p>
          <div className="flex flex-wrap gap-2 my-2">
            {post.tags.map((tag) => (
              <span
                key={tag.tag_id}
                className="px-2 py-1 bg-brand-secondary text-brand-blue text-xs font-semibold rounded-full"
              >
                #{tag.tag_name}
              </span>
            ))}
          </div>
          <p className="text-text-primary whitespace-pre-line my-2">
            {post.content}
          </p>
          {post.images && post.images.length > 0 && (
            <div className="mt-3">
              <Image
                src={post.images[0].image_url}
                alt="投稿画像"
                width={300}
                height={200}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}
          <div className="flex items-center space-x-5 text-gray-500 mt-3">
            <div className="flex items-center space-x-1">
              <ChatBubbleOvalLeftIcon />
              <span>{post.comments_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <HeartIcon />
              <span>{post.likes_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookmarkIcon />
              <span>{post.bookmarks_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- タイムラインページ ---
export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState("すべて");
  const tabs = ["すべて", "フォロー", "ご近所さん", "イベント", "グルメ"];

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPosts = await fetchTimelinePosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error(
          "APIからのデータ取得に失敗しました。開発用にダミーデータを表示します。",
          err
        );
        setPosts(dummyPosts); // ダミーデータを代わりにセットする
        // setError("APIサーバーに接続できませんでした。"); // 開発中はエラー表示をオフにしても良い
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filteredPosts = posts;

  if (isLoading) {
    return <div>ローディング中...</div>;
  }
  if (error) {
    return <div>エラーが発生しました: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full bg-background-primary">
      <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-10">
        <h1 className="text-xl font-bold text-text-primary">Timeline</h1>
        <button>
          <BellIcon />
        </button>
      </header>

      <nav className="bg-white border-b sticky top-[73px] z-10">
        <div className="flex space-x-4 px-4 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "text-text-secondary border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      </main>

      <div className="fixed bottom-24 right-5">
        <button className="bg-brand-blue text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-opacity">
          <PencilIcon />
        </button>
      </div>
    </div>
  );
}
