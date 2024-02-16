import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { NotificationsActionTypes } from "./constants";
import {
  notificationsApiResponseError,
  notificationsApiResponseSuccess,
} from "./actions";
import { getNotificationsApi } from "../../helpers/api/notifications";

function* getNotifications(): SagaIterator {
  try {
    const response = yield call(getNotificationsApi);
    console.log(response.data);
    
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

export function* watchGetNotifications(): any {
  yield takeEvery(NotificationsActionTypes.GET_NOTIFICATIONS, getNotifications);
}

function* notificationSaga() {
  yield all([fork(watchGetNotifications)]);
}

export default notificationSaga;
