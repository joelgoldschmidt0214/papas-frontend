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
    const totalDisplayTime = 1500;

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
      {/* ページが読み込まれた瞬間にデータ取得を開始するために設置します */}
      {/* このコンポーネントは画面には何も表示しません */}
      <PostDataLoader />
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isVisible}
      >
        <p className="text-xl font-semibold text-gray-700 animate-pulse mb-8">
          あなたの街を作っています...
        </p>
        <div className="text-center">
          {/* アニメーションを適用するラッパー */}
          <div className="mb-8 w-64">
            {" "}
            {/* w-64 の部分で画像の最大幅を調整 */}
            <Image
              src={PATHS.appLogo}
              alt="TOMOSU ロゴ"
              width={144 * 2}
              height={168 * 2}
              priority // 最初に表示される重要な画像なのでpriorityを指定
              className="animate-reveal-from-bottom" // Step 1 で作成したクラスを適用！
            />
          </div>

          {/* TOMOSUロゴフォント */}
          <div className="mb-6 flex justify-center">
            <Image
              src={PATHS.appFontLogo}
              alt="TOMOSU ロゴフォント"
              width={228 * 2}
              height={65 * 2}
              className="h-auto w-44 md:w-48"
            />
          </div>
        </div>
      </div>
    </>
  );
}
