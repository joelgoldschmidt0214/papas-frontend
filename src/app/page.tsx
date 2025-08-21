import Link from "next/link";

export default function Home() {
  return (
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
              href="/home"
              className="text-3xl pb-8 text-blue-600 underline hover:text-blue-800"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="text-3xl text-blue-600 underline hover:text-blue-800"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/login/confirm"
              className="text-3xl text-blue-600 underline hover:text-blue-800"
            >
              Login Confirm
            </Link>
          </li>
          <li>
            <Link
              href="/mypage"
              className="text-3xl text-blue-600 underline hover:text-blue-800"
            >
              My Page
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
