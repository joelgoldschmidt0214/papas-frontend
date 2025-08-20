// Noticeボタン（お知らせ有無）UIコンポーネント
// Figmaデザイン・MCP情報をもとに作成
// --------------------------------------------------
// このファイルは「お知らせボタン」を部品化したReactコンポーネントです。
// 画面ごとに使い回せるように、src/components/ui/に配置しています。
//
// 使い方例：
// <BtnNotice noticeState="new" size={40} />
//
// propsで「状態（新着 or 通常）」「サイズ」「追加クラス」を指定できます。
// SVGアイコンはpublic/icons配下のファイルを利用します。
// --------------------------------------------------
import React from "react";
import Image from "next/image";

// noticeState: "new"なら新着アイコン、"default"なら通常アイコンを表示
export type NoticeState = "new" | "default";

// BtnNoticeコンポーネントのprops（外部から渡す値）
export interface BtnNoticeProps {
  // お知らせの状態（新着 or 通常）
  noticeState?: NoticeState;
  // ボタンのサイズ（px, rem, % などで指定可能）
  // ボタンのサイズ（px単位で指定）
  size?: number;
  // 追加のCSSクラス（Tailwindや独自クラスを追加したい場合）
  className?: string;
}

// noticeStateごとに表示するSVGアイコンのパスを定義
const ICONS = {
  new: "/icons/notice_state=new.svg",      // 新着お知らせアイコン
  default: "/icons/notice_state=default.svg", // 通常お知らせアイコン
};

// BtnNoticeコンポーネント本体
// propsで渡された値に応じて表示内容・スタイルを切り替えます
export const BtnNotice: React.FC<BtnNoticeProps> = ({
  noticeState = "default", // デフォルトは通常アイコン
  size = 32,               // デフォルトサイズは32px
  className = "",          // 追加クラスがなければ空
}) => {
  // noticeStateに応じて表示するSVGアイコンのパスを取得
  const src = ICONS[noticeState];
  return (
    // ボタンの枠（Tailwindで丸型・背景色・枠線などを指定）
    <button
      type="button"
      className={`relative flex items-center justify-center bg-background-primary rounded-full border border-component-accent ${className}`}
      style={{ width: size, height: size }} // サイズをpropsで指定
      data-name={`notice_state=${noticeState}`}
    >
      {/* SVGアイコン画像を表示（Next.jsのImageで最適化） */}
      <Image
        src={src}
        alt={noticeState === "new" ? "新着お知らせ" : "お知らせ"}
        width={size}
        height={size}
        className="block w-full h-full object-contain"
        draggable={false}
        priority
      />
      {/* 新着の場合はバッジ等追加可能（例：赤丸や数字など） */}
    </button>
  );
};

// 他のファイルからimportしやすいようにexport default
export default BtnNotice;