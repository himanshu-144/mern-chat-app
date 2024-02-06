const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const User = require("../models/userModel");

const registerController = async (req, res) => {
  const { name, email, password ,gender} = req.body;
  if (!name || !email || !password) {
    return res.status(403).send({ message: "All Field Are Required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: true,
        message: "User Already Exist",
      });
    }
    const hashedPassword = await hashPassword(password);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`

    const user = new User({
      name,
      email,
      password:hashedPassword,
      gender,
      profilePic:gender==="male" ? boyProfilePic : girlProfilePic,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(403).send({ message: "All Field Are Required" });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found",
      });
    }
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await jwt.sign({_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("jwt", token, {
      maxAge:15 * 24 * 60 * 60 * 1000,
      httpOnly :true,
      sameSite :"strict",
    });
    return res.status(201).json({
      success: true,
      message: "Login Successfull",
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
    });
  }
};

const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    return res.status(200).json({message : "Logged Out Successfull"});
  } catch (error) {
    console.log(error.message);

  }
};

module.exports = { registerController, loginController, logoutController };
