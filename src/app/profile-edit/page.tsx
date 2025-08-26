// src/app/profile-edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Menubar from "@/components/ui/menubar";

type UserProfile = {
  name: string;
  username: string;
  bio: string;
  area: string;
  gender: '女性' | '男性' | 'その他' | null;
  birthdate: string;
  profileImageUrl: string;
};

const dummyUserData: UserProfile = {
  name: 'pattyo_tokyogas',
  username: 'デモユーザー',
  bio: '「火の国」であったかく暮らしていた王子だよ\n生まれは火曜だけど年齢はヒミツ🤫\n🏡暮らしをポカポカにするアイデア\nを発信していくね！よろしくね✨',
  area: '東京都江東区',
  gender: 'その他',
  birthdate: '未設定',
  profileImageUrl: '/icons/icon_image_01.svg',
};

const FormRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex items-center border-b border-gray-200 px-4 py-3 text-sm">
    <label className="w-28 flex-shrink-0">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

const ProfileEditPage = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [area, setArea] = useState('');
  const [gender, setGender] = useState<UserProfile['gender']>(null);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const areaOptions = ['東京都江東区', '東京都港区', '東京都渋谷区'];

  const { name, birthdate } = dummyUserData;

  useEffect(() => {
    setUsername(dummyUserData.username);
    setBio(dummyUserData.bio);
    setArea(dummyUserData.area);
    setGender(dummyUserData.gender);
  }, []);

  const handleGenderSelect = (selectedGender: UserProfile['gender']) => {
    setGender(gender === selectedGender ? null : selectedGender);
  };

  const handleEditPhotoClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[440px] flex-col bg-white">
      <header className="flex-shrink-0 flex items-center justify-between p-2 h-12 bg-white border-b border-gray-200 sticky top-0 z-10">
        <Link href="/mypage" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          プロフィール編集
        </h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col items-center justify-center py-3">
          <div className="relative w-20 h-20">
            <Image
              src={dummyUserData.profileImageUrl}
              alt="プロフィール画像"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <button
            onClick={handleEditPhotoClick}
            className="mt-3 text-sm font-bold text-brand-blue underline underline-offset-2 decoration-brand-blue"
          >
            写真を編集
          </button>
        </div>

        <form>
          <div className="border-t border-gray-200">
            <FormRow label="名前">
              <input
                type="text"
                value={name}
                readOnly
                className="w-full rounded-md border-none bg-gray-100 p-2 text-left text-gray-500 focus:ring-0 cursor-not-allowed"
              />
            </FormRow>
            <FormRow label="ユーザーネーム">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-left focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              />
            </FormRow>
          </div>

          <div className="border-t border-gray-200 p-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-800">自己紹介</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800">居住エリア</label>
              <div className="relative mt-2">
                <button
                  type="button"
                  onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                  className="w-full text-left p-3 bg-white border border-gray-300 rounded-md flex justify-between items-center"
                >
                  <span className="text-sm">{area}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
                {isAreaDropdownOpen && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {areaOptions.map((option) => (
                      <li key={option} onClick={() => { setArea(option); setIsAreaDropdownOpen(false); }} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800">性別</label>
              <div className="flex justify-between mt-2 space-x-2">
                {(['女性', '男性', 'その他'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGenderSelect(g)}
                    className={`w-full h-9 rounded-full border text-sm transition-colors
                      ${gender === g ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-text-primary border-gray-300'}
                    `}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800">生年月日</label>
              <div className="mt-2 text-left p-3 bg-gray-100 border border-gray-300 rounded-md flex justify-between items-center text-gray-500 cursor-not-allowed">
                <span className="text-sm">{birthdate}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </div>
            </div>
          </div>
        </form>
      </main>

      <footer className="flex-shrink-0">
        <Menubar active="mypage" />
      </footer>

      {showToast && (
        <div
          className={`
            fixed top-20 left-1/2 -translate-x-1/2
            px-4 py-2 rounded-full bg-black/70 text-white text-sm 
            transition-opacity duration-300
            ${showToast ? 'opacity-100' : 'opacity-0'}
          `}
        >
          MVP版では変更できません
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;