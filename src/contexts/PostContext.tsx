"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

// --- 共通の型定義 ---
// timeline/page.tsx から移動・再利用します
type Author = {
  user_id: number;
  username: string;
  display_name: string | null;
  profile_image_url: string | null;
};

type Tag = {
  tag_id: number;
  tag_name: string;
  posts_count: number;
};

type PostImage = {
  image_url: string;
  display_order: number;
};

export type Post = {
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  author: Author;
  images: PostImage[];
  tags: Tag[];
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
};

// --- Contextの型定義 ---
type PostContextType = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
};

// --- Contextの作成 ---
// デフォルト値はundefinedとして、Providerがない場合にエラーをスローするようにします
const PostContext = createContext<PostContextType | undefined>(undefined);

// --- Providerコンポーネントの作成 ---
// このコンポーネントがデータ管理のロジックをすべて担当します
export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API通信関数をuseCallbackでメモ化し、不要な再生成を防ぎます
  const fetchPosts = useCallback(async () => {
    // 既にデータがある場合や、ローディング中は再実行しない
    if (posts.length > 0 || isLoading) {
      return;
    }

    console.log("Fetching timeline posts..."); // 実行確認用ログ
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error("APIのURLが設定されていません。");
      }

      const response = await fetch(
        `${baseUrl}/api/v1/posts/timeline?skip=0&limit=20`
      );

      if (!response.ok) {
        throw new Error("APIからのデータ取得に失敗しました");
      }

      const fetchedPosts: Post[] = await response.json();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("API通信エラー:", err);
      // MVPではダミーデータは使わず、エラーとして扱う方針に変更も可能です
      setError(
        err instanceof Error ? err.message : "不明なエラーが発生しました。"
      );
    } finally {
      setIsLoading(false);
    }
  }, [posts.length, isLoading]); // 依存配列にposts.lengthとisLoadingを指定

  const value = { posts, isLoading, error, fetchPosts };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// --- カスタムフックの作成 ---
// これを使うことで、どのコンポーネントからも簡単にContextの値にアクセスできます
export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
