import React from "react";
import { useGlobalContext } from "../../context/ChatContext";
import { useConversation } from "../../zustand/useConversation";
import { extractTime } from "../../utils/FormattedTime";

const SingleMessage = ({ message }) => {
  const { authUser } = useGlobalContext();
  const {  selectedConversation } = useConversation();
  const fromMe = authUser.data.user._id === message.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.data.user.profilePic
    : selectedConversation?.profilePic;
  const bgColorChat = fromMe ? "bg-blue-600" : "bg-pink-600";
 
  const shakeClassName = message.shake ? "shake" : ""; 
  
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bgColorChat} ${shakeClassName} text-center`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default SingleMessage;
