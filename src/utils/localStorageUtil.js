import { KEY_LOCALSTORAGE_FASTIVAL_FLG } from "../configs/keys.js";
import { KEY_LOCALSTORAGE_FESTIVAL_PAGE } from "../configs/keys.JS";
import { KEY_LOCALSTORAGE_FESTIVAL_LIST } from "../configs/keys.JS";

export const localStorageUtil = {
  // 책임 중심적 설계시 코드 작성 방법

  /**
   * 로컬스토리지에 페스티벌 리스트 저장
   * @param {[]} festivalList
   */ 
  setFestivalList: (data) => {
    localStorage.setItem(KEY_LOCALSTORAGE_FESTIVAL_LIST, JSON.stringify(data)); // Json 양식으로 문자열 반환
  },
  /**
   * 로컬스토리지에 페스티벌 리스트 반환 
   * @returns {[]} festivalList
   */
  getFestivalList: () => {
    return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE_FESTIVAL_LIST));
  },
  /**
   * 로컬스토리지에 페스티벌 페이지 번호 저장 
   * @param {number} pageNo 
   */ 
  setFestivalPage: (pageNo) => {
    // localStorage.setItem(KEY_LOCALSTORAGE_FESTIVAL_PAGE, pageNo.toString()); // number를 문자열로 반환 
    localStorage.setItem(KEY_LOCALSTORAGE_FESTIVAL_PAGE, JSON.stringify(pageNo)); // number를 문자열로 반환 
  },
  /**
   * 로컬스토리지의 페스티벌 페이지 번호 반환 
   * @returns {number} 페이지 번호
   */
  getFestivalPage: () => {
    return parseInt(localStorage.getItem(KEY_LOCALSTORAGE_FESTIVAL_PAGE));
  },
  /**
   * 로컬스토리지에 페스티벌 스크롤 플래그 저장 
   * @param {boolean} flg 
   */
  setFestivalScrollFlg: (flg) => {
    // localStorage.setItem(KEY_LOCALSTORAGE_FASTIVAL_FLG, flg.toString());
    localStorage.setItem(KEY_LOCALSTORAGE_FASTIVAL_FLG, JSON.stringify(flg));
  },
  /**
   * 로컬스토리지의 페스티벌 스크롤 플래그 반환 
   * @returns {boolean} flg
   */
  getFestivalScrollFlg: () => {
    return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE_FASTIVAL_FLG));
  },

  // 역할 중심적 설계시 코드 작성 방법
  // setLocalStorage: (key, data) => {
  //   localStorage.setItem(key, JSON.stringify(data));
  // },
  // getLocalStorage: (key) => {
  //   return localStorage.getItem(key);
  // },
}