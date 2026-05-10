export type MediaType = "photo" | "video";

export interface Post {
  id: string;
  type: MediaType;
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  createdAt: string;
}

export type Category = "All" | "Wedding" | "Maternity" | "Baby" | "Puberty" | "Frames";
