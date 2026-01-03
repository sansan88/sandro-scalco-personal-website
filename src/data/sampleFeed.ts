import { FeedItem } from "@/types/feed";

export const sampleFeed: FeedItem[] = [
  {
    id: "li-1",
    platform: "linkedin",
    date: new Date("2025-12-29"),
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7411347442849280000",
    content: "🅳🅰🆃🅰 🆂🆄🆁🆅🅸🆅🅰🅻 🅺🅸🆃 für 2026: 🅳🅰🆃🅰 🅳-🅳🅰🆈 🅶🅴🅷ö🆁🆃 🅳🅸🆁.\n\nIn den letzten Monaten habe ich mich intensiv mit datensouveräner KI beschäftigt. Eine Frage kam dabei immer wieder: Wo landen meine Daten eigentlich, wenn ich Microsoft CoPilot meine E-Mails lesen lasse?\n\nDie Antwort hat mir nicht gefallen.\n\nAlso habe ich, nachdem ich mich von Office 365 verabschiedet habe, eine Alternative gebaut: Ein Open-Source-Tool, das E-Mails direkt via IMAP mit Open WebUI verbindet.\n\n#Datensouveränität #OpenSource #KI #SelfHosted #DigitaleSelbstbestimmung",
  },
  {
    id: "li-2",
    platform: "linkedin",
    date: new Date("2025-12-22"),
    url: "https://www.linkedin.com/pulse/von-ki-experimenten-zu-kontrollierter-wertsch%C3%B6pfung-ki-sandro-scalco-m3llf",
    title: "Von KI-Experimenten zu kontrollierter Wertschöpfung: Datensouveräne KI für KMUs",
    content: "Warum \"Was ist dein ChatGPT-Alter?\" vielleicht nicht deine erste KI-Frage in deinem Unternehmen in der ☕️-Pause sein sollte",
  },
  {
    id: "li-3",
    platform: "linkedin",
    date: new Date("2025-12-01"),
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7401338548550868992",
    content: "Spannende Entwicklungen im Bereich digitale Demokratie und E-Collecting. Die Zukunft der politischen Partizipation wird digital gestaltet – und wir sind mittendrin.\n\nBei liitu arbeiten wir an Lösungen, die demokratische Prozesse nicht nur digitalisieren, sondern verbessern und inklusiver machen.",
  },
  {
    id: "strava-1",
    platform: "strava",
    date: new Date("2025-01-01"),
    url: "https://strava.com/activities/123",
    title: "Morning Run",
    type: "Run",
    distance: 8.5,
    duration: 2580,
    elevation: 120,
  },
  {
    id: "strava-2",
    platform: "strava",
    date: new Date("2024-12-27"),
    url: "https://strava.com/activities/124",
    title: "Weekend Bike Ride",
    type: "Ride",
    distance: 42.3,
    duration: 5400,
    elevation: 380,
  },
];
