"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TEXT = {
  tagline: "-あなたの想いが、まちを灯す-",
  login: "myTOKYOGASでログイン",
  guest: "未契約者の方はこちら",
  powered: "powered by TOKYOGAS",
  brandAlt: "TOKYO GAS ロゴ",
  appLogoAlt: "TOMOSU メインロゴ（炎アイコン）",
  appFontAlt: "TOMOSU ロゴフォント",
};

const PATHS = {
  login: "/login",
  guest: "/guest", // TODO: 遷移先が未確定の場合は「#」等に変更
  appLogo: "/images/app_logo.png",
  appFontLogo: "/images/app_logo_font.png",
  brandLogo: "/icons/brand_logo.svg",
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      {/* Header */}
      <header className="pt-20" aria-label="アプリのヘッダー">
        <h1 className="sr-only">TOMOSU</h1>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center px-4" role="main">
        {/* サブタイトル */}
        <p
          className="mt-12 mb-10 text-center text-[20px] font-bold tracking-[-0.4px] text-[#3c3c3c]"
          aria-label="サブタイトル"
        >
          {TEXT.tagline}
        </p>

        {/* メインロゴ（炎アイコン） */}
        <div className="mt-4 mb-4 flex justify-center">
          <Image
            src={PATHS.appLogo}
            alt={TEXT.appLogoAlt}
            width={144}
            height={168}
            priority
            className="h-auto w-36 md:w-40"
          />
        </div>

        {/* TOMOSUロゴフォント */}
        <div className="mb-6 flex justify-center">
          <Image
            src={PATHS.appFontLogo}
            alt={TEXT.appFontAlt}
            width={228}
            height={65}
            className="h-auto w-56 md:w-60"
          />
        </div>

        {/* powered by（サブテキスト） */}
        <div className="mb-8 flex justify-center">
          <span className="text-xs text-[#c4c4c4]">{TEXT.powered}</span>
        </div>

        {/* アクションボタン群 */}
        <div className="mb-8 flex w-full max-w-[343px] flex-col items-stretch gap-4">
          <Link
            href={PATHS.login}
            aria-label="myTOKYOGASでログイン"
            className="inline-flex h-[61px] items-center justify-center rounded-[10px] bg-[#1b6aac] text-[19px] font-bold tracking-[-0.41px] text-white outline-none transition-[opacity,box-shadow] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1b6aac]/60 hover:opacity-95 active:opacity-90"
          >
            {TEXT.login}
          </Link>

          <Link
            href={PATHS.guest}
            aria-label="未契約者の方はこちら"
            className="inline-flex h-[61px] items-center justify-center rounded-[10px] bg-[#dedede] text-[19px] font-bold tracking-[-0.41px] text-[#5a5a5a] outline-none transition-[opacity,box-shadow] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9e9e9e]/50 hover:opacity-95 active:opacity-90"
          >
            {TEXT.guest}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto mb-6 flex w-full items-center justify-center px-4" aria-label="フッター">
        <div className="w-full max-w-[120px]">
          <Image
            src={PATHS.brandLogo}
            alt={TEXT.brandAlt}
            width={100}
            height={32}
            priority
            className="h-auto w-full"
          />
        </div>
      </footer>
    </div>
  );
}
