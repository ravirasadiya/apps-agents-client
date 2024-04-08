import moment from "moment";

export const getDateFromISOString = (date: Date): string => {
  if (!date) return "";
  return moment(date).format("YYYY-MM-DD");
};

export const getDateOfBeforeOneMonth = (): Date => {
  return moment(new Date()).subtract(1, "month").toDate();
};

export const currentDate = (): Date => {
  return moment(new Date()).toDate();
};
