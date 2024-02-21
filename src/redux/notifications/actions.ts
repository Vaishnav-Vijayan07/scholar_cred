import { NotificationsActionTypes } from "./constants";

export interface NotificationsActionType {
  type:
    | NotificationsActionTypes.API_RESPONSE_SUCCESS
    | NotificationsActionTypes.API_RESPONSE_ERROR
    | NotificationsActionTypes.GET_NOTIFICATIONS;
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