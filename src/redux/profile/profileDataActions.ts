// actions/apiRecordsActions.ts
import { EndpointUrl, endpointUrls, getRecords } from "@/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const profileDataEndPoint = endpointUrls[EndpointUrl.ME];

export const fetchProfileDataRecord = createAsyncThunk(
  profileDataEndPoint,
  async () => {
    return getRecords(profileDataEndPoint);
  }
);
