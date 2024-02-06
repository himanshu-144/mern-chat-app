import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChatContext from "./context/ChatContext";
import SocketContext from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatContext>
    <SocketContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SocketContext>
  </ChatContext>
);
