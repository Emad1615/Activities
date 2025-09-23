import { useMutation } from '@tanstack/react-query';
import { readNotification as readNotificationMethod } from '../../api/notification';
import { useNotification } from './useNotification';

export const useReadNotification = () => {
  const { storeNotification } = useNotification();
  const {
    mutate: readNotification,
    isPending: loadingReadNotification,
    error,
  } = useMutation({
    mutationFn: async (id: string) => await readNotificationMethod(id),
    onSuccess: () => {
      storeNotification.hubConnection?.invoke('LoadNotifications');
    },
  });
  return { readNotification, loadingReadNotification, error };
};
