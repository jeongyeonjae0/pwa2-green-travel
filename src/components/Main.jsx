import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  return (
    <>
    <div className="main-container">
      <img className='festival-title-img' onClick={() => { navigate('/festivals') }} src='/base/andong_tal.png'  alt="대문" />
      <img className='stay-title-img' onClick={() => { navigate('/staies') }} src='/base/hotel_picture.png' alt="중문" />
    </div>
    </>
  )
}

export default Main;