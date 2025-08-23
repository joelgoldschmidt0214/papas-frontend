import type { Metadata } from "next";
import "./globals.css";
// PostProviderをインポートします
import { PostProvider } from "@/contexts/PostContext";

export const metadata: Metadata = {
  title: "TOMOSU -あなたの想いが、まちを灯す-",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* PostProviderでアプリケーションのメイン部分をラップします */}
        <PostProvider>
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-[440px] min-h-screen bg-white flex flex-col mx-auto shadow-lg">
              {children}
            </div>
          </div>
        </PostProvider>
      </body>
    </html>
  );
}
