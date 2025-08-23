"use client";

import { useEffect } from "react";
import { usePosts } from "@/contexts/PostContext";

/**
 * このコンポーネントはUIを持ちません。
 * マウントされた時に投稿データをプリフェッチする役割だけを担います。
 */
export const PostDataLoader = () => {
  const { fetchPosts } = usePosts();

  useEffect(() => {
    // ページが読み込まれた時に一度だけデータ取得を開始します
    fetchPosts();
  }, [fetchPosts]);

  // 画面には何もレンダリングしない
  return null;
};
