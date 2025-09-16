import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig.js";
import axios from "axios";
import { dateCalculater } from "../../utils/dateCalculater.js";
import { dateFomatter } from "../../utils/dateFormatter.js";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex', 
  async (arg, thunkAPI) => { 
    // state 접근 방법 
    const state = thunkAPI.getState();
    const pastDateYMD = dateFomatter.formatDateToYMD(dateCalculater.getPastDate((1000*60*60*24*30)));

    const url = `${axiosConfig.BASE_URL}/searchFestival2`;
    // const params = {                  // Destructuring 문법 => {params(키-고정)(생략가능): params(argument)}
    //   serviceKey: axiosConfig.serviceKey,
    //   MobileOS: axiosConfig.MobileOS,
    //   MobileApp: axiosConfig.MobileApp,
    //   _type : axiosConfig.type,
    //   arrange: axiosConfig.arrange
    // }
    const config = {
      params: {
        serviceKey: axiosConfig.SERVICE_KEY,
        MobileOS: axiosConfig.MOBILE_OS,
        MobileApp: axiosConfig.MOBILE_APP,
        _type : axiosConfig.TYPE,
        arrange: axiosConfig.ARRANGE,
        numOfRows: axiosConfig.NUM_OF_ROWS,
        pageNo: state.festival.page + 1,
        eventStartDate: pastDateYMD
      }
    }
    const response = await axios.get(url, config); // argument를 객체로 보내주어야 해서.

    return response.data.response.body;
  } 
);

export { festivalIndex };