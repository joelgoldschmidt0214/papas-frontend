// src/components/ui/menubar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Tab = "home" | "timeline" | "survey" | "mypage";

type Props = {
  active?: Tab; // 現在タブ（任意）
};

const ICONS = {
  home: "/icons/Home.svg",
  chat: "/icons/Chat.svg",
  paper: "/icons/Paper.svg",
  profile: "/icons/Profile.svg",
};

export default function Menubar({ active = "home" }: Props) {
  const items: Array<{ key: Tab; href: string; icon: string; label: string }> = [
    { key: "home", href: "/home", icon: ICONS.home, label: "ホーム" },
    { key: "timeline", href: "/timeline", icon: ICONS.chat, label: "タイムライン" },
    { key: "survey", href: "/survey", icon: ICONS.paper, label: "アンケート" },
    { key: "mypage", href: "/mypage", icon: ICONS.profile, label: "マイページ" },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-1/2 z-50 -translate-x-1/2
        w-full max-w-[440px]
        bg-brand-blue text-white
        pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2
        shadow-[0_-4px_12px_rgba(0,0,0,0.08)]
      "
      aria-label="メニューバー"
    >
      {/* 4等分で常に等幅・中央寄せ */}
      <ul className="grid w-full grid-cols-4">
        {items.map(({ key, href, icon, label }) => {
          const isActive = active === key;
          return (
            <li key={key} className="col-span-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                aria-label={label}
                // アイコン・文字ともに横軸中央、タップ面積は十分確保
                className="
                  group mx-auto flex h-full w-full max-w-[120px]
                  flex-col items-center justify-center gap-1.5 py-2.5
                  text-white focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-white/70 rounded-lg
                  active:opacity-90
                "
              >
                {/* アイコン（横軸中心揃え） */}
                <span className="inline-flex h-6 w-6 items-center justify-center">
                  <Image src={icon} alt="" width={32} height={32} className="h-6 w-6" />
                </span>
                {/* ラベル（常に白。アクティブは僅かに強調） */}
                <span className="text-[11px] leading-none opacity-85">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
