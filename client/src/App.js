import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ChatPage from "./pages/ChatPage";
import { useGlobalContext } from "./context/ChatContext";
function App() {
  const {authUser} = useGlobalContext();
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/signin" element={ authUser ? <ChatPage />  : <SignIn />} />
          <Route path="/signup" element={<SignUp /> } />
          <Route path="/chat-page" element={authUser ? <ChatPage />  : <SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
