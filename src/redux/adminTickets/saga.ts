import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

import {
  getAdminTickets as getAdminTicketsApi,
  getTicketStatus as getTicketStatusApi,
  getadminTicketsCount as getadminTicketsCountApi,
  updateAdminTicketStatus as updateAdminTicketStatusApi,
} from "../../helpers/api/admin_tickets";

import { getTicketDetails as getTicketDetailsApi } from "../tickets/actions";

import {
  adminTicketsApiResponseError,
  adminTicketsApiResponseSuccess,
  getAdminTickets as getAdminTicketStatusAction,
  getAdminTicketStatus as getAdminTicketStatusApi,
  getAdminTicketsCount as getAdminTicketsCountApi,
} from "./actions";
import { AdminTicketsActionTypes } from "./constants";

function* getadminTickets({ payload: { status } }: any): SagaIterator {
  try {
    const response = yield call(getAdminTicketsApi, status);
    const data = response.data.data;
    yield put(
      adminTicketsApiResponseSuccess(
        AdminTicketsActionTypes.GET_ADMIN_TICKETS,
        { data }
      )
    );
  } catch (error: any) {
    yield put(
      adminTicketsApiResponseError(
        AdminTicketsActionTypes.GET_ADMIN_TICKETS,
        error
      )
    );
  }
}

function* getAdminTicketStatus(): SagaIterator {
  try {
    const response = yield call(getTicketStatusApi);
    const data = response.data.data;

    yield put(
      adminTicketsApiResponseSuccess(
        AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS,
        { data }
      )
    );
  } catch (error: any) {
    yield put(
      adminTicketsApiResponseError(
        AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS,
        error
      )
    );
  }
}

function* updateAdminTicketStatus({
  payload: { status_id, ticket_id },
}: any): SagaIterator {
  try {
    const response = yield call(
      updateAdminTicketStatusApi,
      status_id,
      ticket_id
    );
    const data = response.data.message;

    yield put(
      adminTicketsApiResponseSuccess(
        AdminTicketsActionTypes.UPDATE_ADMIN_TICKET_STATUS,
        data
      )
    );
    yield all([
      put(getAdminTicketStatusAction(0)),
      put(getAdminTicketsCountApi()),
      put(getAdminTicketStatusApi()),
      put(getTicketDetailsApi(ticket_id)),
    ]);
  } catch (error: any) {
    yield put(
      adminTicketsApiResponseError(
        AdminTicketsActionTypes.UPDATE_ADMIN_TICKET_STATUS,
        error
      )
    );
  }
}

function* getAdminTicketsCount(): SagaIterator {
  try {
    const response = yield call(getadminTicketsCountApi);
    const data = response.data.data;
    yield put(
      adminTicketsApiResponseSuccess(
        AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT,
        { data }
      )
    );
  } catch (error: any) {
    yield put(
      adminTicketsApiResponseError(
        AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT,
        error
      )
    );
  }
}

export function* watchGetAllAdminTickets() {
  yield takeEvery(AdminTicketsActionTypes.GET_ADMIN_TICKETS, getadminTickets);
}

export function* watchGetAdminTicketStatus() {
  yield takeEvery(
    AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS,
    getAdminTicketStatus
  );
}

export function* watchUpdateAdminTicketStatus() {
  yield takeEvery(
    AdminTicketsActionTypes.UPDATE_ADMIN_TICKET_STATUS,
    updateAdminTicketStatus
  );
}

export function* watchGetAdminTicketsCount() {
  yield takeEvery(
    AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT,
    getAdminTicketsCount
  );
}

function* AdminTicketsSaga() {
  yield all([
    fork(watchGetAllAdminTickets),
    fork(watchGetAdminTicketStatus),
    fork(watchGetAdminTicketsCount),
    fork(watchUpdateAdminTicketStatus),
  ]);
}

export default AdminTicketsSaga;
