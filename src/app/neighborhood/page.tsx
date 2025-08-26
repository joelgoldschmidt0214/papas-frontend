'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Menubar from "@/components/ui/menubar";

/**
 * ご近所さんのユーザー情報の型定義。
 */
type NeighborhoodUser = {
  id: number;
  username: string;
  bio: string | null;
  profileImageUrl: string;
  isNeighborhood: boolean;
};

/**
 * APIからデータを取得するまでの間、画面に表示するためのダミーデータ。
 */
const dummyNeighborhoodData: NeighborhoodUser[] = [
  {
    id: 1,
    username: 'みなとママ',
    bio: '豊洲ぐるり公園で朝ランしてます。門仲のパン屋情報ください！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isNeighborhood: true,
  },
  {
    id: 2,
    username: 'かふぇ好きあや',
    bio: '門前仲町のカフェ巡りが趣味。清澄白河まで自転車でふらっと行きます。',
    profileImageUrl: '/icons/icon_image_01.svg',
    isNeighborhood: false,
  },
  {
    id: 3,
    username: 'とうそうノート',
    bio: '有明勤務のエンジニア。豊洲市場の海鮮ランチレポ多めです。',
    profileImageUrl: '/icons/icon_image_01.svg',
    isNeighborhood: false,
  },
  {
    id: 4,
    username: 'いぬとさんぽ日和',
    bio: '木場公園でワンコと散歩。週末はBBQと植物園に出没します。',
    profileImageUrl: '/icons/icon_image_01.svg',
    isNeighborhood: true,
  },
  {
    id: 5,
    username: 'すなまち食いしん坊',
    bio: '砂町銀座の食べ歩き担当。揚げ物とコロッケの新店情報募集中！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isNeighborhood: true,
  },
];

/**
 * メインコンポーネント
 */
const NeighborhoodPage = () => {
  const [NeighborhoodUsers, setNeighborhoodUsers] = useState<NeighborhoodUser[]>([]);

  useEffect(() => {
    setNeighborhoodUsers(dummyNeighborhoodData);
  }, []);

  const handleNeighborhoodToggle = (userId: number) => {
    setNeighborhoodUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId
          ? { ...user, isNeighborhood: !user.isNeighborhood }
          : user
      )
    );
  };

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[440px] flex-col bg-white text-text-primary">
      {/* ヘッダーエリア */}
      <header className="flex-shrink-0 flex items-center justify-between p-2 h-12 bg-white border-b border-text-secondary sticky top-0 z-10">
        <Link href="/mypage" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          やりとりしたご近所さん
        </h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* ユーザーリスト */}
        <div className="divide-y divide-gray-100">
          {NeighborhoodUsers.map((user) => (
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
                  onClick={() => handleNeighborhoodToggle(user.id)}
                  className={`flex items-center justify-center w-28 h-8 rounded-full border text-xs font-semibold transition-colors
                    ${
                      user.isNeighborhood
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-white text-brand-blue border-brand-blue'
                    }
                  `}
                >
                  {user.isNeighborhood ? (
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

export default NeighborhoodPage;