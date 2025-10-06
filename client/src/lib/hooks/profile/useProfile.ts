import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AddImage,
  DeleteImage,
  EditProfile,
  Follow,
  GetFollowingList,
  GetUserPhotos,
  GetUserProfile,
  SetAsMainImage,
} from '../../api/profile';
import { useMemo } from 'react';

export const useProfile = (id?: string, predicate?: string) => {
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading: loadingProfile } = useQuery<User>({
    queryKey: ['profile', id],
    queryFn: async () => await GetUserProfile(id!),
    enabled: !!id,
  });

  const { data: userPhoto, isLoading: loadingPhoto } = useQuery<Photo[]>({
    queryKey: ['photos', id],
    queryFn: async () => await GetUserPhotos(id!),
    enabled: !!id,
  });

  const { mutate: uploadImage, isPending: loadingImage } = useMutation({
    mutationFn: async (file: Blob) => await AddImage(file),
    onSuccess: async (photo: Photo) => {
      queryClient.invalidateQueries({
        queryKey: ['photos', id],
      });
      await queryClient.setQueryData(['profile', id], (data: User) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
      queryClient.setQueryData(['user'], (data: User) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
    },
  });

  const { mutate: SetAsMain, isPending: loadingAsMain } = useMutation({
    mutationFn: async (photo: Photo) => await SetAsMainImage(photo.id),
    onSuccess: async (_, photo) => {
      queryClient.invalidateQueries({
        queryKey: ['photos', id],
      });
      queryClient.setQueryData(['profile', id], (profileData: User) => {
        if (!profileData) return profileData;
        return { ...profileData, imageUrl: photo.url } as User;
      });
      queryClient.setQueryData(['user'], (userData: User) => {
        if (!userData) return userData;
        return { ...userData, imageUrl: photo.url } as User;
      });
    },
  });
  const { mutate: DeletePhoto, isPending: loadingDelete } = useMutation({
    mutationFn: async (photoId: string) => await DeleteImage(photoId),
    onSuccess: async (_, photoId) => {
      queryClient.setQueryData(['photos', id], (photos: Photo[]) => {
        return photos.filter((x) => x.id !== photoId);
      });
    },
  });
  const { mutate: UpdateProfile, isPending: loadingUpdateProfile } =
    useMutation({
      mutationFn: async (data: User) => await EditProfile(data),
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ['profile', id],
        });
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
      },
    });
  const isCurrentUser = useMemo(() => {
    return id === queryClient.getQueryData<User>(['user'])?.id;
  }, [id, queryClient]);

  const { mutate: FollowToggle, isPending: LoadingFollowToggle } = useMutation({
    mutationFn: async () => Follow(id!),
    onSuccess: async () => {
      queryClient.setQueryData(['profile', id], (profile: User) => {
        queryClient.invalidateQueries({
          queryKey: ['followings', id, 'followers'],
        });
        if (!profile || profile.followersCount === undefined) return profile;
        return {
          ...profile,
          following: !profile.following,
          followersCount: profile.following
            ? profile.followersCount - 1
            : profile.followersCount + 1,
        };
      });
    },
  });
  const { data: FollowingList, isLoading: LoadingFollowingList } = useQuery({
    queryKey: ['followings', id, predicate],
    queryFn: async () => await GetFollowingList(id!, predicate!),
    enabled: !!id && !!predicate,
  });
  return {
    userProfile,
    loadingProfile,
    userPhoto,
    loadingPhoto,
    isCurrentUser,
    uploadImage,
    loadingImage,
    SetAsMain,
    loadingAsMain,
    DeletePhoto,
    loadingDelete,
    UpdateProfile,
    loadingUpdateProfile,
    FollowToggle,
    LoadingFollowToggle,
    FollowingList,
    LoadingFollowingList,
  };
};
