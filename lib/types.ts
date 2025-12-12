export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  published_at: string;
  url: string;
  tag_list: string[];
  reading_time_minutes: number;
  user: {
    name: string;
    profile_image: string;
  };
}
