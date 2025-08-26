'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Menubar from "@/components/ui/menubar";

type NotificationType = 'like' | 'comment' | 'new_survey' | 'survey_response' | 'maintenance_notice';

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

const dummyNotificationsData: Notification[] = [
  {
    id: 1,
    type: 'like',
    message: (
      <>
        <span className="font-bold text-brand-blue">Tech0のみんな</span>さん、他7人があなたの投稿に
        <span className="font-bold text-brand-blue">「いいね」</span>しました。
      </>
    ),
    contentPreview: '海浜幕張の近くにできた焼肉屋さん美味しかった！今なら500円クーポンあるらしい。',
    actor: {
      profileImageUrl: '/icons/icon_image_01.svg',
    },
    targetUrl: '/mypage',
    createdAt: '2025-08-22T10:00:00Z',
  },
  {
    id: 2,
    type: 'comment',
    message: (
        <>
            <span className="font-bold text-brand-blue">江東区のパッチョくん</span>さんがあなたの投稿に
            <span className="font-bold text-brand-blue">「コメント」</span>しました。
        </>
    ),
    contentPreview: '美味しそうですね！海浜幕張行く機会があればぜひ行ってみたいです。500円クーポン情報もありがたいです！',
    actor: {
      profileImageUrl: '/icons/icon_image_01.svg',
    },
    targetUrl: '/mypage',
    createdAt: '2025-08-22T09:30:00Z',
  },
  {
    id: 3,
    type: 'new_survey',
    message: <span className="text-brand-blue">あなたのまちに新しいアンケートが公開されました</span>,
    contentPreview: '「子育て交流イベントに関するアンケート」が公開されました',
    targetUrl: '/surveys',
    createdAt: '2025-08-21T15:00:00Z',
  },
  {
    id: 4,
    type: 'survey_response',
    message: <span className="text-brand-blue">まちのアンケートに回答しました</span>,
    contentPreview: '「新しい店舗誘致に関するアンケート」に回答しました',
    targetUrl: '/surveys',
    createdAt: '2025-08-20T18:00:00Z',
  },
  {
    id: 5,
    type: 'maintenance_notice',
    message: <span className="text-brand-blue">メンテナンスのお知らせ</span>,
    contentPreview: '9月1日に定期メンテナンスを行います、詳しくはmyTOKYO GASにてご確認ください',
    targetUrl: 'https://members.tokyo-gas.co.jp/contents/public/news/list.html',
    createdAt: '2025-08-20T18:00:00Z',
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(dummyNotificationsData);
  }, []);

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[440px] flex-col bg-white text-text-primary">
      <header
        className={`
          flex-shrink-0 flex items-center justify-between
          p-2 h-12 bg-white border-b sticky top-0 z-10
        `}
      >
        <Link href="/home" className="p-2">
          <Image src="/icons/arrow_left.svg" alt="戻る" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-base absolute left-1/2 -translate-x-1/2">
          お知らせ
        </h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-3 pb-24">
        <div className="space-y-3">
          {notifications.map((notification) => {
            const isExternalLink = notification.targetUrl.startsWith('http');

            const cardContent = (
              <div
                className={`bg-white rounded-lg shadow-sm p-4 border
                  ${
                    notification.type === 'like' || notification.type === 'comment'
                      ? 'border-component-pink'
                      : 'border-gray-200'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8">
                    {notification.type === 'like' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>}
                    {notification.type === 'comment' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.464.037.893.281 1.153.671L12 21l3.662-3.978c.26-.289.69-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.344 48.344 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>}
                    {notification.type === 'new_survey' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
                    {notification.type === 'survey_response' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    {notification.type === 'maintenance_notice' && <svg className="text-brand-blue" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.226l.554-.225a2.25 2.25 0 012.122 0l.553.225c.55.219 1.02.684 1.11 1.226l.092.548a2.25 2.25 0 003.323 1.255l.48-.288a2.25 2.25 0 012.434.629l.444.693a2.25 2.25 0 01-.48 2.923l-.38.381a2.25 2.25 0 000 3.182l.38.381a2.25 2.25 0 01.48 2.923l-.444.693a2.25 2.25 0 01-2.434.629l-.48-.288a2.25 2.25 0 00-3.323 1.255l-.092.548c-.09.542-.56 1.007-1.11 1.226l-.554.225a2.25 2.25 0 01-2.122 0l-.553-.225c-.55-.219-1.02-.684-1.11-1.226l-.092-.548a2.25 2.25 0 00-3.323-1.255l-.48.288a2.25 2.25 0 01-2.434-.629l-.444-.693a2.25 2.25 0 01.48-2.923l.38-.381a2.25 2.25 0 000-3.182l-.38-.381a2.25 2.25 0 01-.48-2.923l.444-.693a2.25 2.25 0 012.434-.629l.48.288a2.25 2.25 0 003.323-1.255l.092-.548z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
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
                        <p className="text-xs text-gray-600 truncate">{notification.contentPreview}</p>
                      </div>
                    )}
                    {notification.contentPreview && (notification.type === 'new_survey' || notification.type === 'survey_response' || notification.type === 'maintenance_notice') && (
                        <div className="mt-2 p-3 bg-gray-100 rounded">
                          <p className="text-xs text-gray-700">{notification.contentPreview}</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            );

            return isExternalLink ? (
              <a
                href={notification.targetUrl}
                key={notification.id}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {cardContent}
              </a>
            ) : (
              <Link
                href={notification.targetUrl}
                key={notification.id}
                className="block"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="flex-shrink-0">
        <Menubar active="mypage" />
      </footer>
    </div>
  );
};

export default NotificationsPage;