import { useNavigate, useParams } from 'react-router-dom';
import './StayShow.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { setStayInfo } from '../../store/slices/stayShowSlice';
import { useEffect } from 'react';

function StayShow() {
  const params = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const stayInfo = useSelector(state => state.stayShow.stayInfo);
  const stayList = useSelector(state => state.stay.list);

  useEffect(() => {
    const item = stayList.find(item => params.id === item.contentid);
    dispatch(setStayInfo(item));
  }, []); 

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
      { stayInfo.title &&
      <div className="stay-show-container">
        <button type="button" onClick={redirectBack}>되돌아가기</button>
        <p className="stay-show-title">{stayInfo.title}</p>
        <p className="stay-show-tel">{stayInfo.tel ? stayInfo.tel : '전화번호 없음'}</p>
        <img className="stay-show-img" src={stayInfo.firstimage} alt={`${stayInfo.title}사진`} />
        <p className="stay-show-addr">{`${stayInfo.addr1}, ${stayInfo.addr2}`}</p>
      </div>
      }
    </>
  )
}

export default StayShow;