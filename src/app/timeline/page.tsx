// src/app/timeline/page.tsx

"use client"; // タブ切り替えのためにクライアントコンポーネントとしてマーク

import { useState } from 'react';
import Image from 'next/image';

// --- 型定義 ---
// APIのレスポンスに合わせて調整してください
type Author = {
  username: string;
  profile_image_url: string;
};

type Tag = {
  tag_name: string;
};

type Post = {
  post_id: number;
  author: Author;
  tags: Tag[];
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  // ブックマーク数を仮で追加
  bookmarks_count: number; 
};

// --- ダミーデータ ---
// API連携時には、この部分をAPIから取得したデータに置き換えます
const dummyPosts: Post[] = [
  {
    post_id: 1,
    author: {
      username: 'username-1',
      profile_image_url: '/images/default-avatar.png', // public/images/に配置したデフォルトアバター
    },
    tags: [{ tag_name: 'お得情報' }, { tag_name: 'グルメ' }],
    content: '豊洲の近くにできた焼肉屋さん美味しかった！今なら500円クーポンあるらしい。',
    likes_count: 12,
    comments_count: 1,
    bookmarks_count: 3,
  },
  {
    post_id: 2,
    author: {
      username: 'username-2',
      profile_image_url: '/images/default-avatar.png',
    },
    tags: [{ tag_name: 'おすすめ施設' }, { tag_name: '子育て' }],
    content:
      '豊洲のららぽーとに行ってきたよ！雨の日でも楽しめるから子連れに最高✨ 広々としたキッズスペースで、子どもたちは大はしゃぎ！おむつ替えスペースや授乳室も完備されてて、ママパパにも優しい設計でした😊',
    image_url: '/images/kids-space.jpg', // public/images/に配置した画像
    likes_count: 32,
    comments_count: 4,
    bookmarks_count: 16,
  },
  {
    post_id: 3,
    author: {
      username: 'username-3',
      profile_image_url: '/images/default-avatar.png',
    },
    tags: [{ tag_name: 'イベント' }],
    content:
      '9月6日（土）、豊洲ぐるり公園にて「地域交流マルシェ2025」を開催いたします。\n新鮮な地元野菜や特産品の販売、ステージパフォーマンス、体験コーナーなど、幅広い世代の方にお楽しみいただける催しをご用意しております😊',
    likes_count: 88,
    comments_count: 12,
    bookmarks_count: 25,
  },
];

// --- アイコンコンポーネント ---
// SVGアイコンは別途コンポーネント化すると管理しやすくなります

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const ChatBubbleOvalLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);


// --- 投稿カードコンポーネント ---
const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white p-4">
      <div className="flex items-start space-x-3">
        {/* ユーザーアイコン */}
        <div className="flex-shrink-0">
          <Image
            src={post.author.profile_image_url}
            alt={post.author.username}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          {/* ユーザー名 */}
          <p className="font-bold text-text-primary">{post.author.username}</p>
          
          {/* タグ */}
          <div className="flex flex-wrap gap-2 my-2">
            {post.tags.map((tag) => (
              <span key={tag.tag_name} className="px-2 py-1 bg-brand-secondary text-brand-blue text-xs font-semibold rounded-full">
                #{tag.tag_name}
              </span>
            ))}
          </div>
          
          {/* 投稿内容 */}
          <p className="text-text-primary whitespace-pre-line my-2">{post.content}</p>

          {/* 投稿画像 */}
          {post.image_url && (
            <div className="mt-3">
              <Image
                src={post.image_url}
                alt="投稿画像"
                width={300}
                height={200}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}

          {/* リアクション */}
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
  const [activeTab, setActiveTab] = useState('すべて');
  const tabs = ['すべて', 'フォロー', 'ご近所さん', 'イベント', 'グルメ'];

  // TODO: activeTabに応じて表示する投稿をフィルタリングするロジックをここに追加
  const filteredPosts = dummyPosts;

  return (
    <div className="flex flex-col h-full bg-background-primary">
      {/* 1. ヘッダー */}
      <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-10">
        <h1 className="text-xl font-bold text-text-primary">Timeline</h1>
        <button>
          <BellIcon />
        </button>
      </header>

      {/* 2. タブバー */}
      <nav className="bg-white border-b sticky top-[73px] z-10">
        <div className="flex space-x-4 px-4 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-brand-primary text-brand-primary'
                  : 'text-text-secondary border-b-2 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. 投稿リスト */}
      <main className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      </main>

      {/* 4. 新規投稿ボタン */}
      <div className="fixed bottom-24 right-5">
        <button className="bg-brand-blue text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-opacity">
          <PencilIcon />
        </button>
      </div>

      {/* 5. フッターナビゲーション */}
      {/* フッターは後ほどコンポーネント化するとのことなので、このセクションは実装しません */}
    </div>
  );
}