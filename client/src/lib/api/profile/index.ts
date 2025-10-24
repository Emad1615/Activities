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

export const AddImage = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  return agent
    .post('Profiles/Add-Photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => response.data);
};

export const SetAsMainImage = async (id: string) => {
  return await agent
    .put(`Profiles/${id}/setMain-photo`)
    .then((response) => response.data);
};
export const DeleteImage = async (id: string) => {
  return await agent
    .delete(`Profiles/${id}/delete-photo`)
    .then((response) => response.data);
};

export const EditProfile = async (userProfile: User) => {
  return await agent
    .put('Profiles/UpdateProfile', userProfile)
    .then((response) => response.data);
};

export const Follow = async (id: string) => {
  return await agent
    .post(`Profiles/${id}/follow`)
    .then((response) => response.data);
};
export const GetFollowingList = async (id: string, predicate: string) => {
  return await agent
    .get<User[]>(`Profiles/${id}/follow-list?predicate=${predicate}`)
    .then((response) => response.data);
};

export const GetProfileUserActivities = async ({
  pageParam,
  filter,
  userId,
}: {
  pageParam: unknown;
  filter: string;
  userId: string;
}) => {
  return await agent
    .get<PagedList<Activity, string>>(
      `Profiles/${userId}/profileUserActivities`,
      {
        params: {
          cursor: pageParam,
          pageSize: 10,
          filter: filter,
        },
      }
    )
    .then((response) => response.data);
};
