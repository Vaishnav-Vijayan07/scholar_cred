import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { NotificationsActionTypes } from "./constants";
import {
  notificationsApiResponseError,
  notificationsApiResponseSuccess,
  getNotifications as getNotificationsAction,
} from "./actions";
import {
  getNotificationsApi,
  notificationStatusApi,
} from "../../helpers/api/notifications";

function* getNotifications(): SagaIterator {
  try {
    
    const response = yield call(getNotificationsApi); 
    const data = response.data.data;
    yield put(
      notificationsApiResponseSuccess(
        NotificationsActionTypes.GET_NOTIFICATIONS,
        data
      )
    );
  } catch (error: any) {
    yield put(
      notificationsApiResponseError(
        NotificationsActionTypes.GET_NOTIFICATIONS,
        error
      )
    );
  }
}

function* notificationStatus({
  payload: { notification_id },
}: any): SagaIterator {
  try {
    const response = yield call(notificationStatusApi, notification_id);
    const data = response.data.message; 
    yield put(
      notificationsApiResponseSuccess(
        NotificationsActionTypes.STATUS_NOTIFICATIONS,
        data
      )
    );
    yield put(getNotificationsAction());
  } catch (error: any) {
    yield put(
      notificationsApiResponseError(
        NotificationsActionTypes.STATUS_NOTIFICATIONS,
        error
      )
    );
  }
}

export function* watchGetNotifications(): any {
  yield takeEvery(NotificationsActionTypes.GET_NOTIFICATIONS, getNotifications);
}

export function* watchNotificationStatus(): any {
  yield takeEvery(
    NotificationsActionTypes.STATUS_NOTIFICATIONS,
    notificationStatus
  );
}

function* notificationSaga() {
  yield all([fork(watchGetNotifications), fork(watchNotificationStatus)]);
}

export default notificationSaga;
