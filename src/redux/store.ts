import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import profileDataReducer from "./profile/profileDataSlice";

export const store = configureStore({
  reducer: {
    profileData: profileDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
