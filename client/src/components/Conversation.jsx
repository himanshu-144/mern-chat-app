import React from "react";
import { useConversation } from "../zustand/useConversation";
import { useGlobalSocketContext } from "../context/SocketContext";

const Conversation = ({ conversation, loading, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useGlobalSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const handleSelectedConversation = (user) => {

    setSelectedConversation(user);
  };
  
  //const isSelected = selectedConversation._id === conversation._id;
 // ${isSelected ? "bg-purple-400" : ""}
  return (
    <>
      {loading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <div
          onClick={() => handleSelectedConversation(conversation)}
          className={`flex cursor-pointer border-2 border-white py-2 px-5 items-center rounded-md justify-between
            
          `}
        >
          <div className={`avatar ${isOnline ? "online" : "" }`}>
            <div className="w-12 rounded-full">
              <img src={conversation.profilePic} />
            </div>
          </div>
          <h1 className="text-xl font-semibold">{conversation.name}</h1>
          <span className="text-2xl">{emoji}</span>
        </div>
      )}
    </>
  );
};

export default Conversation;
