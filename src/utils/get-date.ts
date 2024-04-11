import moment from "moment";

export const dateFormat = "YYYY-MM-DD";

export const getDateFromISOString = (date: Date | null): string => {
  if (!date) return "";
  return moment(date).format(dateFormat);
};

export const getDateOfBeforeOneMonth = (): Date => {
  return moment(new Date()).subtract(1, "month").toDate();
};

export const currentDate = (): Date => {
  return moment(new Date()).toDate();
};

export const getDateOfBeforeOneMonthInFormat = (format?: string): string => {
  return moment(new Date())
    .subtract(1, "months")
    .format(format ?? dateFormat);
};

export const currentDateInFormat = (format?: string): string => {
  return moment(new Date()).format(format ?? dateFormat);
};
