import Header from './components/common/Header';
import './App.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useEffect } from 'react';
import { localStorageUtil } from './utils/localStorageUtil';
import { dateFomatter } from './utils/dateFormatter';
import BeforeInstallPrompt from './components/BeforeInstallPrompt';
function App() {

  useEffect(() => {
    // 로컬스토리지에 저장된 날짜를 획득 
    const clearDate = localStorageUtil.getClearDate();
    // const now = newDate();
    // const nowDate = dateFomatter.formatDateToYMD(now);
    const nowDate = dateFomatter.formatDateToYMD(new Date());

    // 로컬스토리지의 날짜와 오늘 날짜가 다를경우
    if(clearDate !== nowDate) {
      localStorageUtil.clearLocalStorage();
      localStorageUtil.setClearDate(nowDate);

      // state가 초기화 되지않는 현상을 해결하기 위해, 강제로 화면 새로고침 
      window.location.reload(); 
      // 원래는 슬라이스 하나 당 초기화 해주는 것  
    } 
  }, []);

  return (
    <>
    <BeforeInstallPrompt/>
     <Header></Header>
     <main>
      <Outlet />
     </main>

    {/* 스크롤 초기화, 최상위 컴포넌트에 한번만 추가 */}
     <ScrollRestoration></ScrollRestoration>
    </>
  )
}

export default App
