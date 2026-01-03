import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import FeedFilter from "@/components/feed/FeedFilter";
import FeedCard from "@/components/feed/FeedCard";
import { sampleFeed } from "@/data/sampleFeed";
import { Platform } from "@/types/feed";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<Platform | "all">("all");

  const filteredFeed = useMemo(() => {
    if (activeFilter === "all") {
      return sampleFeed;
    }
    return sampleFeed.filter((item) => item.platform === activeFilter);
  }, [activeFilter]);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Feed</h1>
        <p className="text-muted-foreground">
          Meine neuesten Aktivitäten aus dem Web.
        </p>
      </div>

      <FeedFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="space-y-4">
        {filteredFeed.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>

      {filteredFeed.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Keine Einträge für diesen Filter.
        </p>
      )}
    </Layout>
  );
};

export default Index;
