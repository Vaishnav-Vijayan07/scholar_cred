import { NotificationsActionTypes } from "./constants";

interface Notification {
  notification_id: number;
  message: string;
  created_at: string;
  read_status: boolean;
  user_id: number;
}

interface State {
  notifications: Notification[];
  initialLoading: boolean;
  error?: null | string;
  notificationRefresh: boolean;
}

const INIT_STATE = {
  notifications: [],
  initialLoading: false,
  error: null,
  notificationRefresh: false,
};

export interface StatusActionType {
  type:
    | NotificationsActionTypes.API_RESPONSE_SUCCESS
    | NotificationsActionTypes.API_RESPONSE_ERROR
    | NotificationsActionTypes.GET_NOTIFICATIONS
    | NotificationsActionTypes.REFRESH_NOTIFICATIONS
    | NotificationsActionTypes.STATUS_NOTIFICATIONS;
  payload: {
    actionType?: string;
    data?: any;
    error?: any;
    message?: string;
  };
}

const Notifications = (
  state: State = INIT_STATE,
  action: StatusActionType
): any => {
  switch (action.type) {
    case NotificationsActionTypes.API_RESPONSE_SUCCESS: {
      switch (action.payload.actionType) {
        case NotificationsActionTypes.GET_NOTIFICATIONS: {
          return {
            ...state,
            notifications: action.payload.data,
            initialLoading: false,
          };
        }
        case NotificationsActionTypes.STATUS_NOTIFICATIONS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
          };
        }
        default:
          return { ...state };
      }
    }
    case NotificationsActionTypes.API_RESPONSE_ERROR: {
      switch (action.payload.actionType) {
        case NotificationsActionTypes.GET_NOTIFICATIONS: {
          return {
            ...state,
            error: action.payload.error,
            initialLoading: false,
          };
        }
        case NotificationsActionTypes.STATUS_NOTIFICATIONS: {
          return {
            ...state,
            error: action.payload.error,
            initialLoading: false,
            loading: false,
          };
        }
        default:
          return { ...state };
      }
    }
    case NotificationsActionTypes.GET_NOTIFICATIONS: {
      return {
        ...state,
        initialLoading: true,
      };
    }
    case NotificationsActionTypes.REFRESH_NOTIFICATIONS: {
      return {
        ...state,
        notificationRefresh: !state.notificationRefresh,
      };
    }
    case NotificationsActionTypes.STATUS_NOTIFICATIONS: {
      return {
        ...state,
        initialLoading: true,
        loading: true,
      };
    }
    default:
      return { ...state };
  }
};

export default Notifications;
