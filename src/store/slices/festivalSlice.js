import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    list: null, // 페스티벌 리스트  
  }, 
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    }
  },
  extraReducers: builder => {              // 파라미터가 한 개여서 ( ) 생략
    builder
      .addCase(festivalIndex.fulfilled, (state, action) => {
        console.log(action.payload, action.type);
      })
      .addMatcher(
          action => action.type.endsWith('/pending'),
          state => {
          console.log('처리중입니다.');
        }
      )
      .addMatcher(
          action => action.type.endsWith('/rejected'),
          state => {
          console.error('에러발생');
        }
      );
  }
});

export const {
  setList
} = festivalSlice.actions; // actions만 선택해서 객체로 만든 후 export

export default festivalSlice.reducer; // store에서 사용하기 위해 내보냄