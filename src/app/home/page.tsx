"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenubarWithCompose from "@/components/ui/MenubarWithCompose";

/** 画像・アイコンのパス */
const IMG = {
  bg: "/images/background-img.jpg",
  banner: "/images/banner_home.png",
  avatar: "/icons/icon_image_01.svg",
  town: "/icons/town.svg",
  compose: "/icons/btn-compose.svg",
  notification: "/icons/icon_notification.svg",
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
  left: string;
  top: string;
  width?: string;
  href?: string;
  ariaLabel?: string;
}) {
  const style: React.CSSProperties = { left, top, ...(width ? { width } : {}) };
  const classes = `
    absolute -translate-x-1/2 inline-flex items-center justify-center
    rounded-full border border-brand-primary/30 bg-white/75 px-3 py-1 shadow
    text-[11px] text-text-primary backdrop-blur-[2px]
    transition-transform duration-400 ease-out motion-safe:hover:scale-[1.12] motion-safe:hover:rotate-1
  `;
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
  const hasNewNotification = true;

  return (
    <div
      className={`
        mx-auto flex h-screen w-full max-w-[440px]
        flex-col bg-white
      `}
    >
      {/* --- ヘッダー（固定） --- */}
      <header className="flex-shrink-0">
        <div className="h-10" aria-hidden />
        <div className="relative px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/mypage" aria-label="マイページへ移動">
                <Image
                  src={IMG.avatar}
                  alt="プロフィール画像"
                  width={45}
                  height={45}
                  className="rounded-full"
                  priority
                />
              </Link>

              <div>
                <div
                  className={`
                    inline-flex items-center gap-1.5 rounded-md border
                    border-brand-blue/50 bg-brand-secondary px-2 py-0.5
                    text-[12px] text-text-primary
                  `}
                >
                  <Image src={IMG.town} alt="" width={16} height={16} className="h-4 w-4" />
                  <span>東京都江東区</span>
                </div>
                <p className="mt-1 text-[14px] font-bold text-text-primary">デモユーザー</p>
              </div>
            </div>

            <div className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2">
              <Link href="/notifications" aria-label="お知らせ" className="relative p-2">
                <Image
                  src={IMG.notification}
                  alt="お知らせ"
                  width={28}
                  height={28}
                />
                {hasNewNotification && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-component-pink ring-2 ring-white" />
                )}
              </Link>
            </div>
          </div>
        </div>
        <div className="my-3 h-[0.5px] w-full bg-black/10" />
      </header>

      {/* --- メインコンテンツ（スクロール可能） --- */}
      <main className="flex-1 overflow-y-auto">
        <section className="w-full">
          <a
            href="https://members.tokyo-gas.co.jp/contents/public/news/list.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TOKYO GAS からのお知らせをチェック！"
          >
            <Image
              src={IMG.banner}
              alt="TOKYO GAS からのお知らせをチェック！"
              width={393}
              height={65}
              sizes="(max-width: 440px) 100vw, 440px"
              className="block h-auto w-full"
              priority
            />
          </a>
          <div className="my-3 h-[0.5px] w-full bg-black/10" />
        </section>

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
          <Bubble
            href="/notifications"
            text="東京ガスからのお知らせです。"
            left="76%"
            top="15%"
            width="180px"
          />
          <Bubble
            href="/notifications"
            text="メンテナンスのお知らせ♪"
            left="68%"
            top="38%"
            width="160px"
          />
          <Bubble
            href="/timeline?tab=イベント"
            text="9/6のイベントをチェック！"
            left="32%"
            top="48%"
            width="180px"
          />
          <Bubble
            href="/timeline?tab=子育て"
            text="保育園情報が更新されました。"
            left="54%"
            top="62%"
            width="180px"
          />
        </div>
      </main>

      {/* --- フッター（固定） --- */}
      <footer className="flex-shrink-0">
        <MenubarWithCompose active="home" />
      </footer>
    </div>
  );
}