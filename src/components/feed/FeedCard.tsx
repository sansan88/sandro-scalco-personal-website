import { FeedItem } from "@/types/feed";
import MediumCard from "./cards/MediumCard";
import MastodonCard from "./cards/MastodonCard";
import BlueskyCard from "./cards/BlueskyCard";
import LinkedInCard from "./cards/LinkedInCard";
import StravaCard from "./cards/StravaCard";

interface FeedCardProps {
  item: FeedItem;
}

const FeedCard = ({ item }: FeedCardProps) => {
  switch (item.platform) {
    case "medium":
      return <MediumCard item={item} />;
    case "mastodon":
      return <MastodonCard item={item} />;
    case "bluesky":
      return <BlueskyCard item={item} />;
    case "linkedin":
      return <LinkedInCard item={item} />;
    case "strava":
      return <StravaCard item={item} />;
    default:
      return null;
  }
};

export default FeedCard;
