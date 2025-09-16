import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFomatter } from '../../utils/dateFormatter.js';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';

function FestivalList() {
  const dispatch = useDispatch();

  const festivalList = useSelector(state => state.festival.list);
  // const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);

  // 스크롤 이벤트시 주의사항 
  // window.addEventListener('scroll', () => {
  //   console.log(window.scrollY, document.body.scrollHeight);
  // });

  useEffect( () => { 
    // 로컬스토리지에 저장된 날짜를 획득 
    //   저장된 날짜 없으면 로컬스토리지에 현재 날짜 저장 
    //   저장된 날짜 있으면 아래처리 속행 
    //      오늘날짜랑 비교 
    //        날짜가 과거면 로컬 스토리지 및 스테이트 초기화 
    //        아직 과거가 아니면 처리속행

    window.addEventListener('scroll', addNextPage);

    if(festivalList.length === 0) {
      dispatch(festivalIndex());
    }

     return () => { 
      window.removeEventListener('scroll', addNextPage);
    }
  }, []);
    
  // 다음 페이지 가져오기
  // function addNextPage() {
  //   dispatch(festivalIndex(page + 1));
  // } 

  // 다음 페이지 가져오기 + 조건(스크롤이 어느 위치에 있느냐?)
  function addNextPage() {
    // 스크롤 관련 처리 
    const docHeight = document.documentElement.scrollHeight; // 문서의 Y축 총 길이 
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = Math.ceil(window.scrollY); // 현재 스크롤의 Y축 위치 
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치  

    if(viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false)); 
      dispatch(festivalIndex());
    }
  } 

  return (
    <>
      <div className="container">
        {
          // festivalList && festivalList.map(item => {
          festivalList.length > 0 && festivalList.map(item => {
            return (
              <div className="card" key={item.contentid + item.createdtime}>
                <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className='card-title'>{item.title}</p>
                <p className="card-period">{dateFomatter.withHyphenYMD(item.eventstartdate)} ~ {dateFomatter.withHyphenYMD(item.eventenddate)}</p>
              </div>
            );
          })
        } 
      </div>
      <button type="button" onClick={addNextPage}>더보기</button>
    </>
  )
}

export default FestivalList;