import React, { useEffect } from 'react'
import { useGlobalSocketContext } from '../context/SocketContext'
import { useConversation } from '../zustand/useConversation';
import notificationSound from "../assets/sounds/notification.mp3"


const useListenMessages = () => {
  const {socket} = useGlobalSocketContext();
  const {messages,setMessages} = useConversation();

  useEffect(()=>{
    socket?.on("newMessage", (newMessage)=>{
        newMessage.shake= true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
    })
  return ()=>socket?.off("newMessage"); // clean up function to avoid for notification sound multiple by events
  },[socket, messages, setMessages])
  
}

export default useListenMessages
