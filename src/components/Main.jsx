import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  return (
    <>
    <div className="main-container">
      <div className="main-item" onClick={() => { navigate('/festivals') }}>
      <img className='festival-title-img' src='/base/andong_tal.png'  alt="대문" />
      <h2>페스티벌</h2>
      </div>
      <div className="main-item" onClick={() => { navigate('/staies') }}>
      <img className='stay-title-img' src='/base/hotel_picture.png' alt="중문" />
      <h2>숙박시설</h2>
      </div>
    </div>
    </>
  )
}

export default Main;