import { agent } from '../agent';

export async function readNotification(id: string) {
  return await agent
    .put(`/Notifications/readNotification?id=${id}`)
    .then((response) => response.data);
}

export async function hideNotifications(id: string) {
  return await agent
    .put(`/Notifications/hideNotification?id=${id}`)
    .then((response) => response.data);
}
