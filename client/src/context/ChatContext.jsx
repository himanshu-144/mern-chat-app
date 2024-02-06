import React, { createContext, useContext, useState } from 'react'

const CreateChatContext = createContext();

const ChatContext = ({children}) => {
  const [conversations, setConversations] = useState([]);

  const[authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('userLoginInfo')) || null);
  //for state management, use zustand
  console.log(authUser);
  return (
    <CreateChatContext.Provider value={{authUser, setAuthUser, conversations, setConversations}}>
      {children}
    </CreateChatContext.Provider>
  )
}

export default ChatContext

export const useGlobalContext =()=>{
    return useContext(CreateChatContext);
}
