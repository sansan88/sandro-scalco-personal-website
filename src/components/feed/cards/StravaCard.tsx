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

const getActivityEmoji = (type: string): string => {
  switch (type) {
    case 'Hike':
      return '🥾';
    case 'Trail Run':
    case 'TrailRun':
      return '🏔️';
    case 'Run':
      return '🏃';
    case 'Ride':
      return '🚴';
    case 'Swim':
      return '🏊';
    case 'Walk':
      return '🚶';
    default:
      return '🏃';
  }
};

const StravaCard = ({ item }: StravaCardProps) => {
  return (
    <CardWrapper
      date={item.date}
      url={item.url}
      icon={getActivityEmoji(item.type)}
      platformName="Strava"
      platformColor="text-[hsl(24,100%,50%)]"
    >
      {item.image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
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
        {item.elevation && item.elevation > 0 && (
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
