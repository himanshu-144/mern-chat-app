import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useGlobalContext } from "../../context/ChatContext";

const SignIn = () => {
  const {authUser} = useGlobalContext();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useGlobalContext();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const userData = {
        email: input.email,
        password: input.password,
      };
      const userInfo = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem('userLoginInfo', JSON.stringify(userInfo));
      setLoading(false);
      toast.success(userInfo.data.message);
      navigate("/chat-page");
      setInput({
        email:"",
        password:"",
      });
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to login!");
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
          <h1 className="text-3xl font-semibold text-center text-white tracking-wider">
            LOGIN
          </h1>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 p-5 justify-center items-center">
              <input
                type="text"
                placeholder="Enter your email"
                required
                className="input input-bordered w-full max-w-md text-xl"
                name="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
              />
              <div className="input input-bordered w-full max-w-md text-xl flex items-center justify-between">
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  name="password"
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                />
                <button onClick={() => setShow(!show)}>
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-full max-w-md my-3"
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <h1 className="text-center py-2 text-white">
            Don't Have An Account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="btn btn-warning text-white"
            >
              Register
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
