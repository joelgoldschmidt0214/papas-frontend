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

// --- ダミーデータ（Context内に保持） ---
const dummyPosts: Post[] = [
  {
    post_id: 1,
    content:
      "豊洲の近くにできた焼肉屋さん美味しかった！今なら500円クーポンがあるらしい。",
    created_at: "2024-05-20T12:00:00Z",
    updated_at: "2024-05-20T12:00:00Z",
    author: {
      user_id: 1,
      username: "username-1",
      display_name: "グルメな豊洲民",
      profile_image_url: "/icons/icon_image_01.svg",
    },
    images: [],
    tags: [
      { tag_id: 1, tag_name: "お得情報", posts_count: 101 },
      { tag_id: 2, tag_name: "グルメ", posts_count: 250 },
    ],
    likes_count: 12,
    comments_count: 1,
    bookmarks_count: 3,
    is_liked: false,
    is_bookmarked: true,
  },
  {
    post_id: 2,
    content:
      "豊洲のららぽーとに行ってきたよ！雨の日でも楽しめるから子連れに最高✨",
    created_at: "2024-05-19T18:30:00Z",
    updated_at: "2024-05-19T18:30:00Z",
    author: {
      user_id: 2,
      username: "username-2",
      display_name: "豊洲ママ",
      profile_image_url: "/icons/icon_image_01.svg",
    },
    images: [{ image_url: "/images/facility_image.png", display_order: 1 }],
    tags: [
      { tag_id: 3, tag_name: "おすすめ施設", posts_count: 88 },
      { tag_id: 4, tag_name: "子育て", posts_count: 123 },
    ],
    likes_count: 32,
    comments_count: 4,
    bookmarks_count: 16,
    is_liked: true,
    is_bookmarked: false,
  },
];

// --- Contextの型定義 ---
type PostContextType = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (newPost: Post) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (posts.length > 0 || isLoading) {
      return;
    }

    console.log("Fetching timeline posts...");
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error("APIのURLが設定されていません。");
      }

      const response = await fetch(`${baseUrl}/api/v1/posts/timeline`);

      if (!response.ok) {
        throw new Error(
          `APIからのデータ取得に失敗しました (Status: ${response.status})`
        );
      }

      const fetchedPosts: Post[] = await response.json();
      setPosts(fetchedPosts);
    } catch (err) {
      // API通信に失敗した場合、エラーを設定する代わりにダミーデータを投稿として設定します。
      console.error(
        "API通信に失敗しました。フォールバックとしてダミーデータを表示します。",
        err
      );
      setPosts(dummyPosts);
    } finally {
      setIsLoading(false);
    }
  }, [posts.length, isLoading]);

  const addPost = useCallback((newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  const value = { posts, isLoading, error, fetchPosts, addPost };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
