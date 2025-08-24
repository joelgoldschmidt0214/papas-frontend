"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PostDataLoader } from "@/components/functional/PostDataLoader";

// ロゴ画像のパス
const PATHS = {
  appLogo: "/images/app_logo.png",
  appFontLogo: "/images/app_logo_font.png",
};

export default function Loading() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // スプラッシュ画面全体の表示時間を設定（ミリ秒単位でアニメーション時間より長くします）
    const totalDisplayTime = 3500;

    const timer = setTimeout(() => {
      setIsVisible(false); // フェードアウト開始

      setTimeout(() => {
        router.push("/home"); // 遷移先
      }, 200); // フェードアウトの時間
    }, totalDisplayTime);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <PostDataLoader />
      {/* ★★★ ここからが大きな変更点 ★★★ */}
      {/* fixedをやめ、flexboxで中央揃えを実現する */}
      {/* flex-1: 親要素(flex-col)の残りの空間をすべて埋める */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse mb-8">
          あなたの街を作っています...
        </p>
        <div className="text-center">
          {/* アニメーションを適用するラッパー */}
          <div className="mb-8 w-44">
            {" "}
            {/* w-64 の部分で画像の最大幅を調整 */}
            <Image
              src={PATHS.appLogo}
              alt="TOMOSU ロゴ"
              width={144}
              height={168}
              priority // 最初に表示される重要な画像なのでpriorityを指定
              className="animate-reveal-from-bottom w-full h-auto" // Step 1 で作成したクラスを適用！
            />
          </div>

          {/* TOMOSUロゴフォント */}
          <div className="mb-6 flex justify-center w-44">
            <Image
              src={PATHS.appFontLogo}
              alt="TOMOSU ロゴフォント"
              width={228}
              height={65}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
