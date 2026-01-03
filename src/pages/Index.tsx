import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Feed</h1>
        <p className="text-muted-foreground">
          Meine neuesten Aktivitäten aus dem Web.
        </p>
      </motion.div>

      <FeedFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredFeed.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
            >
              <FeedCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {filteredFeed.length === 0 && (
          <motion.p 
            className="py-12 text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Keine Einträge für diesen Filter.
          </motion.p>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Index;
