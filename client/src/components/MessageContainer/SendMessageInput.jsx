import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import { useGlobalContext } from "../../context/ChatContext";
import { useConversation } from "../../zustand/useConversation";
const SendMessageInput = () => {
  const [message, setMessage] = useState("");
  const {messages,  setMessages, selectedConversation} = useConversation();
  const[loading, setLoading] = useState(false);
  const { authUser } = useGlobalContext();
  const { token } = authUser.data;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!message){
      return;
    }
    setLoading(true);
    try {
      const sendMessage = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedConversation._id}`,
        {message},
       {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       }
         
      );
      setMessages([...messages, sendMessage.data]);
      setLoading(false);
      setMessage("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-[10%] w-full bg-[#212121] flex p-4 rounded">
      <form
        className="w-full flex items-center justify-between"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Send Message"
          className="input input-bordered w-full max-w-md text-black text-xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          {loading? <span className="loading loading-spinner loading-lg"></span> : <BsFillSendFill size={30} />}
        </button>
      </form>
    </div>
  );
};

export default SendMessageInput;
