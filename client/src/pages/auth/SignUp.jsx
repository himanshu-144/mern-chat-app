import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import GenderCheckBox from "../../components/GenderCheckBox";
const SignUp = () => {
  const [showPassord, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleCheckForGender = (gender) => {
    // for gender check box
    setInput({ ...input, gender });
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password || !input.gender) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const userData = {
        name: input.name,
        email: input.email,
        password: input.password,
        gender: input.gender,
      };
      const userInfo = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(userInfo);
      setLoading(false);
      toast.success(userInfo.data.message);
      setInput({
        name: "",
        email: "",
        password: "",
        gender: "",
      });
      if(userInfo.data.user !==null){
        navigate('/signin');
        return;
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to register!");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col bg-black ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="h-4/5 w-2/4 border-2 border-white rounded-md p-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-center text-white tracking-wider">
            Welcome,{" "}
            <span className="text-yellow-200 tracking-wider">SNAPSKOOT</span>
          </h1>
          <h1 className="text-2xl font-semibold text-center text-white tracking-wider">
            Create account to begin our chit chat
          </h1>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 p-5 justify-center items-center">
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full max-w-md text-xl"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-md text-xl"
                name="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
              />
              <div className="input input-bordered w-full max-w-md text-xl flex items-center justify-between">
                <input
                  type={showPassord ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                />
                <button onClick={() => setShowPassword(!showPassord)}>
                  {showPassord ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <GenderCheckBox
                handleCheckForGender={handleCheckForGender}
                selectedGender={input.gender}
              />

              <button
                type="submit"
                className="btn btn-secondary w-full max-w-md my-2"
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
          <h1 className="text-center py-2 text-white">
            Already Have An Account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="btn btn-warning text-white"
            >
              Login
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
