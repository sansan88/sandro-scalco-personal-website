import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StravaActivity } from "@/types/feed";

export const useStravaFeed = () => {
  return useQuery({
    queryKey: ["strava-activities"],
    queryFn: async (): Promise<StravaActivity[]> => {
      console.log("Fetching Strava activities...");

      const { data, error } = await supabase.functions.invoke("fetch-strava-activities");

      if (error) {
        console.error("Error fetching Strava activities:", error);
        throw error;
      }

      if (data.error) {
        console.error("Strava API error:", data.error);
        throw new Error(data.error);
      }

      return data.map((item: StravaActivity) => ({
        ...item,
        date: new Date(item.date),
      }));
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
