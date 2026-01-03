import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MediumArticle } from "@/types/feed";

interface MediumFeedItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const fetchMediumFeed = async (username: string): Promise<MediumArticle[]> => {
  const { data, error } = await supabase.functions.invoke('fetch-medium-feed', {
    body: { username },
  });

  if (error) {
    throw new Error(error.message);
  }

  const items: MediumFeedItem[] = data.items || [];

  return items.map((item, index) => ({
    id: `medium-${index}-${new Date(item.pubDate).getTime()}`,
    platform: "medium" as const,
    date: new Date(item.pubDate),
    url: item.link,
    title: item.title,
    excerpt: item.description,
    readingTime: `${Math.max(3, Math.ceil(item.description.length / 200))} min`,
  }));
};

export const useMediumFeed = (username: string) => {
  return useQuery({
    queryKey: ['medium-feed', username],
    queryFn: () => fetchMediumFeed(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
