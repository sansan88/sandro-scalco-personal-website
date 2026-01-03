import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlueskyPost } from "@/types/feed";

interface BlueskyFeedPost {
  id: string;
  content: string;
  createdAt: string;
  url: string;
  likes: number;
  reposts: number;
  image: string | null;
}

const fetchBlueskyFeed = async (handle: string): Promise<BlueskyPost[]> => {
  const { data, error } = await supabase.functions.invoke('fetch-bluesky-feed', {
    body: { handle },
  });

  if (error) {
    throw new Error(error.message);
  }

  const posts: BlueskyFeedPost[] = data.posts || [];

  return posts.map((post) => ({
    id: `bluesky-${post.id}`,
    platform: "bluesky" as const,
    date: new Date(post.createdAt),
    url: post.url,
    content: post.content,
    likes: post.likes,
    reposts: post.reposts,
    image: post.image || undefined,
  }));
};

export const useBlueskyFeed = (handle: string) => {
  return useQuery({
    queryKey: ['bluesky-feed', handle],
    queryFn: () => fetchBlueskyFeed(handle),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
