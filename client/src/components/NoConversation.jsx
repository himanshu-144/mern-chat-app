import React from 'react'
import { TiMessages } from "react-icons/ti";
import { useGlobalContext } from '../context/ChatContext';
import { getRandomEmoji } from '../utils/EmojiGenerator';
const NoConversation = () => {
  const {authUser} = useGlobalContext();
  return (
    <div className='h-full w-[60%] flex justify-center items-center'>
      <div className='flex flex-col gap-3 items-center'>
        <h2 className='text-3xl font-bold text-orange-400'>SNAPSKOOT</h2>
        <span className='text-2xl font-bold'>Welcome ✌️{authUser.data.user.name}{getRandomEmoji()}</span>
        <span className='text-2xl font-bold'>Select a chat to start messaging</span>
        <TiMessages size={40} />
      </div>
    </div>
  )
}

export default NoConversation
