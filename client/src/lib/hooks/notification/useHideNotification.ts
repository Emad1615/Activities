import { useMutation } from '@tanstack/react-query';
import { hideNotifications as hideNotificationsMethod } from '../../api/notification';
import { useNotification } from './useNotification';
import { runInAction } from 'mobx';

export const useHideNotification = () => {
  const { storeNotification } = useNotification();
  const {
    mutate: hideNotifications,
    isPending: loadinghideNotifications,
    error,
  } = useMutation({
    mutationFn: async (id: string) => await hideNotificationsMethod(id),
    onSuccess: async (_, id) => {
      console.log('Before:', storeNotification.notifications, 'Remove:', id);

      runInAction(() => {
        storeNotification.notifications.replace(
          storeNotification.notifications.filter((n) => n.id !== id)
        );
      });
      console.log('After:', storeNotification.notifications);
    },
  });
  return { hideNotifications, loadinghideNotifications, error };
};
