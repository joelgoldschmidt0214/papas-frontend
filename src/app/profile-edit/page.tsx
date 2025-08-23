// ページコンポーネント内で状態管理(useState)やイベントハンドリング(onClickなど)を行うため、
// 'use client' ディレクティブをファイルの先頭に記述します。これにより、このコンポーネントはクライアントサイドでレンダリングされます。
'use client';

// 必要なモジュールやコンポーネントをインポートします。
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * ユーザープロファイル情報の型定義。
 */
type UserProfile = {
  name: string;
  username: string;
  bio: string;
  area: string;
  gender: '女性' | '男性' | 'その他' | null;
  birthdate: string;
  profileImageUrl: string;
};

/**
 * APIからデータを取得するまでの間、画面に表示するためのダミーデータ。
 */
const dummyUserData: UserProfile = {
  name: 'username',
  username: 'pattyo_tokyogas',
  bio: 'こんにちは、ぱっちょくんです🔥\nみんなの笑顔が大好きな火の妖精です！\n🏡暮らしをポカポカにするアイデア\nを発信していくね！よろしくね✨',
  area: '東京都港区',
  gender: null,
  birthdate: '1994年 12月 16日',
  profileImageUrl: '/images/icon_image_01.png',
};

/**
 * プロフィール編集ページのメインコンポーネント
 */
const ProfileEditPage = () => {
  // 各フォーム項目に対応する状態（state）を定義します。
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [area, setArea] = useState('');
  const [gender, setGender] = useState<UserProfile['gender']>(null);
  const [birthdate, setBirthdate] = useState('');

  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const areaOptions = ['東京都港区', '東京都江東区'];

  useEffect(() => {
    // ダミーデータをstateにセットします。
    setName(dummyUserData.name);
    setUsername(dummyUserData.username);
    setBio(dummyUserData.bio);
    setArea(dummyUserData.area);
    setGender(dummyUserData.gender);
    setBirthdate(dummyUserData.birthdate);
  }, []);

  const handleGenderSelect = (selectedGender: UserProfile['gender']) => {
    setGender(gender === selectedGender ? null : selectedGender);
  };

  return (
    <div className="flex flex-col h-full bg-background-primary text-text-primary">
      {/* ヘッダーエリア：高さをさらに調整 */}
      <header className="flex items-center justify-between p-2 h-12 bg-white border-b sticky top-0 z-10">
        <Link href="/mypage/profile" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          プロフィール編集
        </h1>
        <div className="w-8"></div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-grow overflow-y-auto text-sm">
        {/* 【修正】プロフィール画像セクション：全体の余白と画像サイズを大幅に縮小 */}
        <div className="flex flex-col items-center justify-center py-3 bg-white">
          <div className="relative w-16 h-16">
            <Image
              src={dummyUserData.profileImageUrl}
              alt="プロフィール画像"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          {/*
            【修正】テキスト色をtailwind.config.tsで定義されたbrand.blueに変更します。
            もし色が変わらない場合、Dockerのキャッシュが原因の可能性があります。
            `docker-compose down` 後に `docker-compose up --build` で再起動してみてください。
          */}
          <button className="mt-2 text-xs font-bold text-brand-blue">
            写真を編集
          </button>
        </div>

        {/* 【修正】フォームセクション間のマージンを縮小 */}
        <form className="mt-2 pb-4">
          {/* 【修正】各フォーム項目の垂直パディングを縮小 */}
          <div className="bg-white border-t border-b divide-y">
            <div className="flex items-center px-4 py-2">
              <label htmlFor="name" className="w-28 text-sm">名前</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 p-1 text-right bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center px-4 py-2">
              <label htmlFor="username" className="w-28 text-sm">ユーザーネーム</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 p-1 text-right bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-start px-4 py-2">
              <label htmlFor="bio" className="w-28 text-sm pt-1">自己紹介</label>
              {/* 【修正】自己紹介エリアの高さを縮小 */}
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="flex-1 p-2 text-left bg-transparent focus:outline-none border border-gray-200 rounded-md"
              />
            </div>
          </div>

          {/* 【修正】フォームセクション間のマージンを縮小 */}
          <div className="mt-2 bg-white border-t border-b divide-y">
            {/* 【修正】垂直パディングとボタンの高さを縮小 */}
            <div className="px-4 py-2">
              <div className="relative">
                <label className="text-sm">居住エリア</label>
                <button
                  type="button"
                  onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                  className="w-full text-left mt-1 px-3 h-9 bg-white border border-gray-300 rounded-md flex justify-between items-center"
                >
                  <span>{area}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {isAreaDropdownOpen && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {areaOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          setArea(option);
                          setIsAreaDropdownOpen(false);
                        }}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 【修正】垂直パディングとボタンのサイズを縮小 */}
            <div className="px-4 py-2">
                <label className="text-sm">性別</label>
                <div className="flex justify-between mt-1 space-x-2">
                    {(['女性', '男性', 'その他'] as const).map((g) => (
                         <button
                            key={g}
                            type="button"
                            onClick={() => handleGenderSelect(g)}
                            className={`w-full h-8 rounded-full border text-sm transition-colors
                                ${gender === g
                                    ? 'bg-brand-primary text-brand-white border-brand-primary'
                                    : 'bg-white text-text-primary border-gray-300'
                                }
                            `}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {/* 【修正】垂直パディングと高さを縮小 */}
            <div className="px-4 py-2">
              <label className="text-sm">生年月日</label>
              <div className="mt-1">
                <div
                  className="w-full text-left px-3 h-9 bg-gray-100 border border-gray-300 rounded-md flex justify-between items-center text-gray-500 cursor-not-allowed"
                >
                  <span>{birthdate}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileEditPage;