import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "de" | "en";

type Translations = Record<string, { de: string; en: string }>;

const translations: Translations = {
  "nav.feed": { de: "Feed", en: "Feed" },
  "nav.about": { de: "Über mich", en: "About" },

  "feed.title": { de: "Feed", en: "Feed" },
  "feed.subtitle": {
    de: "Meine neuesten Aktivitäten aus dem Web.",
    en: "My latest activities from around the web.",
  },
  "feed.loading": { de: "Lade Inhalte...", en: "Loading content..." },
  "feed.empty": {
    de: "Keine Einträge für diesen Filter.",
    en: "No entries for this filter.",
  },

  "about.role": {
    de: "Gründer & Tech-Unternehmer mit Haltung",
    en: "Founder & tech entrepreneur with conviction",
  },
  "about.location": { de: "Schaffhausen, Schweiz", en: "Schaffhausen, Switzerland" },
  "about.intro": {
    de: "Für eine menschzentrierte, digitale Zukunft, die verbindet, befähigt – und alle einbezieht.",
    en: "For a human-centred digital future that connects, empowers – and includes everyone.",
  },
  "about.body": {
    de: "Ich entwickle digitale Lösungen mit Substanz – technologisch solide, menschlich gedacht. Mir geht es nicht um den nächsten Trend, sondern darum, was für Menschen und Organisationen wirklich funktioniert. Meine Vision: Eine digitale Zukunft, die den Menschen ins Zentrum stellt – in der Technologie nicht entfremdet, sondern verbindet, befähigt und Beteiligung fördert, besonders im demokratischen und öffentlichen Raum.",
    en: "I build digital solutions with substance – technologically sound, designed for people. I'm not chasing the next trend; I focus on what truly works for people and organisations. My vision: a digital future that puts people at the centre – where technology doesn't alienate but connects, empowers and fosters participation, especially in the democratic and public sphere.",
  },
  "about.education": { de: "Ausbildung", en: "Education" },
  "about.follow": { de: "Folge mir", en: "Follow me" },

  "footer.carbon": {
    de: "Nur 0,09 g CO₂ pro Besuch",
    en: "Only 0.09g CO₂ per visit",
  },
  "footer.github": { de: "Quellcode auf GitHub", en: "Source on GitHub" },

  "lang.toggle": { de: "Sprache wechseln", en: "Switch language" },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "de";
    const stored = localStorage.getItem("language") as Language | null;
    return stored === "en" || stored === "de" ? stored : "de";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const t = (key: keyof typeof translations) => translations[key]?.[language] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
