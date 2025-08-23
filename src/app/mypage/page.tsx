// src/app/mypage/profile/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Menubar from "@/components/ui/menubar";
import BtnNotice from "@/components/ui/BtnNotice";

const ICON = {
  back: "/icons/arrow_left.svg",
  town: "/icons/btn_home_icon.svg",
  emojiPeople: "/icons/emoji-people.svg",
  heart: "/icons/engade_heart=default.svg",
  comments: "/icons/comments-duotone.svg",
  article: "/icons/article-light.svg",
  taskDone: "/icons/task-done.svg",
  bulb: "/icons/light_bulb.svg",
  bookmark: "/icons/engage_bookmark=default.svg",
};

const IMG = {
  avatar: "/images/icon_image_01.png",
};

export default function ProfilePage() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white">
      {/* スクロール領域（フッターに被らない余白を確保） */}
      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* 上余白（他画面と統一） */}
        <div className="h-10" aria-hidden />

        {/* Header：戻る／通知 */}
        <header className="px-4">
          <div className="flex items-center justify-between">
            <Link href="/mypage" aria-label="戻る" className="-m-2 p-2 inline-flex">
              <Image src={ICON.back} alt="" width={24} height={24} />
            </Link>
            <BtnNotice noticeState="new" size={20} href="/notifications" ariaLabel="お知らせ" />
          </div>
        </header>

        <div className="mt-2 h-px w-full bg-black/10" />

        {/* プロフィールカード */}
        <section className="px-4 pt-4">
          <div className="rounded-lg border border-black/10 bg-white p-4">
            <div className="flex items-center gap-3">
              <Image
                src={IMG.avatar}
                alt="プロフィール画像"
                width={54}
                height={54}
                className="h-[54px] w-[54px] rounded-full border-2 border-gray-200 object-cover"
                priority
              />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-text-primary">username</p>
                <p className="mt-1 text-[12px] leading-4 text-text-primary">
                  フォロー <span className="font-bold text-brand-blue">10</span>{" "}
                  フォロワー <span className="font-bold text-brand-blue">20</span>
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-[7px] border border-brand-blue bg-white px-3 py-2 text-[12px] font-bold text-brand-blue"
              >
                プロフィールを編集
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-[7px] border border-brand-blue bg-white px-3 py-2 text-[12px] font-bold text-brand-blue"
              >
                プロフィールをシェア
              </button>
            </div>
          </div>
        </section>

        {/* あなたのまち（見出しの“すぐ横”にバッジ） */}
        <section className="px-4 pt-6">
          <div className="inline-flex items-center gap-2">
            <h2 className="text-[15px] font-bold text-brand-blue">あなたのまち</h2>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-brand-blue bg-brand-secondary px-3 py-1.5 text-[12px] text-text-primary">
              <Image src={ICON.town} alt="" width={18} height={18} />
              <span>東京都江東区</span>
            </div>
          </div>
        </section>

        <div className="my-4 h-px w-full bg-black/10" />

        {/* やりとりしたご近所さん */}
        <section className="px-4">
          <div className="rounded-[8px] bg-background-primary p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={ICON.emojiPeople} alt="" width={20} height={20} />
                <p className="text-[12px] font-bold text-text-primary">やりとりしたご近所さん</p>
              </div>
              <span className="text-[14px] font-bold text-brand-blue">18</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[6px] bg-white p-3">
                <p className="text-[12px] text-text-primary">いいねされた数</p>
                <div className="mt-2 flex items-center gap-2">
                  <Image src={ICON.heart} alt="" width={20} height={20} />
                  <span className="text-[14px] font-bold text-text-primary">16</span>
                </div>
              </div>

              <div className="rounded-[6px] bg-white p-3">
                <p className="text-[12px] text-text-primary">もらったコメント数</p>
                <div className="mt-2 flex items-center gap-2">
                  <Image src={ICON.comments} alt="" width={22} height={22} />
                  <span className="text-[14px] font-bold text-text-primary">7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* まちのアンケート */}
        <section className="px-4 pt-4">
          <div className="rounded-[8px] bg-background-primary p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={ICON.article} alt="" width={22} height={22} />
                <p className="text-[12px] font-bold text-text-primary">まちのアンケート</p>
              </div>
              <span className="text-[14px] font-bold text-brand-blue">5</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[6px] bg-white p-3">
                <p className="text-[12px] text-text-primary">アンケート回答数</p>
                <div className="mt-2 flex items-center gap-2">
                  <Image src={ICON.taskDone} alt="" width={16} height={16} />
                  <span className="text-[14px] font-bold text-text-primary">9</span>
                </div>
              </div>

              <div className="rounded-[6px] bg-white p-3">
                <p className="text-[12px] text-text-primary">未回答のアンケート</p>
                <div className="mt-2 flex items-center gap-2">
                  <Image src={ICON.bulb} alt="" width={14} height={14} />
                  <span className="text-[14px] font-bold text-text-primary">3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* いいね・ブックマーク（枠線=brand/blue、各半分の中央で：Icon→Label→Number） */}
        <section className="px-4 py-4">
          <div className="grid grid-cols-2 divide-x divide-brand-blue/50 rounded-[8px] border border-brand-blue bg-white">
            {/* 左：いいね */}
            <div className="flex flex-col items-center justify-center gap-1 py-4">
              <Image src={ICON.heart} alt="" width={26} height={26} />
              <span className="text-[12px] font-bold text-brand-blue">いいね</span>
              <span className="text-[14px] font-bold text-brand-blue">24</span>
            </div>
            {/* 右：ブックマーク */}
            <div className="flex flex-col items-center justify-center gap-1 py-4">
              <Image src={ICON.bookmark} alt="" width={24} height={24} />
              <span className="text-[12px] font-bold text-brand-blue">ブックマーク</span>
              <span className="text-[14px] font-bold text-brand-blue">13</span>
            </div>
          </div>
        </section>
      </div>

      {/* 固定フッター（menubar） */}
      <Menubar active="mypage" />
    </div>
  );
}
