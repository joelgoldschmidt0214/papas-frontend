"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// アイコン画像（public/icons配下）
const ICONS = {
  arrowLeft: "/icons/arrow_left.svg",
};

export default function LoginConfirm() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative">
      {/* ナビゲーションバー（戻るボタンのみ表示） */}
      <button
        type="button"
        className="absolute left-2 top-4 z-10"
        onClick={() => router.push("/login")}
      >
        <Image src={ICONS.arrowLeft} alt="戻る" width={24} height={24} />
      </button>

      {/* タイトル */}
      <h1 className="text-[24px] font-bold text-[#3c3c3c] text-left mt-8 mb-2 w-[343px] tracking-[-0.48px] pl-[16px]">
        お客様情報の確認
      </h1>
      {/* サブテキスト */}
      <p className="w-[343px] text-xs text-[#3c3c3c] mb-4 pl-[16px]">
        my TOKYOGASのご登録状況を確認するため、下記の情報を入力してください。
      </p>

      {/* お客さま番号ラベル */}
      <label className="block mb-1 text-xs text-[#3c3c3c] font-normal tracking-[-0.24px] text-left w-[343px] pl-[16px]">
        お客さま番号
      </label>
      {/* お客さま番号入力欄 */}
      <input
        type="text"
        placeholder="お客さま番号"
        className="w-[343px] h-[47px] rounded-[7px] border border-[#ebebeb] px-4 mb-2 bg-white text-[#cccccc] text-xs"
      />
      {/* お客さま番号がわからない場合リンク */}
      <a
        href="#"
        className="w-[343px] text-[#004098] text-[10px] underline pl-[16px] mb-2 text-left block"
      >
        お客さま番号がわからない場合
      </a>

      {/* ご本人さま確認ラベル */}
      <label className="block mb-1 text-xs text-[#3c3c3c] font-normal tracking-[-0.24px] text-left w-[343px] pl-[16px]">
        ご本人さま確認
      </label>
      {/* チェックボックス＋ラベル */}
      <div className="flex items-center w-[343px] pl-[16px] mb-4">
        <input
          type="checkbox"
          id="contractor"
          className="w-5 h-5 border border-[#3c3c3c] rounded mr-2"
        />
        <label htmlFor="contractor" className="text-xs text-[#3c3c3c]">私は契約者本人です</label>
      </div>

      {/* サブテキスト（下部） */}
      <p className="w-[343px] text-xs text-[#3c3c3c] mb-4 pl-[16px]">
        my TOKYOGASのご登録状況を確認するため、下記の情報を入力してください。
      </p>

      {/* テストテキスト（サンプル） */}
      <div className="w-[247px] mx-auto text-xs text-[#3c3c3c] space-y-2">
        <p>テストテストテストテストテストテスト</p>
        <p>テストテストテストテストテストテスト</p>
        <p>テストテストテストテストテストテスト</p>
        <p>テストテストテストテストテストテスト</p>
      </div>
    </div>
  );
}
