import Link from "next/link";
import { PostDataLoader } from "@/components/functional/PostDataLoader";

export default function Home() {
  return (
    <>
      {/* ページが読み込まれた瞬間にデータ取得を開始するために設置します */}
      {/* このコンポーネントは画面には何も表示しません */}
      <PostDataLoader />
      <div className="flex flex-col h-full">
        {/* ヘッダー */}
        <header className="flex items-center justify-center p-8 border-b shadow-sm">
          <h1 className="text-4xl font-bold">ページ一覧</h1>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-grow items-center p-8">
          <ul className="space-y-8">
            <li>
              <Link
                href="/top"
                className="text-3xl pb-8 text-blue-600 underline hover:text-blue-800"
              >
                Top
              </Link>
            </li>
            <li>
              <Link
                href="/mytokyogas-login"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/home"
                className="text-3xl pb-8 text-blue-600 underline hover:text-blue-800"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/timeline"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Timeline
              </Link>
            </li>
            <li>
              <Link
                href="/surveys"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Surveys
              </Link>
            </li>
            <li>
              <Link
                href="/mypage"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Mypage
              </Link>
            </li>
            <li>
              <Link
                href="/profile-edit"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Profile Edit
              </Link>
            </li>
            <li>
              <Link
                href="/compose"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Compose
              </Link>
            </li>
            <li>
              <Link
                href="/following"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Following
              </Link>
            </li>
            <li>
              <Link
                href="/followers"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Followers
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                className="text-3xl text-blue-600 underline hover:text-blue-800"
              >
                Notifications
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}
