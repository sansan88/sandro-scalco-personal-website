import { BlueskyPost } from "@/types/feed";
import CardWrapper from "./CardWrapper";

interface BlueskyCardProps {
  item: BlueskyPost;
}

const BlueskyCard = ({ item }: BlueskyCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon="🦋"
      platformName="Bluesky"
      platformColor="text-[hsl(208,100%,50%)]"
    >
      <p className="mb-3 text-foreground">{item.content}</p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>🔁 {item.reposts}</span>
        <span>❤️ {item.likes}</span>
      </div>
    </CardWrapper>
  );
};

export default BlueskyCard;
