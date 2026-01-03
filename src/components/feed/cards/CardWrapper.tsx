import { format } from "date-fns";
import { de } from "date-fns/locale";

interface CardWrapperProps {
  children: React.ReactNode;
  date: Date;
  url: string;
  icon: string;
  platformName: string;
  platformColor: string;
}

const CardWrapper = ({ children, date, url, icon, platformName, platformColor }: CardWrapperProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border bg-card p-6 transition-all hover:border-muted-foreground/30 hover:shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className={`text-xs font-medium ${platformColor}`}>{platformName}</span>
        </div>
        <time className="text-xs text-muted-foreground">
          {format(date, "d. MMM yyyy", { locale: de })}
        </time>
      </div>
      {children}
    </a>
  );
};

export default CardWrapper;
