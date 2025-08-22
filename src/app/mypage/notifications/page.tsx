// ページコンポーネント内で状態管理(useState)やイベントハンドリング(onClickなど)を行うため、
// 'use client' ディレクティブをファイルの先頭に記述します。これにより、このコンポーネントはクライアントサイドでレンダリングされます。
'use client';

// 必要なモジュールやコンポーネントをインポートします。
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * お知らせの種類を定義する型。
 */
type NotificationType = 'like' | 'comment' | 'new_survey' | 'survey_response';

/**
 * お知らせ一件分のデータ構造を定義する型。
 */
type Notification = {
  id: number;
  type: NotificationType;
  message: ReactNode; 
  contentPreview?: string; 
  actor?: { 
    profileImageUrl: string;
  };
  targetUrl: string; 
  createdAt: string;
};

/**
 * APIからデータを取得するまでの間、画面に表示するためのダミーデータ。
 * 【修正】メッセージ内のキーワードに青色を適用するように修正しました。
 */
const dummyNotificationsData: Notification[] = [
  {
    id: 1,
    type: 'like',
    message: (
      <>
        <span className="font-bold text-brand-blue">Username-2</span>さん、他7人があなたの投稿に
        <span className="font-bold text-brand-blue">「いいね」</span>しました。
      </>
    ),
    contentPreview: '海浜幕張の近くにできた焼肉屋さん美味しかった！今なら500円クーポンあるらしい。',
    actor: {
      profileImageUrl: '/icons/icon_image_01.svg',
    },
    targetUrl: '/mypage/profile',
    createdAt: '2025-08-22T10:00:00Z',
  },
  {
    id: 2,
    type: 'comment',
    message: (
        <>
            <span className="font-bold text-brand-blue">Username-2</span>さんがあなたの投稿に
            <span className="font-bold text-brand-blue">「コメント」</span>しました。
        </>
    ),
    contentPreview: '美味しそうですね！海浜幕張行く機会があればぜひ行ってみたいです。500円クーポン情報もありがたいです！',
    actor: {
      profileImageUrl: '/icons/icon_image_01.svg',
    },
    targetUrl: '/mypage/profile',
    createdAt: '2025-08-22T09:30:00Z',
  },
  {
    id: 3,
    type: 'new_survey',
    message: <span className="text-brand-blue">あなたのまちに新しいアンケートが公開されました</span>,
    targetUrl: '/surveys?tab=unanswered',
    createdAt: '2025-08-21T15:00:00Z',
  },
  {
    id: 4,
    type: 'survey_response',
    message: <span className="text-brand-blue">まちのアンケートに回答しました</span>,
    targetUrl: '/surveys?tab=answered',
    createdAt: '2025-08-20T18:00:00Z',
  },
];

/**
 * お知らせページのメインコンポーネント
 */
const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(dummyNotificationsData);
  }, []);

  return (
    // 【修正】メインの背景色をFigmaに合わせて白に変更
    <div className="flex flex-col h-full bg-white text-text-primary">
      {/* ヘッダーエリア */}
      <header className="flex items-center justify-between p-2 h-12 bg-white border-b sticky top-0 z-10">
        <Link href="/mypage/profile" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          お知らせ
        </h1>
        <div className="w-8"></div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-grow overflow-y-auto p-3">
        {/* お知らせカードのリスト */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Link href={notification.targetUrl} key={notification.id} className="block">
              {/* 【修正】カードの枠線色をFigmaに合わせて再設定 */}
              <div
                className={`bg-white rounded-lg shadow-sm p-4 border
                  ${
                    notification.type === 'like' || notification.type === 'comment'
                      ? 'border-component-pink' // いいね・コメントはピンク(赤系)の枠線
                      : 'border-gray-200'       // それ以外はグレーの枠線
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  {/* 【修正】Figmaの線画アイコンと色を再現 */}
                  <div className="flex-shrink-0 w-8 h-8">
                    {notification.type === 'like' && <svg className="text-component-pink" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>}
                    {notification.type === 'comment' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.464.037.893.281 1.153.671L12 21l3.662-3.978c.26-.289.69-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.344 48.344 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>}
                    {notification.type === 'new_survey' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
                    {notification.type === 'survey_response' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">{notification.message}</p>
                    
                    {(notification.type === 'like' || notification.type === 'comment') && notification.actor && (
                      <div className="mt-2 flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Image
                          src={notification.actor.profileImageUrl}
                          alt=" "
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <p className="text-xs text-gray-600 truncate">
                          {notification.contentPreview}
                        </p>
                      </div>
                    )}

                     {(notification.type === 'new_survey' || notification.type === 'survey_response') && (
                        <div className="mt-2 p-4 h-12 bg-gray-100 rounded"></div>
                     )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;