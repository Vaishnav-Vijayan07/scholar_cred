import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { TicketsActionTypes } from "./constants";
import {
  TicketsApiResponseError,
  TicketsApiResponseSuccess,
  getTicketComments as getTicketCommentsAction,
} from "./actions";
import {
  getTicketDetails as getTicketDetailsApi,
  getTicketComments as getTicketCommentsApi,
  updateTicketComments as updateTicketCommentsApi,
} from "../../helpers/api/tickets";

function* getTicketDetails({ payload: { id } }: any): SagaIterator {
  try {
    const response = yield call(getTicketDetailsApi, id);
    const data = response.data.data;
    yield put(TicketsApiResponseSuccess(TicketsActionTypes.GET_A_TICKET, data));
  } catch (error: any) {
    yield put(TicketsApiResponseError(TicketsActionTypes.GET_A_TICKET, error));
  }
}

function* getTicketComments({ payload: { id } }: any): SagaIterator {
  try {
    const response = yield call(getTicketCommentsApi, id);
    const data = response.data.data;
    yield put(
      TicketsApiResponseSuccess(TicketsActionTypes.GET_TICKET_COMMENT, data)
    );
  } catch (error: any) {
    yield put(
      TicketsApiResponseError(TicketsActionTypes.GET_TICKET_COMMENT, error)
    );
  }
}

function* updateTicketComments({
  payload: { id, comment },
}: any): SagaIterator {
  const tickets_id = id;
  try {
    const response = yield call(updateTicketCommentsApi, {
      tickets_id,
      comment,
    });
    const data = response.data.message;
    yield put(
      TicketsApiResponseSuccess(TicketsActionTypes.UPDATE_TICKET_COMMENT, data)
    );
    yield put(getTicketCommentsAction(id));
  } catch (error: any) {
    yield put(
      TicketsApiResponseError(TicketsActionTypes.UPDATE_TICKET_COMMENT, error)
    );
  }
}

export function* watchGetTicketDetails() {
  yield takeEvery(TicketsActionTypes.GET_A_TICKET, getTicketDetails);
}

export function* watchGetTicketComments() {
  yield takeEvery(TicketsActionTypes.GET_TICKET_COMMENT, getTicketComments);
}

export function* watchUpdateTicketComments() {
  yield takeEvery(
    TicketsActionTypes.UPDATE_TICKET_COMMENT,
    updateTicketComments
  );
}

function* TicketsSaga() {
  yield all([
    fork(watchGetTicketDetails),
    fork(watchGetTicketComments),
    fork(watchUpdateTicketComments),
  ]);
}

export default TicketsSaga;
