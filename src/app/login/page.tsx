"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// public/icons 配下の使用アイコン
const ICONS = {
  arrowLeft: "/icons/arrow_left.svg",
  show: "/icons/show.svg",
};

export default function Login() {
  const [showPwd, setShowPwd] = React.useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: バリデーション & API 連携
    window.location.href = "/login/confirm";
  };

  // 共通コンテナ（Header/Main で完全に揃える）
  const container = "mx-auto w-full max-w-[343px] px-4";

  // 入力フィールドの共通クラス
  const fieldBase =
    "w-full h-[47px] rounded-[7px] border px-4 bg-white text-[14px] leading-none placeholder:text-text-secondary";
  const fieldFocus =
    "focus:outline-none focus:!border-brand-blue focus:!ring-2 focus:!ring-brand-blue/50 focus-visible:!border-brand-blue focus-visible:!ring-2 focus-visible:!ring-brand-blue/50 caret-brand-blue";
  const labelClass = "block mb-1 text-xs tracking-[-0.24px] text-text-primary";

  return (
    <div className="flex min-h-dvh w-full flex-col items-center overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
      {/* Header（Main と同じコンテナで左位置を完全一致） */}
      <header className="w-full" aria-label="ナビゲーション">
        <div className={`${container} relative`}>
          <Link
            href="/home"
            aria-label="前の画面へ戻る"
            className="absolute left-0 top-4 block -m-2 p-2"
          >
            <Image src={ICONS.arrowLeft} alt="戻る" width={24} height={24} />
          </Link>
          <h1 className="pt-20 pb-2 text-[24px] font-bold tracking-[-0.48px] text-text-primary">
            ログイン
          </h1>
        </div>
      </header>

      {/* Main（Header と同じコンテナを再利用して左右位置を同期） */}
      <main className="w-full flex-1" role="main">
        <div className={container}>
          <form onSubmit={onSubmit} noValidate>
            {/* ログインID */}
            <label htmlFor="loginId" className={labelClass}>
              ログインID
            </label>
            <input
              id="loginId"
              name="loginId"
              type="email"
              inputMode="email"
              autoComplete="username"
              placeholder="メールアドレス / 初期ID"
              className={`${fieldBase} ${fieldFocus} border-[#ebebeb]`}
            />

            {/* パスワード */}
            <div className="mt-4">
              <label htmlFor="password" className={labelClass}>
                パスワード
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="パスワード"
                  className={`${fieldBase} ${fieldFocus} border-[#ebebeb] pr-10`}
                />
                <button
                  type="button"
                  aria-label={showPwd ? "パスワードを非表示にする" : "パスワードを表示する"}
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                >
                  <Image src={ICONS.show} alt="表示切替" width={24} height={24} />
                </button>
              </div>
            </div>

            {/* 注意テキスト */}
            <p className="mt-4 text-[12px] leading-relaxed text-text-primary/80">
              お客さまのアカウント保護のため、不正検知サービス事業者に
              お客さまのアクセス情報を提供します。
            </p>

            {/* ボタン群：高さを統一（h-[61px]） */}
            <div className="mt-6 space-y-4">
              {/* 同意してログイン：行間/余白を整えて詰まり解消 */}
              <button
                type="submit"
                className="inline-flex h-[61px] w-full flex-col items-center justify-center gap-1 rounded-[10px] bg-brand-blue bg-[#1B6AAC] px-4 text-white leading-normal shadow-sm transition-opacity hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 focus-visible:ring-offset-2"
              >
                <span className="text-[12px]">上記に同意して</span>
                <span className="text-[19px] font-bold tracking-[-0.41px]">ログイン</span>
              </button>

              {/* はじめてご利用の方：高さを合わせる */}
              <Link
                href="#"
                className="inline-flex h-[61px] w-full items-center justify-center rounded-[10px] border border-brand-blue bg-white px-4 text-[19px] font-bold tracking-[-0.41px] text-brand-blue shadow-sm transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2"
              >
                はじめてご利用の方
              </Link>

              {/* 会員登録について（ボタン直下） */}
              <p className="text-[12px] text-text-primary/80">
                会員登録完了後、アプリをご利用いただけます。
              </p>
            </div>

            {/* お困りの方はこちら */}
            <section className="mt-8" aria-labelledby="support-heading">
              <h2 id="support-heading" className="mb-3 text-base font-bold text-text-primary">
                お困りの方はこちら
              </h2>
              <ul className="space-y-3 text-[14px] text-brand-blue">
                <li>
                  <Link href="https://support.tokyo-gas.co.jp/faq/show/5697?site_domain=open&mtglink=support100009" className="underline underline-offset-2">
                    ログインIDを忘れた場合
                  </Link>
                </li>
                <li>
                  <Link href="https://members.tokyo-gas.co.jp/password-reset/email-input" className="underline underline-offset-2">
                    パスワードを忘れた場合
                  </Link>
                </li>
                <li>
                  <Link href="https://support.tokyo-gas.co.jp/category/show/914?site_domain=open&mtglink=support100010" className="underline underline-offset-2">
                    ログインについてのよくあるご質問
                  </Link>
                </li>
                <li>
                  <Link href="https://members.tokyo-gas.co.jp/contents/public/about/guide-signup-first.html" className="underline underline-offset-2">
                    初回ログインの手順をみる
                  </Link>
                </li>
              </ul>
            </section>
          </form>
        </div>
      </main>

      {/* Footer スペーサー（iOSホームバー配慮） */}
      <div className="h-6" aria-hidden />
    </div>
  );
}
