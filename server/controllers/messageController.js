const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage=async(req, res)=>{
  const { message } = req.body;
	const { id: receiverId } = req.params;
	const senderId = req.user._id;

  try {
   let conversation = await Conversation.findOne({
    participants :{$all :[senderId, receiverId]},
   });
   
   if(!conversation){
     conversation = await Conversation.create({
      participants :[senderId, receiverId],
     })
   }

   const newMessage = new Message({
    senderId:senderId,
    receiverId:receiverId,
    message :message,
   });
   if(newMessage){
    conversation.messages.push(newMessage._id);
   }
  

//    await conversation.save();
//    await newMessage.save();
   // to run in parallel
   await Promise.all([conversation.save(), newMessage.save()]);


   //socket io functionallity
   const receiverSocketId = getReceiverSocketId(receiverId);
   if(receiverSocketId){ // sending events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);
   }

   return res.status(201).json(newMessage);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message :"Failed to send message"});
  }
};

const getMessages=async(req, res)=>{
  const {id:userToChatId} = req.params;
  const senderId = req.user._id;
  try {
    const conversation = await Conversation.findOne({
      participants :{$all:[senderId, userToChatId]}
    }).populate("messages"); // to get the message content

    if(!conversation){
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    return res.status(200).json(messages);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message :"Failed to get message"});
  }
};

module.exports = {sendMessage, getMessages}

