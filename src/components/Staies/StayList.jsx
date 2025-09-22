import { useDispatch, useSelector } from 'react-redux';
import './StayList.css'; 
import { useEffect } from 'react';
import { stayIndex } from '../../store/thunks/stayThunk.js';
import { setScrollEventFlg } from '../../store/slices/staySlice.js';

function StayList () {
  const dispatch = useDispatch();
  const stayList = useSelector(state => state.stay.list);
  const stayScrollEventFlg = useSelector(state => state.stay.scrollEventFlg);

  

  useEffect(() => { 
    window.addEventListener('scroll', addNextPage);
    if (stayList.legth === 0) {
      dispatch(stayIndex());
    }

    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, []);

  function addNextPage() {
    const docHeight = document.documentElement.scrollHeight; 
    const winHeight = window.innerHeight; 
    const nowHeight = Math.ceil(window.scrollY); 
    const viewHeight = docHeight - winHeight; 

     if(viewHeight === nowHeight && stayScrollEventFlg) {
      dispatch(setScrollEventFlg(false)); 
      dispatch(stayIndex());
    }
  }
 

  useEffect
  
  return (
    <>
      <div className="stay-container">
        {
          // festivalList && festivalList.map(item => {
           stayList.length > 0 && stayList.map((item) => {
            return ( 
              <div className="stay-card" >
                <div className="stay-card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className='stay-card-title'>{item.title}</p>
                <p className="stay-card-addr">{`${item.addr1}`}</p>
              </div>
            );
          })
        } 
      </div>
    </>
  )
}

export default StayList;