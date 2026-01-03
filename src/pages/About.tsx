import Layout from "@/components/Layout";
import { ExternalLink } from "lucide-react";

const socialLinks = [
  { name: "Medium", url: "https://medium.com/@sandroscalco", icon: "📝" },
  { name: "Mastodon", url: "https://mastodon.social/@sandro", icon: "🐘" },
  { name: "Bluesky", url: "https://bsky.app/profile/sandro", icon: "🦋" },
  { name: "LinkedIn", url: "https://linkedin.com/in/sandro-scalco", icon: "💼" },
  { name: "Strava", url: "https://strava.com/athletes/sandro", icon: "🏃" },
];

const About = () => {
  return (
    <Layout>
      <div className="max-w-2xl">
        <div className="mb-8 flex items-start gap-6">
          <div className="h-24 w-24 shrink-0 rounded-full bg-secondary" />
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Sandro Scalco</h1>
            <p className="text-lg text-muted-foreground">
              Entwickler, Blogger & Sportler
            </p>
          </div>
        </div>

        <div className="prose prose-neutral mb-12">
          <p className="text-foreground leading-relaxed">
            Willkommen auf meiner persönlichen Website! Hier findest du alle meine 
            Aktivitäten aus verschiedenen Plattformen an einem Ort. Ich schreibe über 
            Technologie, teile Gedanken auf Social Media und dokumentiere meine 
            sportlichen Aktivitäten.
          </p>
          <p className="text-foreground leading-relaxed">
            Diese Seite aggregiert automatisch meine Inhalte von Medium, Mastodon, 
            Bluesky, LinkedIn und Strava, damit du nichts verpasst.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Folge mir</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/30 hover:bg-secondary/50"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
                <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
