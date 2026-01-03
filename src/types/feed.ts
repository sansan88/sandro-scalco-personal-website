export type Platform = "medium" | "mastodon" | "bluesky" | "linkedin" | "github";

export interface BaseFeedItem {
  id: string;
  platform: Platform;
  date: Date;
  url: string;
}

export interface MediumArticle extends BaseFeedItem {
  platform: "medium";
  title: string;
  excerpt: string;
  readingTime: string;
  thumbnail?: string;
}

export interface MastodonPost extends BaseFeedItem {
  platform: "mastodon";
  content: string;
  reblogs: number;
  favorites: number;
  image?: string;
}

export interface BlueskyPost extends BaseFeedItem {
  platform: "bluesky";
  content: string;
  likes: number;
  reposts: number;
  image?: string;
}

export interface LinkedInPost extends BaseFeedItem {
  platform: "linkedin";
  content: string;
  title?: string;
}

export interface GitHubRepo extends BaseFeedItem {
  platform: "github";
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

export type FeedItem = MediumArticle | MastodonPost | BlueskyPost | LinkedInPost | GitHubRepo;
