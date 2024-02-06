import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useGlobalContext } from "../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";

const LogOutButton = () => {
  const { setAuthUser } = useGlobalContext();

  const handleLogout = async () => {
    try {
      const logout = await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(logout.data.message);
      localStorage.removeItem("userLoginInfo");
      setAuthUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <button className="btn btn-outline btn-error" onClick={handleLogout}>
        <LuLogOut size={25} color="white" />
      </button>
    </div>
  );
};

export default LogOutButton;
