import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/ChatContext";
const Home = () => {
  const {authUser} = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center gap-2 p-20">
        <h1 className="text-5xl font-extrabold">
          Have your best chat
        </h1>
        <h1 className="text-4xl font-bold">Fast, easy & unlimited team chat.</h1>
        {
          authUser ?
           <button className="btn btn-secondary" onClick={()=>navigate('/chat-page')}>Start Your Chat</button>
          :
          <button className="btn btn-secondary" onClick={()=>navigate('/signup')}>Start Your Chat</button>
        }
      </div>
    </div>
  );
};

export default Home;
