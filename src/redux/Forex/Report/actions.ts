import { ForexReportTypes } from "./constants";

export const forexReportApiSuccess = (actionType: string, data: string) => ({
  type: ForexReportTypes.API_SUCCESS,
  payload: { actionType, data },
});

export const forexReportApiError = (actionType: string, error: string) => ({
  type: ForexReportTypes.API_ERROR,
  payload: { actionType, error },
});

export const getReports = (year: number, month: number, consultants: any) => ({
  type: ForexReportTypes.GET_REPORT_DATA,
  payload: { month, year, consultants },
});

export const getConsultantsForex = () => ({
  type: ForexReportTypes.GET_CONSULTANT,
  payload: {},
});
