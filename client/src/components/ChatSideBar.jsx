import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Conversations from "./Conversations";
import LogOutButton from "./LogOutButton";
import toast, { Toaster } from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";
import { useGlobalContext } from "../context/ChatContext";
const ChatSideBar = () => {
  const[searchUser, setSearchUser] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGlobalContext();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!searchUser) return;
    const conversation = await conversations.find((c)=>c.name.toLowerCase().includes(searchUser.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation);
      setSearchUser("");
    }
    else{
      toast.error("No such user found!");
      return;
    }
  };

  return (
    <div className="h-full w-[40%] flex flex-col border-2 border-white rounded">
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit}>
        <div className="flex pt-2 justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="text-black text-xl w-full max-w-xs input input-bordered"
            value={searchUser}
            onChange={(e)=>setSearchUser(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            <FaSearch size={25} />
          </button>
        </div>
      </form>

      <div className="w-full px-4">
        <div className="divider divider-secondary"></div>
      </div>
      <Conversations />
      <div className="w-full px-4">
        <div className="divider divider-secondary"></div>
      </div>

      <LogOutButton />
    </div>
  );
};

export default ChatSideBar;
