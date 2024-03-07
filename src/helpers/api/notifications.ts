import { APICore } from "./apiCore";

const api = new APICore();

function getNotificationsApi() {
  const baseUrl = "/getNotification"; 
  return api.get(`${baseUrl}`, {});
}

function notificationStatusApi(params: { notification_id: string | number }) {
  const baseUrl = "/makReadNotification";
  return api.create(`${baseUrl}`, { params });
}

export { getNotificationsApi, notificationStatusApi };
