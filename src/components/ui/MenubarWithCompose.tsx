// src/components/ui/MenubarWithCompose.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Menubar from "@/components/ui/menubar";

type Props = {
  active: "home" | "timeline";
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
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 pointer-events-none">
        <Link
          href="/compose"
          aria-label="投稿する"
          className={`
            absolute bottom-24 right-5
            inline-flex size-14 items-center justify-center
            rounded-full bg-brand-blue shadow-md
            pointer-events-auto /* ボタン自体はクリックできるように戻す */
          `}
        >
          <Image src={ICON.compose} alt="" width={56} height={56} />
        </Link>
      </div>

      {/* 既存のMenubarコンポーネントを呼び出します */}
      <Menubar active={active} />
    </>
  );
}