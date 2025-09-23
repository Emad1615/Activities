import { agent } from '../agent';

export async function readNotification(id: string) {
  return await agent
    .put(`/readNotification?id=${id}`)
    .then((response) => response.data);
}

export async function readNotifications(id: string) {
  return await agent
    .put(`/hideNotification?id=${id}`)
    .then((response) => response.data);
}
