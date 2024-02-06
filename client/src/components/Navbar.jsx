import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[71px] w-full flex items-center justify-between text-white bg-[#212121] p-2">
      <h1 className="text-3xl font-bold text-orange-500">SNAPSKOOT</h1>
      <div className="flex items-center gap-3">
        <button className="btn btn-active bg-[#424242] text-[#ff3d00] tracking-wide" onClick={()=>navigate('/signin')}>
          Login
        </button>
        <button className="btn btn-active bg-[#424242] text-[#03a9f4] tracking-wide" onClick={()=>navigate('/signup')}>
          Register
        </button>
      
      </div>
    </div>
  );
};

export default Navbar;
