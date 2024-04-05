import { NotificationsActionTypes } from "./constants";

export interface NotificationsActionType {
  type:
  | NotificationsActionTypes.API_RESPONSE_SUCCESS
  | NotificationsActionTypes.API_RESPONSE_ERROR
  | NotificationsActionTypes.GET_NOTIFICATIONS
  | NotificationsActionTypes.STATUS_NOTIFICATIONS
  | NotificationsActionTypes.REFRESH_NOTIFICATIONS;
  payload: {} | string;
}

export const notificationsApiResponseSuccess = (
  actionType: string,
  data: any
): NotificationsActionType => ({
  type: NotificationsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const notificationsApiResponseError = (
  actionType: string,
  error: any
): NotificationsActionType => ({
  type: NotificationsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, error },
});

export const getNotifications = (): NotificationsActionType => ({
  type: NotificationsActionTypes.GET_NOTIFICATIONS,
  payload: {},
});

export const readStatusNotification = (
  notification_id: string | number
): NotificationsActionType => ({
  type: NotificationsActionTypes.STATUS_NOTIFICATIONS,
  payload: { notification_id },
});

export const refreshNotifications = (): NotificationsActionType => ({
  type: NotificationsActionTypes.REFRESH_NOTIFICATIONS,
  payload: {},
})