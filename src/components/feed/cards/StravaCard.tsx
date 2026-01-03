import { StravaActivity } from "@/types/feed";
import CardWrapper from "./CardWrapper";

interface StravaCardProps {
  item: StravaActivity;
}

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
};

const StravaCard = ({ item }: StravaCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon="🏃"
      platformName="Strava"
      platformColor="text-[hsl(24,100%,50%)]"
    >
      <h3 className="mb-3 font-semibold">{item.title}</h3>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Distanz</span>
          <span className="font-medium">{item.distance.toFixed(1)} km</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Zeit</span>
          <span className="font-medium">{formatDuration(item.duration)}</span>
        </div>
        {item.elevation && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Höhenmeter</span>
            <span className="font-medium">{item.elevation} m</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Typ</span>
          <span className="font-medium">{item.type}</span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default StravaCard;
