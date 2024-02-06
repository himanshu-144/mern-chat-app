import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";
import { useGlobalContext } from "../context/ChatContext";
import { getRandomEmoji } from "../utils/EmojiGenerator";
const Conversations = () => {
  const [loading, setLoading] = useState(true);
  const { authUser, setConversations,conversations} = useGlobalContext();
  const { token } = authUser.data;
  
  const getAllConversations = async () => {
    setLoading(true);
    try {
      const getConversations = await axios.get(
        "http://localhost:8000/api/v1/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversations(getConversations.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <div className="flex flex-col px-5 overflow-auto gap-2">
    {  // all other users
      conversations.map((conversation)=>{
        return(  
          <Conversation conversation={conversation} loading={loading} key={conversation._id} 
           emoji={getRandomEmoji()}
          />
        )
      })
    }
    
    </div>
  );
};

export default Conversations;
