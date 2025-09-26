const axiosConfig = {
  SERVICE_KEY: '3492fcd88f0c993747ac2a44d4053de47df154d84350f9731e3781d9ab527a5e',
  MOBILE_OS: 'WEB',
  MOBILE_APP: 'GreenTravel',
  TYPE: 'json',
  ARRANGE: 'O',
  BASE_URL: 'https://apis.data.go.kr/B551011/KorService2',
  NUM_OF_ROWS: 12,
}

export default axiosConfig;

// 환경변수는 git파일에 안올리는게 좋지만,  config에 적어도 되는 건 외부에 노출해도 되는 값, 연산
// 고정되는 값은 config 말고 env라는 환경설정파일을 이용하는게 좋다. 