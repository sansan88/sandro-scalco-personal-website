import { Platform } from "@/types/feed";
import { cn } from "@/lib/utils";

interface FeedFilterProps {
  activeFilter: Platform | "all";
  onFilterChange: (filter: Platform | "all") => void;
}

const filters: { value: Platform | "all"; label: string; icon: string }[] = [
  { value: "all", label: "Alle", icon: "✨" },
  { value: "medium", label: "Medium", icon: "📝" },
  { value: "mastodon", label: "Mastodon", icon: "🐘" },
  { value: "bluesky", label: "Bluesky", icon: "🦋" },
  { value: "linkedin", label: "LinkedIn", icon: "💼" },
  { value: "strava", label: "Strava", icon: "🏃" },
];

const FeedFilter = ({ activeFilter, onFilterChange }: FeedFilterProps) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeFilter === filter.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FeedFilter;
