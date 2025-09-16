import React from 'react'
import { useNavigate } from 'react-router-dom' // ⬅️ مهم للتوجيه بعد اللوج اوت
import { assets } from '../assets/assets'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ⬅️ حذف التوكن
    navigate('/login'); // ⬅️ توجيه لصفحة تسجيل الدخول
  };

  return (
    <div className='navbar flex justify-between items-center py-2 px-[4%] bg-[#f9f9f9]'>
<img
  className="w-[100px] h-auto max-w-[150px]"
  src={assets.logo}
  alt="logo"
/>
      <button
        onClick={handleLogout}
        className='py-[10px] px-[30px] cursor-pointer bg-[#fff] border border-solid border-[#ff5353] rounded-[4px] text-[15px] text-[#494949]'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
