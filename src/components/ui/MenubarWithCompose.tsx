// src/components/ui/MenubarWithCompose.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Menubar from "@/components/ui/menubar";

type Props = {
  active: "home" | "timeline"; // このコンポーネントが使われるページを限定
};

const ICON = {
  compose: "/icons/btn-compose.svg",
};

/**
 * Menubarと投稿ボタンを組み合わせた、特別なフッターコンポーネント
 */
export default function MenubarWithCompose({ active }: Props) {
  return (
    <>
      {/* 投稿ボタンをfixedで画面右下に固定します */}
      <Link
        href="/compose"
        aria-label="投稿する"
        className={`
          fixed bottom-24 right-5 z-40
          inline-flex size-14 items-center justify-center
          rounded-full bg-brand-blue shadow-md
        `}
      >
        <Image src={ICON.compose} alt="" width={56} height={56} />
      </Link>

      <Menubar active={active} />
    </>
  );
}