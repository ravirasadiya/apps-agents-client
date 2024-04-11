// reducers/apiRecordsSlice.ts
import { mockProfileRecord } from "@/mock/user-profile";
import { ProfileRecord } from "@/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileDataRecord } from "./profileDataActions";

interface ApiRecordsState {
  records: ProfileRecord;
  loading: boolean;
  error: string | null;
}

const initialState: ApiRecordsState = {
  records: mockProfileRecord,
  loading: false,
  error: null,
};

const profileData = createSlice({
  name: "profileRecord",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDataRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfileDataRecord.fulfilled,
        (state, action: PayloadAction<ProfileRecord>) => {
          state.loading = false;
          state.records = action.payload;
        }
      )
      .addCase(fetchProfileDataRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch records";
      });
  },
});

export default profileData.reducer;
