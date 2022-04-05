import React, { useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import Chatbox from "./Chatbox/Chatbox";
import "./Discussions.css";
function Discussions() {
  const MIN_DURATION = 30;
  const { data, loading, error } = useMoralisQuery(
    "Messages",
    (query) =>
      query
        .ascending("createdAt")
        .greaterThan(
          "createdAt",
          new Date(Date.now() - 1000 * 60 * MIN_DURATION)
        ),
    [],
    {
      live: true,
    }
  );
  return (
    <div className="discussionContainer">
      <div className="discussionInnerContainer">
        <Chatbox messages={data} />
      </div>
    </div>
  );
}

export default Discussions;
