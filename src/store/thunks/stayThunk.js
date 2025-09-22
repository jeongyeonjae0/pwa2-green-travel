import { createAsyncThunk } from "@reduxjs/toolkit";
import stayAxiosConfig from "../../configs/stayAxiosConfig.js";
import axios from "axios";

const stayIndex = createAsyncThunk(
  'staySlice/stayIndex',
  async(arg, thunkAPI) => {
    const state = thunkAPI.getState();

    const url = `${stayAxiosConfig.BASE_URL}/searchStay2`;

    const config = {
      params: {
        serviceKey: stayAxiosConfig.SERVICE_KEY,
        MobileOS: stayAxiosConfig.MOBILE_OS,
        MobileApp: stayAxiosConfig.MOBILE_APP,
        _type : stayAxiosConfig.TYPE,
        arrange: stayAxiosConfig.ARRANGE,
        numOfRows: stayAxiosConfig.NUM_OF_ROWS,
        pageNo: state.stay.page + 1,
      }
    }
    const response = await axios.get(url, config);

    return response.data.response.body;
  } 
);

export { stayIndex };
