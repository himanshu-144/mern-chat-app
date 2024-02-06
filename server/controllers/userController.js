const User = require("../models/userModel");

const getUsers=async(req, res)=>{
  //console.log(req.cookies.jwt);
   const loggedInUserId = req.user._id;
   try {
     // get all user except loggedin user
     const getAllUsers = await User.find({_id :{$ne:loggedInUserId}}).select("-password");
     return res.status(200).json(getAllUsers);
   } catch (error) {
     console.log(error);
     return res.status(500).json({message : "Failed to get Users"});
   }
};

module.exports = getUsers