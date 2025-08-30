import { agent } from '../agent';

export const GetUserProfile = async (id: string) => {
  return await agent
    .get<User>(`/Profiles/${id}/user-profile`)
    .then((response) => response.data);
};

export const GetUserPhotos = async (id: string) => {
  return await agent
    .get<Photo[]>(`Profiles/${id}/photos`)
    .then((response) => response.data);
};
