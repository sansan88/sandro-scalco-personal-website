import { MediumArticle } from "@/types/feed";
import CardWrapper from "./CardWrapper";

interface MediumCardProps {
  item: MediumArticle;
}

const MediumCard = ({ item }: MediumCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon="📝"
      platformName="Medium"
      platformColor="text-foreground"
    >
      <h3 className="mb-2 text-lg font-semibold leading-tight group-hover:text-primary/80">
        {item.title}
      </h3>
      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
        {item.excerpt}
      </p>
      <span className="text-xs text-muted-foreground">{item.readingTime}</span>
    </CardWrapper>
  );
};

export default MediumCard;
