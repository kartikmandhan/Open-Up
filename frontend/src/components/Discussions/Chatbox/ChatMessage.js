import React from "react";
import "./ChatMessage.css";
function ChatMessage(props) {
  return (
    <p className={`chatMessage ${!props.isReciever && "chatReciever"}`}>
      <span className="chatName">{props.name}</span>
      {props.message}
      <span className="chatTimestamp">{props.timestamp}</span>
    </p>
  );
}

export default ChatMessage;
