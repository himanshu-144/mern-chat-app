import React from "react";
import ChatSideBar from "../components/ChatSideBar";
import Chatting from "../components/Chatting";
import NoConversation from "../components/NoConversation";
import { useConversation } from "../zustand/useConversation";

const ChatPage = () => {
  const {selectedConversation} = useConversation();
  return (
    <div className="h-screen w-screen bg-black text-white">
      <div className="h-screen w-screen flex p-2 gap-1">
        <ChatSideBar />
        {selectedConversation ===null ? (
          <NoConversation />
        ) : (
          <>
            <Chatting />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
