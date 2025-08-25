'use client';

// 必要なモジュールやコンポーネントをインポートします。
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Menubar from "@/components/ui/menubar";

/**
 * フォロワーのユーザー情報の型定義。
 */
type FollowerUser = {
  id: number;
  username: string;
  bio: string | null;
  profileImageUrl: string;
  isFollowing: boolean;
};

/**
 * APIからデータを取得するまでの間、画面に表示するためのダミーデータ。
 */
const dummyFollowersData: FollowerUser[] = [
  {
    id: 1,
    username: 'Username 1',
    bio: '今日はTech0の発表🔥\n緊張するけど頑張ろう！\nみんなの応援よろしく！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
  {
    id: 2,
    username: 'Username 2',
    bio: 'オリジナルTシャツ👕\nデザインが素敵！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
  {
    id: 3,
    username: 'Username 3',
    bio: '子育て奮闘中👶\n日々の成長記録を投稿しています\n同じパパ・ママさん仲良くしてください！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: false,
  },
  {
    id: 4,
    username: 'Username 4',
    bio: '画像生成AIでアート制作中🎨\n新しい表現方法を模索しています',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: false,
  },
  {
    id: 5,
    username: 'Username 5',
    bio: '音楽と映画が大好き🎶\nおすすめあったら教えてください！\nよろしくお願いします！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: false,
  },
];

/**
 * フォロワー一覧ページのメインコンポーネント
 */
const FollowersPage = () => {
  const [followers, setFollowers] = useState<FollowerUser[]>([]);

  useEffect(() => {
    setFollowers(dummyFollowersData);
  }, []);

  const handleFollowToggle = (userId: number) => {
    setFollowers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[440px] flex-col bg-white text-text-primary">
      {/* ヘッダーエリア */}
      <header className="flex-shrink-0 flex items-center justify-between p-2 h-12 bg-white border-b sticky top-0 z-10">
        <Link href="/mypage" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          フォロワー
        </h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* ユーザーリスト */}
        <div className="divide-y divide-gray-100">
          {followers.map((user) => (
            <div key={user.id} className="flex items-center px-4 py-3">
              <div className="w-14 h-14 flex-shrink-0">
                <Image
                  src={user.profileImageUrl}
                  alt={`${user.username}のプロフィール画像`}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="ml-3 flex-grow min-w-0">
                <p className="font-bold text-sm truncate">{user.username}</p>
                {user.bio && (
                  <p className="text-xs text-text-secondary mt-1 truncate">
                    {user.bio}
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => handleFollowToggle(user.id)}
                  className={`flex items-center justify-center w-28 h-8 rounded-full border text-xs font-semibold transition-colors
                    ${
                      user.isFollowing
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-white text-brand-blue border-brand-blue'
                    }
                  `}
                >
                  {user.isFollowing ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>フォロー中</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                      <span>フォローする</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <Menubar active="mypage" />
      </div>
    </div>
  );
};

export default FollowersPage;