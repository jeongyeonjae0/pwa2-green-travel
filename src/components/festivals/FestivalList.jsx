import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFomatter } from '../../utils/dateFormatter.js';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';
import { useNavigate } from 'react-router-dom';

function FestivalList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const festivalList = useSelector(state => state.festival.list);
  // const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);

  // 스크롤 이벤트시 주의사항 
  // window.addEventListener('scroll', () => {
  //   console.log(window.scrollY, document.body.scrollHeight);
  // });

  useEffect(() => { 

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

  // 상세페이지로 이동 
  function redirectShow(item) {
    // dispatch(setFestivalInfo(item));
    navigate(`/festivals/${item.contentid}`);
  }

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
      <button type="button" onClick={redirectBack}>되돌아가기</button>
      <div className="container">
        {
          // festivalList && festivalList.map(item => {
          festivalList.length > 0 && festivalList.map((item, index) => {
            return (
              <div className="card" onClick={() => { redirectShow(item) }} key={item.contentid + item.createdtime + index}>
                <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className='card-title'>{item.title}</p>
                <p className="card-period">{dateFomatter.withHyphenYMD(item.eventstartdate)} ~ {dateFomatter.withHyphenYMD(item.eventenddate)}</p>
              </div>
            );
          })
        } 
      </div>
      {/* <button type="button" onClick={addNextPage}>더보기</button> */}
    </>
  )
}

export default FestivalList;