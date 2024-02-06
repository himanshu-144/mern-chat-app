import React from "react";
import MessageHeader from "./MessageContainer/MessageHeader";
import Messages from "./MessageContainer/Messages";
import SendMessageInput from "./MessageContainer/SendMessageInput";

const Chatting = () => {
 

  return (
    <div className="h-full w-[60%] border-2 border-white rounded flex flex-col">
      <MessageHeader />
      <Messages />
      <SendMessageInput />
    </div>
  );
};

export default Chatting;
