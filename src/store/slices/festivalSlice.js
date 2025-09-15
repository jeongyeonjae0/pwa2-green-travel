import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    // list: null, // 페스티벌 리스트  
    list: [], // 페스티벌 리스트 
    page: 1, // 현재 페이지 번호
    scrollEventFlg: true, // 스크롤 이벤트 디바운싱 제어 플래그 
  }, 
  reducers: {
    // setList(state, action) {
    //   state.list = action.payload;
    setScrollEventFlg: (state,action) => {
      state.scrollEventFlg = action.payload;
    }
  },
  extraReducers: builder => {              // 파라미터가 한 개여서 ( ) 생략
    builder
      .addCase(festivalIndex.fulfilled, (state, action) => {
        // console.log(action.payload, action.type);
        // if(state.list !== null) {
        //   // 페이지 추가처리 
        //   state.list = [...state.list, ...action.payload.items.item];
        //   state.page = action.payload.pageNo;
        // } else {
        //   // 초기 페이지 처리 
        //   state.list = action.payload.items.item;
        //   state.page = action.payload.pageNo;
        // }
        if(action.payload.item !== '') {
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNo;
          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        }
      })
      .addMatcher(
          action => action.type.endsWith('/pending'),
          state => {
          console.log('처리중입니다.');
        }
      )
      .addMatcher(
          action => action.type.endsWith('/rejected'),
          (state, action) => {
          console.error('에러발생.', action.error);
        }
      );
  }
})

// export const {
//   setList
// } = festivalSlice.actions; // actions만 선택해서 객체로 만든 후 export
  export const {
    setScrollEventFlg
  } = festivalSlice.actions;

export default festivalSlice.reducer; // store에서 사용하기 위해 내보냄