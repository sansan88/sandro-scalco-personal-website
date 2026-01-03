import { GitHubRepo } from "@/types/feed";
import CardWrapper from "./CardWrapper";

interface GitHubCardProps {
  item: GitHubRepo;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Java: "bg-orange-500",
  HTML: "bg-red-500",
  CSS: "bg-purple-500",
  SCSS: "bg-pink-500",
};

const GitHubCard = ({ item }: GitHubCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon="🐙"
      platformName="GitHub"
      platformColor="text-gray-600 dark:text-gray-400"
    >
      <h3 className="mb-2 font-mono text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {item.name}
      </h3>
      {item.description && (
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {item.language && (
          <div className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${languageColors[item.language] || "bg-gray-400"}`} />
            <span>{item.language}</span>
          </div>
        )}
        {item.stars > 0 && (
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{item.stars}</span>
          </div>
        )}
        {item.forks > 0 && (
          <div className="flex items-center gap-1">
            <span>🍴</span>
            <span>{item.forks}</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default GitHubCard;
