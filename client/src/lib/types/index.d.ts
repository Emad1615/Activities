export type Activity = {
  id: string;
  title: string;
  category: string;
  description: string;
  isCancelled?: boolean;
  date: string;
  city: string;
  venue: string;
  longitude?: number;
  latitude?: number;
};
