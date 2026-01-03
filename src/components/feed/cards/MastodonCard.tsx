import { MastodonPost } from "@/types/feed";
import CardWrapper from "./CardWrapper";

interface MastodonCardProps {
  item: MastodonPost;
}

const MastodonCard = ({ item }: MastodonCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon="🐘"
      platformName="Mastodon"
      platformColor="text-[hsl(263,89%,50%)]"
    >
      {item.image && (
        <div className="mb-3 overflow-hidden rounded-md">
          <img 
            src={item.image} 
            alt="" 
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <p className="mb-3 text-foreground">{item.content}</p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>🔁 {item.reblogs}</span>
        <span>⭐ {item.favorites}</span>
      </div>
    </CardWrapper>
  );
};

export default MastodonCard;
