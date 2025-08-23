// src/components/ui/EngageButton.tsx

"use client";

import Image from "next/image";

// Propsの型定義を更新
interface EngageButtonProps {
  iconDefault: string;
  iconActive: string;
  count: number;
  ariaLabel: string;
  active?: boolean;
  onToggle?: () => void;
}

export default function EngageButton({
  iconDefault,
  iconActive,
  count,
  ariaLabel,
  active = false,
  onToggle = () => {},
}: EngageButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 hover:bg-black/5 transition-colors"
    >
      <Image
        src={active ? iconActive : iconDefault}
        alt=""
        width={18}
        height={18}
        className="transition-transform duration-150"
      />
      <span
        className={`text-[12px] font-medium ${
          active ? "text-brand-blue" : "text-text-primary/80"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
