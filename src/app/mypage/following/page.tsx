// ページコンポーネント内で状態管理(useState)やイベントハンドリング(onClickなど)を行うため、
// 'use client' ディレクティブをファイルの先頭に記述します。これにより、このコンポーネントはクライアントサイドでレンダリングされます。
'use client';

// 必要なモジュールやコンポーネントをインポートします。
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * フォローしているユーザー情報の型定義。
 */
type FollowedUser = {
  id: number;
  username: string;
  bio: string | null;
  profileImageUrl: string;
  isFollowing: boolean;
};

/**
 * APIからデータを取得するまでの間、画面に表示するためのダミーデータ。
 */
const dummyFollowingData: FollowedUser[] = [
  {
    id: 1,
    username: 'Username 1',
    bio: '自己紹介文が入ります。よろしくお願いします。',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
  {
    id: 2,
    username: 'Username 2',
    bio: '美味しいものが好きです。',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
  {
    id: 3,
    username: 'Username 3',
    bio: null, // 自己紹介がないユーザー
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
  {
    id: 4,
    username: 'Username 4',
    bio: '地域のイベント情報を発信しています！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
  {
    id: 5,
    username: 'Username 5',
    bio: 'よろしくお願いします。',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true,
  },
];

/**
 * フォロー一覧ページのメインコンポーネント
 */
const FollowingPage = () => {
  const [followingUsers, setFollowingUsers] = useState<FollowedUser[]>([]);

  useEffect(() => {
    // 今回はAPIがないため、代わりにダミーデータをstateにセットします。
    setFollowingUsers(dummyFollowingData);
  }, []);

  const handleFollowToggle = (userId: number) => {
    // フロントエンドの表示を先に切り替える例：
    setFollowingUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white text-text-primary">
      {/* ヘッダーエリア */}
      <header className="flex items-center justify-between p-2 h-12 bg-white border-b sticky top-0 z-10">
        <Link href="/mypage/profile" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          フォロー
        </h1>
        <div className="w-8"></div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-grow overflow-y-auto">
        {/* ユーザーリスト */}
        <div className="divide-y divide-gray-100">
          {followingUsers.map((user) => (
            <div key={user.id} className="flex items-center px-4 py-3">
              {/* プロフィール画像 */}
              <div className="w-14 h-14 flex-shrink-0">
                <Image
                  src={user.profileImageUrl}
                  alt={`${user.username}のプロフィール画像`}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              </div>

              {/* ユーザー名と自己紹介 */}
              <div className="ml-3 flex-grow min-w-0">
                <p className="font-bold text-sm truncate">{user.username}</p>
                {user.bio && (
                  <p className="text-xs text-text-secondary mt-1 truncate">
                    {user.bio}
                  </p>
                )}
              </div>

              {/* フォロー/フォロー中ボタン（followersページと同一アイコン・スタイル） */}
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => handleFollowToggle(user.id)}
                  className={`flex items-center justify-center w-28 h-8 rounded-full border text-xs font-semibold transition-colors
                    ${
                      user.isFollowing
                        ? 'bg-brand-blue text-white border-brand-blue' // 「フォロー中」青背景＋白文字＋青枠
                        : 'bg-white text-brand-blue border-brand-blue' // 「フォローする」白背景＋青文字＋青枠
                    }
                  `}
                >
                  {user.isFollowing ? (
                    <>
                      {/* フォロー中を示すチェックマークアイコン */}
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>フォロー中</span>
                    </>
                  ) : (
                    <>
                      {/* フォローするを示す人型アイコン */}
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
    </div>
  );
};

export default FollowingPage;