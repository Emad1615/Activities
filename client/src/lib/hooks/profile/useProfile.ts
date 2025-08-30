import { useQuery } from '@tanstack/react-query';
import { GetUserPhotos, GetUserProfile } from '../../api/profile';

export const useProfile = (id?: string) => {
  const { data: userProfile, isLoading: loadingProfile } = useQuery<User>({
    queryKey: ['profile', id],
    queryFn: async () => await GetUserProfile(id!),
  });
  const { data: userPhoto, isLoading: loadingPhoto } = useQuery<Photo[]>({
    queryKey: ['photos', id],
    queryFn: async () => await GetUserPhotos(id!),
  });
  return { userProfile, loadingProfile, userPhoto, loadingPhoto };
};
