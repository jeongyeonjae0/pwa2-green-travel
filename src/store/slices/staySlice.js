import { createSlice } from "@reduxjs/toolkit";
import { stayIndex } from "../thunks/stayThunk.js";
import { localStorageUtil } from "../../utils/localStorageUtil.js";

const staySlice = createSlice({
  name: 'staySlice',
  initialState: {
    list: localStorageUtil.getStayList() ? localStorageUtil.getStayList() : [], // 페스티벌 리스트 
    page: localStorageUtil.getStayPage() ? localStorageUtil.getStayPage() : 0, // 현재 페이지 번호
    scrollEventFlg: localStorageUtil.getStayScrollFlg() ? localStorageUtil.getStayScrollFlg() : true, // 스크롤 이벤트 디바운싱 제어 플래그 
  }, 
  reducers: {
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    }
  },
  extraReducers: builder => {
    builder 
      .addCase(stayIndex.fulfilled, (state, action) => {
        if(action.payload.items?.item) {
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNO;
          localStorageUtil.setStayList(state.list);
          localStorageUtil.setStayPage(state.page);
          localStorageUtil.setStayScrollFlg(state.scrollEventFlg);
        }  else {
          state.scrollEventFlg = false;
        }
    })
      .addMatcher(
        action => (action.type.startsWith('staySlice/') &&action.type.endsWith('/rejected')),
        (state, action) => {
          console.error('에러발생', action.error);
        }
      );
  } 
});

export const {
  setScrollEventFlg
} = staySlice.actions; 

export default staySlice.reducer;