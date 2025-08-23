import { agent } from '../agent';

export async function getActivities() {
  return agent
    .get<Result<Activity[]>>('/Activities/GetActivities')
    .then((response) => response.data);
}
export async function getActivity(id: string) {
  return agent
    .get<Activity>(`/Activities/GetActivity?id=${id}`)
    .then((response) => response.data);
}
export async function createActivity(activity: Activity) {
  return agent
    .post<string>('/Activities/CreateActivity', activity)
    .then((response) => response.data);
}
export async function editActivity(activity: Activity) {
  return agent
    .put<Activity>(`/Activities/EditActivity`, activity)
    .then((response) => response.data);
}
export async function deleteActivity(id: string) {
  return agent
    .delete<void>(`/Activities/DeleteActivity?id=${id}`)
    .then((response) => response.data);
}
