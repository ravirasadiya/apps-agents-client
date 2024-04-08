import { defineWindows } from "../hooks/get-user-login-status";

export enum LocalStorageKeys {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  PROFILE = "profileData",
  filterProperties = "filterProperties",
}

export const setLocalStorage = (key: string, data: any) => {
  if (!data || !key) return;
  const value = storeData(data);
  localStorage.setItem(key, value);
};

const storeData = (data: any) => {
  return typeof data === "string" ? data : JSON.stringify(data);
};

export const getLocalStorage = (key: string) => {
  if (!key) return;
  if (defineWindows) {
    const localStorageVal = localStorage.getItem(key) ?? "";
    if (!localStorageVal) return;
    return JSON.parse(JSON.stringify(localStorageVal));
  }
  return "";
};

export const clearLocalStorage = (key: string) => {
  if (!key) return;
  if (defineWindows) {
    localStorage.removeItem(key);
  }
};
