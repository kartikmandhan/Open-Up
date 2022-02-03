import React from "react";
import "./ChatMessage.css";
import TimeAgo from "timeago-react";
function ChatMessage(props) {
  return (
    <p className={`chatMessage ${props.isReciever && "chatReciever"}`}>
      <span className="chatName">{props.name}</span>
      {props.message}
      <span className="chatTimestamp">
        <TimeAgo datetime={props.timestamp} />
      </span>
    </p>
  );
}

export default ChatMessage;
