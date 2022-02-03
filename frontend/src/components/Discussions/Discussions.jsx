import React from "react";
import Chatbox from "./Chatbox/Chatbox";
import "./Discussions.css";
function Discussions() {
  const messages = [
    {
      name: "kartik",
      received: true,
      message: "hi",
      timestamp: "20 feb",
    },
    {
      name: "kasdfasdfartik",
      received: false,
      message: "hsdfdfi",
      timestamp: "20 feb",
    },
  ];

  return (
    <div className="discussionContainer">
      <div className="discussionInnerContainer">
        <Chatbox messages={messages} />
      </div>
    </div>
  );
}

export default Discussions;
