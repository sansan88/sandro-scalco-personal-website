import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MastodonPost } from "@/types/feed";

interface MastodonFeedPost {
  id: string;
  content: string;
  createdAt: string;
  url: string;
  reblogs: number;
  favorites: number;
  image: string | null;
}

const fetchMastodonFeed = async (username: string, instance: string): Promise<MastodonPost[]> => {
  const { data, error } = await supabase.functions.invoke('fetch-mastodon-feed', {
    body: { username, instance },
  });

  if (error) {
    throw new Error(error.message);
  }

  const posts: MastodonFeedPost[] = data.posts || [];

  return posts.map((post) => ({
    id: `mastodon-${post.id}`,
    platform: "mastodon" as const,
    date: new Date(post.createdAt),
    url: post.url,
    content: post.content,
    reblogs: post.reblogs,
    favorites: post.favorites,
    image: post.image || undefined,
  }));
};

export const useMastodonFeed = (username: string, instance: string) => {
  return useQuery({
    queryKey: ['mastodon-feed', username, instance],
    queryFn: () => fetchMastodonFeed(username, instance),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
