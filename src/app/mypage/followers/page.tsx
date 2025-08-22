// ページコンポーネント内で状態管理(useState)やイベントハンドリング(onClickなど)を行うため、
// 'use client' ディレクティブをファイルの先頭に記述します。これにより、このコンポーネントはクライアントサイドでレンダリングされます。
'use client';

// 必要なモジュールやコンポーネントをインポートします。
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * フォロワーのユーザー情報の型定義。
 * isFollowingプロパティで「自分がそのユーザーをフォローバックしているか」を管理します。
 */
type FollowerUser = {
  id: number;
  username: string;
  bio: string | null;
  profileImageUrl: string;
  isFollowing: boolean; // trueならフォローバック済み、falseなら未フォロー
};

/**
 * APIからデータを取得するまでの間、画面に表示するためのダミーデータ。
 * スクリーンショットに合わせて、フォローバック済みのユーザーとそうでないユーザーを混在させます。
 */
const dummyFollowersData: FollowerUser[] = [
  {
    id: 1,
    username: 'Username 1',
    bio: '今日はTech0の発表🔥\n緊張するけど頑張ろう！\nみんなの応援よろしく！',
    profileImageUrl: '/icons/icon_image_01.svg',
    isFollowing: true, // このユーザーはフォローバック済み
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
    isFollowing: false, // このユーザーは未フォロー
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
  // フォロワーのリストを状態として管理します。
  const [followers, setFollowers] = useState<FollowerUser[]>([]);

  /**
   * コンポーネントが最初に読み込まれた時に一度だけ実行される処理。
   * ここでAPIを呼び出し、フォロワーのリストを取得します。
   */
  useEffect(() => {
    // 【将来的な実装】
    // ここでバックエンドAPIにリクエストを送り、フォロワーのデータを取得します。
    // API仕様書(API_USAGE_EXAMPLES.md)の `/api/v1/users/{user_id}/followers` を想定しています。
    // const fetchFollowers = async () => {
    //   try {
    //     const response = await fetch('/api/v1/users/me/followers'); // APIエンドポイントの例
    //     const data = await response.json();
    //
    //     // isFollowingの状態もAPIから取得するか、別途判定ロジックが必要です。
    //     setFollowers(data);
    //
    //   } catch (error) {
    //     console.error('フォロワー情報の取得に失敗しました:', error);
    //   }
    // };
    // fetchFollowers();

    // 今回はAPIがないため、代わりにダミーデータをstateにセットします。
    setFollowers(dummyFollowersData);
  }, []); // 第2引数の空配列は、この処理が初回レンダリング時にのみ実行されることを意味します。

  /**
   * フォロー/フォロー解除ボタンのクリックイベントハンドラ。
   * @param userId - クリックされたユーザーのID
   */
  const handleFollowToggle = (userId: number) => {
    // 【将来的な実装】
    // ここでフォロー/フォロー解除のAPIを呼び出します。
    
    // フロントエンドの表示を先に切り替える例：
    setFollowers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing } // 対象ユーザーのisFollowing状態を反転
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
          フォロワー
        </h1>
        <div className="w-8"></div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-grow overflow-y-auto">
        {/* ユーザーリスト */}
        <div className="divide-y divide-gray-100">
          {followers.map((user) => (
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

              {/* フォロー/フォロー中ボタン */}
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

export default FollowersPage;