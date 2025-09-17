import { useNavigate, useParams } from "react-router-dom";
import './FestivalShow.css';
import { useDispatch, useSelector } from "react-redux";
import { dateFomatter } from "../../utils/dateFormatter.js";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice";
import { useEffect } from "react";


function FestivalShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const festivalInfo = useSelector(state => state.festivalShow.festivalInfo);
  const festivalList = useSelector(state => state.festival.list);
  
  
  useEffect(() => {
    const item = festivalList.find(item => params.id === item.contentid);
    dispatch(setFestivalInfo(item));
  }, []);

  function redirectBack() {
    navigate(-1);
  }

  return (
    <> 
      { festivalInfo.title && 
      <div className="show-container">
        <button type="button" onClick={redirectBack}>되돌아가기</button>
        <p className="show-title">{festivalInfo.title}</p> 
        <p className="show-period">{dateFomatter.withHyphenYMD(festivalInfo.eventstartdate)} ~ {dateFomatter.withHyphenYMD(festivalInfo.eventenddate)}</p>
        <img className="show-img " src={festivalInfo.firstimage} alt={`${festivalInfo.title}사진`} />
        <p className="show-addr">{`${festivalInfo.addr1}, ${festivalInfo.addr2}`}</p>
      </div>
      }
    </>
  )
}

export default FestivalShow;