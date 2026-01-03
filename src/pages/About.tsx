import Layout from "@/components/Layout";
import { ExternalLink } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const socialLinks = [
  { name: "Medium", url: "https://medium.com/@sandroscalco", icon: "📝" },
  { name: "Mastodon", url: "https://mastodon.social/@sandroscalco", icon: "🐘" },
  { name: "Bluesky", url: "https://bsky.app/profile/sandroscalco.bsky.social", icon: "🦋" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/sandroscalco", icon: "💼" },
  { name: "Strava", url: "https://strava.com/athletes/sandro", icon: "🏃" },
];

const education = [
  { 
    degree: "EMBA", 
    field: "Management HWZ - Advanced Management Program", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2024 - 2025" 
  },
  { 
    degree: "IMP", 
    field: "International Management Program", 
    school: "University of Virginia Darden School of Business", 
    year: "2025" 
  },
  { 
    degree: "MAS", 
    field: "Business Innovation", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2017 - 2019" 
  },
  { 
    degree: "CAS", 
    field: "Innovation Management", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2018 - 2019" 
  },
  { 
    degree: "CAS", 
    field: "Digital Masterclass", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2018" 
  },
  { 
    degree: "CAS", 
    field: "Change Management", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2017 - 2018" 
  },
  { 
    degree: "CAS", 
    field: "Consulting & Communication", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2017" 
  },
  { 
    degree: "CAS", 
    field: "General Management", 
    school: "HWZ Hochschule für Wirtschaft Zürich", 
    year: "2017" 
  },
];

const About = () => {
  return (
    <Layout>
      <div className="max-w-2xl">
        <div className="mb-8 flex items-start gap-6">
          <img 
            src={profilePhoto} 
            alt="Sandro Scalco" 
            className="h-24 w-24 shrink-0 rounded-full object-cover"
          />
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Sandro Scalco</h1>
            <p className="text-lg text-muted-foreground">
              Gründer von liitu & Digital Democracy Hub
            </p>
            <p className="text-sm text-muted-foreground">
              Schaffhausen, Schweiz
            </p>
          </div>
        </div>

        <div className="prose prose-neutral mb-12">
          <p className="text-foreground leading-relaxed">
            Für eine menschzentrierte, digitale Zukunft, die verbindet, befähigt – und alle einbezieht.
          </p>
          <p className="text-foreground leading-relaxed">
            Als Gründer von liitu entwickle ich digitale Lösungen, die von künstlicher Intelligenz 
            angetrieben und vom Menschen inspiriert sind. Unsere Vision: Eine digitale Zukunft, 
            die den Menschen ins Zentrum stellt – in der Technologie nicht entfremdet, sondern 
            verbindet, befähigt und Beteiligung fördert, besonders im demokratischen und öffentlichen Raum.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-lg font-semibold">Ausbildung</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {edu.degree}
                    </span>
                    <p className="mt-1 font-medium">{edu.field}</p>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
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
