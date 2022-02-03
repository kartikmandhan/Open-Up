import React, { useState } from "react";
import Blockie from "../../Blockie";
import "./Chatbox.css";
import ChatMessage from "./ChatMessage";
function Chatbox({ messages }) {
  const [input, setInput] = useState("");
  const sendMessage = async (event) => {
    console.log("message sent");
  };
  return (
    <div className="chatbox">
      <div className="chatHeader">
        <Blockie currentWallet scale={3} />
        <div className="chatHeaderInfo">
          <h3>Global Discussion Room</h3>
        </div>
        <div className="chatHeaderRight"></div>
      </div>
      <div className="chatBody">
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              name={message.name}
              isReciever={message.received}
              message={message.message}
              timestamp={message.timestamp}
            />
          );
        })}
      </div>
      <div className="chatFooter">
        {/* <IconButton>
          <InsertEmoticonIcon /> */}
        {/* </IconButton> */}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit"></button>
        </form>
        <div
          className="m-3"
          style={{ cursor: "pointer" }}
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
