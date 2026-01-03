import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GitHubRepo } from "@/types/feed";

export const useGitHubFeed = (username: string) => {
  return useQuery({
    queryKey: ["github-repos", username],
    queryFn: async (): Promise<GitHubRepo[]> => {
      console.log("Fetching GitHub repos for:", username);
      
      const { data, error } = await supabase.functions.invoke("fetch-github-repos", {
        body: { username },
      });

      if (error) {
        console.error("Error fetching GitHub repos:", error);
        throw error;
      }

      if (!data || data.error) {
        console.error("GitHub API error:", data?.error);
        throw new Error(data?.error || "Failed to fetch GitHub repos");
      }

      console.log("GitHub repos fetched:", data.length);
      
      // Convert date strings back to Date objects
      return data.map((repo: any) => ({
        ...repo,
        date: new Date(repo.date),
      }));
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
