type Activity = {
  id: string;
  title: string;
  category: string;
  description: string;
  isCancelled?: boolean;
  date: Date;
  city: string;
  venue: string;
  longitude?: number;
  latitude?: number;
};
type Category = {
  value: string;
  text: string;
};

type LocationIQSuggestions = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: LocationIQAddress;
};

type LocationIQAddress = {
  name: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  town?: string;
  village?: string;
  city?: string;
  county: string;
  state: string;
  postcode?: string;
  country: string;
  country_code: string;
};

type User = {
  displayName: string;
  Email: string;
  ImageUrl?: string;
  Bio?: string;
  BirthDate?: Date;
  PhoneNumber: string;
};

type Result<T> = {
  value: T;
  error: string | null;
  isSuccess: boolean;
  status: number;
};
