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
  IsGoing?: boolean;
  IsHost?: boolean;
  hostDisplayName?: string;
  hostUserId?: string;
  attendees?: User[];
  hostImageUrl: string;
};
type ChatComment = {
  id: string;
  body: string;
  createDateTime: Date;
  userId: string;
  displayName: string;
  imageUrl: string;
};
type NotificationT = {
  id: string;
  description: string;
  isRead: boolean;
  readDateTime: Date;
  isHidden: boolean;
  hiddenDateTime: Date;
  createdAt: Date;
  forAll: boolean;
  notifierId: string;
  notifierName: string;
  notifierImageUrl: string;
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
  id: string;
  displayName: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  birthDate?: Date;
  phoneNumber: string;
  gender?: boolean;
  isHost: boolean;
};

type Result<T> = {
  value: T;
  error: string | null;
  isSuccess: boolean;
  status: number;
};

type Photo = {
  id: string;
  publicId: string;
  url: string;
  userId: string;
};
