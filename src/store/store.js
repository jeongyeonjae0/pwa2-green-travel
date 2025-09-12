import { configureStore } from "@reduxjs/toolkit";
import festivalReaducer from './slices/festivalSlice.js';

export default configureStore({
  reducer: {
   festival: festivalReaducer, // slices 정의
  }
});