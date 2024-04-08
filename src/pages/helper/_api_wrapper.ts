import axios from "axios";
import { getLocalStorage, LocalStorageKeys } from "./local-storage-wrapper";

const defaultHeader = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Record<string, unknown>
) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: method,
  body: JSON.stringify(options),
});

const defaultHeaderWithToken = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  token: string,
  options?: Record<string, unknown>
) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  method: method,
  body: JSON.stringify(options),
});

export const defaultErrorMessageForSystem =
  "Something went wrong. Please try again!";

export const getRecords = async (apiUrl: string, options?: any) => {
  const token = getLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
  return await axios
    .get(apiUrl, defaultHeaderWithToken("GET", token))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data);
    });
};

// [TODO] Need to verify the error response of the
// data.
export const saveRecord = async (apiUrl: string, options?: any) => {
  return await axios
    .post(apiUrl, options, defaultHeader("POST", options))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data);
    });
};

export const updateRecord = async (apiUrl: string, options?: any) => {
  return await axios
    .put(apiUrl, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default {
  getRecords,
  saveRecord,
  updateRecord,
};
