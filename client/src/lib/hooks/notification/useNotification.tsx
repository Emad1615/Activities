import {
  HubConnectionBuilder,
  HubConnectionState,
  type HubConnection,
} from '@microsoft/signalr';
import { runInAction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

export const useNotification = () => {
  const created = useRef(false);
  const storeNotification = useLocalObservable(() => ({
    hubConnection: null as HubConnection | null,
    notifications: [] as NotificationT[],
    notifyAlert: false as boolean,
    createHubConnection() {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_NOTIFICATIONS_URL}`, {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();
      this.hubConnection
        .start()
        .catch((error) => console.log('Error connecting to server: ', error));
      this.hubConnection.on('ReceiveNotification', (notification) => {
        runInAction(() => {
          this.notifications.unshift(notification);
          this.notifyAlert = true;
        });
      });
      this.hubConnection.on('LoadNotifications', (notification) => {
        runInAction(() => {
          this.notifications = notification;
          this.notifyAlert = false;
        });
      });
    },
    stopHubConnection() {
      if (this.hubConnection?.state == HubConnectionState.Connected) {
        this.hubConnection
          .stop()
          .catch((error) => console.log('Error stopping connection: ', error));
      }
    },
  }));
  useEffect(() => {
    if (!created.current) {
      storeNotification.createHubConnection();
      created.current = true;
    }
    // return () => {
    //   storeNotification.stopHubConnection();
    //   storeNotification.notifications = [];
    // };
  }, [storeNotification]);
  return { storeNotification };
};
