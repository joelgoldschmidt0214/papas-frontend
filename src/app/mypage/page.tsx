"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Menubar from "@/components/ui/menubar";
import BtnNotice from "@/components/ui/BtnNotice";

/** 画像・アイコンのパス */
const IMG = {
  bg: "/images/background-img.jpg",      // 1170x1800（縦長）
  banner: "/images/banner_home.jpg",
  avatar: "/images/profile_icon.png",
  town: "/icons/town.svg",
  compose: "/icons/btn-compose.svg",
};

/** 吹き出し（共通） */
function Bubble({
  text,
  left,
  top,
  width,
  href,
  ariaLabel,
}: {
  text: string;
  left: string;   // 例 "75%"
  top: string;    // 例 "33%"
  width?: string; // 例 "56%"
  href?: string;
  ariaLabel?: string;
}) {
  const style: React.CSSProperties = { left, top, ...(width ? { width } : {}) };
  const classes =
    "absolute -translate-x-1/2 inline-flex items-center justify-center " +
    "rounded-full border border-brand-primary/30 bg-white/95 px-3 py-1 shadow " +
    "text-[11px] text-text-primary backdrop-blur-[2px] " +
    "transition-transform duration-200 ease-out motion-safe:hover:scale-[1.04] active:scale-[1.02]";
  const content = <span className="truncate text-center">{text}</span>;

  return href ? (
    <Link href={href} aria-label={ariaLabel ?? text} className={classes} style={style}>
      {content}
    </Link>
  ) : (
    <div aria-label={ariaLabel ?? text} className={classes} style={style}>
      {content}
    </div>
  );
}

export default function Mypage() {
  return (
    // アプリ全体：中央寄せ・最大幅 440px、最大高さ 930px でスクロール抑止
    <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white max-h-[930px] overflow-hidden">
      <div className="flex-1">
        {/* 上余白 40px */}
        <div className="h-10" aria-hidden />

        {/* HEADER（通知ボタン配置のため relative） */}
        <header className="relative px-4">
          <div className="flex items-center justify-between">
            {/* 左：プロフィール + 地域 */}
            <div className="flex items-center gap-3">
              <Image
                src={IMG.avatar}
                alt="プロフィール画像"
                width={45}
                height={45}
                className="rounded-full"
                priority
              />
              <div>
                {/* 地域バッジ：左に town.svg */}
                <div className="inline-flex items-center gap-1.5 rounded-md border border-brand-blue/50 bg-brand-secondary px-2 py-0.5 text-[12px] text-text-primary">
                  <Image src={IMG.town} alt="" width={16} height={16} className="h-4 w-4" />
                  <span>東京都江東区</span>
                </div>
                <p className="mt-1 text-[14px] font-bold text-text-primary">username</p>
              </div>
            </div>

            {/* 右：通知ボタン（小さめ・右余白 right-4） */}
            <div className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2">
              <BtnNotice noticeState="new" size={20} href="/notifications" ariaLabel="お知らせ" />
            </div>
          </div>
        </header>

        {/* 区切り線（フルブリードで横いっぱい） */}
        <div className="my-3 h-[0.5px] w-full bg-black/10" />

        {/* BANNER（横幅優先・比率維持） */}
        <section className="w-full">
          <Image
            src={IMG.banner}
            alt="TOKYO GAS からのお知らせをチェック！"
            width={393}
            height={65}
            sizes="(max-width: 440px) 100vw, 440px"
            className="block h-auto w-full"
            priority
          />
          <div className="my-3 h-[0.5px] w-full bg-black/10" />
        </section>

        {/* 背景イラスト（横幅優先） */}
        <main className="w-full">
          <div className="relative w-full -translate-y-[6px]">
            <Image
              src={IMG.bg}
              alt="まちの背景イラスト"
              width={1170}
              height={1800}
              sizes="(max-width: 440px) 100vw, 440px"
              className="block h-auto w-full"
              priority
            />

            {/* ===== 背景イラスト上の吹き出し（位置は％で微調整可能） ===== */}
            {/* ① 東京ガスからのお知らせです。 */}
            <Bubble
              text="東京ガスからのお知らせです。"
              left="76%"
              top="15%"
              width="180px"
            />

            {/* ② メンテナンスのお知らせ。 */}
            <Bubble
              text="メンテナンスのお知らせ♪"
              left="68%"
              top="38%"
              width="160px"
            />

            {/* ③ 9/6のイベントをチェック！ */}
            <Bubble
              text="9/6のイベントをチェック！"
              left="32%"
              top="48%"
              width="180px"
            />

            {/* ④ 保育園情報が更新されました。 */}
            <Bubble
              text="保育園情報が更新されました。"
              left="54%"
              top="62%"
              width="180px"
            />
          </div>
        </main>
      </div>

      {/* 投稿ボタン（右下固定・右余白 right-4、Menubar を避ける高さ） */}
      <Link
        href="/compose"
        className="fixed bottom-[100px] right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-brand-blue shadow-md"
        aria-label="投稿する"
      >
        <Image src={IMG.compose} alt="" width={32} height={32} />
      </Link>

      {/* 共通 Menubar */}
      <Menubar active="mypage" />
    </div>
  );
}
