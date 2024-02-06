import React, { useEffect } from "react";
import { useConversation } from "../../zustand/useConversation";
import { getRandomEmoji } from "../../utils/EmojiGenerator";
import { useGlobalContext } from "../../context/ChatContext";

const MessageHeader = () => {
  const { selectedConversation } = useConversation();
  const emoji = getRandomEmoji();
  const { authUser } = useGlobalContext();
  // useEffect(()=>{
  //   // cleanup function
  //   return()=>setSelectedConversation(null)
  // },[])

  return (
    <div className="h-[10%] w-full bg-[#212121] flex items-center px-8 gap-2 rounded justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">To:</span>
        <span className="text-xl font-bold">{selectedConversation.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} role="button">
          <div className="avatar">
          <div className="w-11 rounded-full ring">
            <img src={authUser.data.user.profilePic} />
          </div>
        </div>
          </div>
          <span
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow rounded-box w-48 text-center bg-purple-500 text-white "
          >
            {authUser.data.user.name}
          </span>
        </div>
       
      </div>
    </div>
  );
};

export default MessageHeader;
