import React, { useContext, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { SocialContext } from "../../../context/SocialContext";
import Blockie from "../../Blockie";
import Sidebar from "../../Sidebar/Sidebar";
import "./Chatbox.css";
import ChatMessage from "./ChatMessage";
function Chatbox({ messages }) {
  const [message, setMessage] = useState("");
  const { user, Moralis } = useMoralis();
  const endOfMessagesRef = useRef(null);
  const sendMessage = async (event) => {
    if (!message) return;

    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();
    messages
      .save({
        message: message,
        username: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        (message) => {
          // console.log("message sent", message);
        },
        (error) => {
          console.log(error.message);
        }
      );
    endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };
  const { fetchedCategories } = useContext(SocialContext);

  return (
    <>
      <Sidebar categories={fetchedCategories} />
      <div className="chatbox flex-1">
        <div className="chatHeader">
          <Blockie currentWallet scale={3} />
          <div className="chatHeaderInfo">
            <h3>Global Discussion Room</h3>
          </div>
          <div className="chatHeaderRight"></div>
        </div>
        <div className="chatBody no-scrollbar">
          {messages.map((message, index) => {
            return (
              <ChatMessage
                key={index}
                name={message.get("username")}
                isReciever={
                  message.get("ethAddress") === user.get("ethAddress")
                }
                message={message.get("message")}
                timestamp={message.createdAt}
              />
            );
          })}
          <div
            ref={endOfMessagesRef}
            className="text-center text-secondary mt-5"
          >
            <p style={{ fontSize: "11px" }}>
              You are up to date {user.getUsername()}{" "}
            </p>
          </div>
        </div>
        <div className="chatFooter">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <div
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#54be95"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbox;
