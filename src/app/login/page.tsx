import React from "react";
import Image from "next/image";

// SVGアイコン（public/icons配下を利用）
const ICONS = {
  battery: "/icons/battery.svg", // 例: 必要に応じて追加
  wifi: "/icons/wifi.svg",
  mobileSignal: "/icons/mobile_signal.svg",
  arrowLeft: "/icons/arrow_left.svg",
  show: "/icons/show.svg",
};

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative">
      {/* ナビゲーションバー（ステータスバー含む） */}
      <div className="w-full max-w-[393px] bg-white shadow-lg relative">
        {/* ステータスバー（ダミー） */}
        <div className="flex justify-between items-center px-4 pt-2 h-6">
          <span className="text-xs text-black">9:41</span>
          <div className="flex gap-1">
            {/* 必要に応じてSVGアイコンを配置 */}
            {/* <Image src={ICONS.mobileSignal} alt="" width={20} height={20} /> */}
            {/* <Image src={ICONS.wifi} alt="" width={20} height={20} /> */}
            {/* <Image src={ICONS.battery} alt="" width={20} height={20} /> */}
          </div>
        </div>
        {/* 戻るボタン */}
        <button type="button" className="absolute left-2 top-8">
          <Image src={ICONS.arrowLeft} alt="戻る" width={24} height={24} />
        </button>
  {/* タイトルはナビゲーションバー直下に移動（Figma通り） */}
  </div>
  {/* タイトル（Figma通りナビゲーションバーの下） */}
  <h1 className="text-[24px] font-bold text-[#3c3c3c] text-left mt-8 mb-2 w-[343px] tracking-[-0.48px]">ログイン</h1>

  {/* ログインIDラベル（左揃えに修正） */}
  <label className="block mt-8 mb-1 text-xs text-[#3c3c3c] font-normal tracking-[-0.24px] text-left w-[343px]">ログインID</label>
      {/* ログインID入力欄 */}
      <input
        type="text"
        placeholder="メールアドレス / 初期ID"
        className="w-[343px] h-[47px] rounded-[7px] border border-[#ebebeb] px-4 mb-4 bg-white text-[#cccccc] text-xs"
      />

  {/* パスワードラベル（左揃えに修正） */}
  <label className="block mb-1 text-xs text-[#3c3c3c] font-normal tracking-[-0.24px] text-left w-[343px]">パスワード</label>
      {/* パスワード入力欄 */}
      <div className="relative w-[343px] mb-4">
        <input
          type="password"
          placeholder="パスワード"
          className="w-full h-[47px] rounded-[7px] border border-[#ebebeb] px-4 bg-white text-xs"
        />
        {/* パスワード表示アイコン */}
        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2">
          <Image src={ICONS.show} alt="パスワード表示" width={24} height={24} />
        </button>
      </div>

      {/* サブテキスト */}
      <p className="w-[345px] text-xs text-[#3c3c3c] mb-4">
        my TOKYOGASのご登録状況を確認するため、下記の情報を入力してください。
      </p>

      {/* ログインボタン */}
      <button
        type="button"
        className="w-[344px] h-[61px] bg-[#1b6aac] rounded-[10px] text-white font-bold text-[19px] tracking-[-0.41px] mb-4"
      >
        <span className="block text-[12px] mb-0">上記に同意して</span>
        <span className="block text-[19px]">ログイン</span>
      </button>

      {/* 初めてご利用の方ボタン */}
      <button
        type="button"
        className="w-[343px] h-[61px] bg-white border border-[#004098] rounded-[10px] text-[#004098] font-bold text-[19px] tracking-[-0.41px] mb-8"
      >
        初めてご利用の方
      </button>

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
