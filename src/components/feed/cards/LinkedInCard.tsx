import { LinkedInPost } from "@/types/feed";
import CardWrapper from "./CardWrapper";

interface LinkedInCardProps {
  item: LinkedInPost;
}

const LinkedInCard = ({ item }: LinkedInCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon="💼"
      platformName="LinkedIn"
      platformColor="text-[hsl(210,83%,41%)]"
    >
      {item.title && (
        <h3 className="mb-2 font-semibold">{item.title}</h3>
      )}
      <p className="text-foreground line-clamp-3">{item.content}</p>
    </CardWrapper>
  );
};

export default LinkedInCard;
