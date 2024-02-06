import React, { useEffect, useRef } from "react";
import SingleMessage from "./SingleMessage";
import axios from "axios";
import { useConversation } from "../../zustand/useConversation";
import { useGlobalContext } from "../../context/ChatContext";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const {messages,  setMessages, selectedConversation } = useConversation();
  const { authUser } = useGlobalContext();
  const { token } = authUser.data;
  const lastMessageRef = useRef();
  const getAllMessages = async () => {
    try {
      const getMessages = await axios.get(
        `http://localhost:8000/api/v1/message/${selectedConversation._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(getMessages.data);
    } catch (error) {
      console.log(error);
    }
  };

  useListenMessages();

  useEffect(() => {
    if (selectedConversation?._id) getAllMessages();
  }, [selectedConversation?._id]);

  useEffect(()=>{
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    }, 100);
  },[])

  return (
    <div className="h-[80%] w-full p-2 overflow-auto" >
      <>
      {messages.length > 0 &&
        messages.map((getMessage) => {
          return(
            <div ref={lastMessageRef} key={getMessage._id}>
              <SingleMessage  message={getMessage} />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Messages;
