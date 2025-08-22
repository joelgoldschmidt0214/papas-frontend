// src/components/ui/BtnNotice.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export type NoticeState = "new" | "default";

export interface BtnNoticeProps {
  noticeState?: NoticeState;
  size?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  priority?: boolean;
}

const ICONS = {
  new: "/icons/notice_state=new.svg",
  default: "/icons/notice_state=default.svg",
} as const;

function NoticeInner({
  src,
  alt,
  size,
  priority,
}: {
  src: string;
  alt: string;
  size: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="h-full w-full object-contain"
      draggable={false}
      priority={priority}
    />
  );
}

export default function BtnNotice({
  noticeState = "default",
  size = 20, // デフォルトを小さめに変更
  className = "",
  href,
  onClick,
  ariaLabel,
  priority,
}: BtnNoticeProps) {
  const src = ICONS[noticeState];
  const alt = ariaLabel ?? (noticeState === "new" ? "新着お知らせ" : "お知らせ");

  const style: React.CSSProperties = { width: size, height: size };

  // ✅ 外枠(border)を削除し、透過背景のみに変更
  const base =
    "relative inline-flex items-center justify-center rounded-full transition outline-none " +
    "hover:opacity-90 active:opacity-80 focus-visible:ring-2 focus-visible:ring-brand-blue/60 focus-visible:ring-offset-1";

  if (href) {
    return (
      <Link
        href={href}
        aria-label={alt}
        className={`${base} ${className}`}
        style={style}
      >
        <NoticeInner src={src} alt={alt} size={size} priority={priority} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={alt}
      onClick={onClick}
      className={`${base} ${className}`}
      style={style}
      data-notice-state={noticeState}
    >
      <NoticeInner src={src} alt={alt} size={size} priority={priority} />
    </button>
  );
}
