import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white relative, pt-20">
      {/* サブタイトル */}
      <h1 className="mt-12 mb-2 text-center font-bold text-[20px] text-[#3c3c3c] tracking-[-0.4px]">-あなたの想いが、まちを灯す-</h1>

      {/* メインロゴ（炎アイコン） */}
      <div className="mt-2 mb-2 flex justify-center">
        <Image src="/images/TOMOSU 1.png" alt="TOMOSU Main" width={144} height={168} />
      </div>

      {/* TOMOSUロゴフォント */}
      <div className="mb-2 flex justify-center">
        <Image src="/images/TOMOSU_font 1.png" alt="TOMOSU Font" width={228} height={65} />
      </div>

      {/* powered by TOKYOGAS（サブテキスト） */}
      <div className="mb-6 flex justify-center">
        <span className="text-xs text-[#c4c4c4]">powered by TOKYOGAS</span>
      </div>

      {/* ログインボタン */}
      <button className="w-[343px] h-[61px] bg-[#1b6aac] rounded-[10px] text-white font-bold text-[19px] tracking-[-0.41px] mb-4">myTOKYOGASでログイン</button>

      {/* 未契約者ボタン */}
      <button className="w-[343px] h-[61px] bg-[#dedede] rounded-[10px] text-[#5a5a5a] font-bold text-[19px] tracking-[-0.41px] mb-8">未契約者の方はこちら</button>

      {/* TOKYO GASロゴを下中央に配置 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center w-full">
        <Image src="/images/TOKYOGASS_LOGO.png" alt="TOKYOGAS Logo" width={100} height={32} priority />
      </div>
    </div>
  );
}
