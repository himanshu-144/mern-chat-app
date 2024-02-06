import React, { createContext, useContext, useEffect, useState } from "react";
import {io} from "socket.io-client"
import { useGlobalContext } from "./ChatContext";

const CreateSocketContext = createContext();

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {authUser} = useGlobalContext();
  
  useEffect(()=>{
    if(authUser){
        const socket = io("http://localhost:8000",{
            query:{
              userId : authUser.data.user._id
            }
        });

        socket.on("getOnlineUsers", (users)=>{
          setOnlineUsers(users);
        });

        setSocket(socket);

        return()=>socket.close();
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
  },[authUser])

  return (
    <CreateSocketContext.Provider
      value={{ socket, setSocket, onlineUsers, setOnlineUsers }}
    >
      {children}
    </CreateSocketContext.Provider>
  );
};

export default SocketContext;

export const useGlobalSocketContext = ()=>{
  return useContext(CreateSocketContext)
};
