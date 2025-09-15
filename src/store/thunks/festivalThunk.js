import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig";
import axios from "axios";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex', 
  async (page) => { 
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
        pageNo: page,
        eventStartDate: '20250401'
      }
    }
    const response = await axios.get(url, config); // argument를 객체로 보내주어야 해서.

    return response.data.response.body;
  } 
);

export { festivalIndex };