import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { format } from "timeago.js";
import "./Feed.css";
import Blockie from "../Blockie";
import { useWeb3ExecuteFunction, useMoralisQuery } from "react-moralis";
import { useMoralis } from "react-moralis";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { Comment, message, Tooltip } from "antd";
function Post({ post }) {
  const isProfileImageNft = false;
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const [voteStatus, setVoteStatus] = useState();

  const { contentId, postOwner, postId } = post;
  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );
  //   wallet address
  const { account } = useMoralis();
  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postId", postId),
    [],
    { live: true }
  );
  useEffect(() => {
    if (!votes?.length) return null;

    async function getPostVoteStatus() {
      const fetchedVotes = JSON.parse(JSON.stringify(votes));
      fetchedVotes.forEach(({ voter, up }) => {
        if (voter === account) setVoteStatus(up ? 1 : -1);
      });
      return;
    }

    getPostVoteStatus();
  }, [votes, account]);

  useEffect(() => {
    function extractURI(data) {
      const contentURIs = JSON.parse(JSON.stringify(data, ["contentUri"]));
      return contentURIs[0].contentUri;
    }
    async function fetchIPFSDoc(url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    async function processContent() {
      const content = await fetchIPFSDoc(extractURI(data));
      setPostContent(content);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);
  async function vote(direction) {
    message.success(direction);
  }
  const actions = [
    <Tooltip key="comment-basic-like" title="Vote Up">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginRight: "16px",
        }}
        onClick={() => vote("voteUp")}
      >
        {voteStatus === 1 ? <LikeFilled /> : <LikeOutlined />} Vote Up
      </span>
    </Tooltip>,
    <span style={{ fontSize: "15px" }}>
      0 {/* <Votes postId={postId} /> */}
    </span>,
    <Tooltip key="comment-basic-dislike" title="Vote Down">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginLeft: "8px",
        }}
        onClick={() => vote("voteDown")}
      >
        {voteStatus === -1 ? <DislikeFilled /> : <DislikeOutlined />} Vote Down
      </span>
    </Tooltip>,
  ];
  return (
    <div className="postWrapper">
      <div className="">
        <Blockie address={postOwner} number={4} />
      </div>
      <div className="postMain">
        <div className="">
          <span className="headerDetails">
            {/* <span className="name">{displayName}</span> */}
            {isProfileImageNft && (
              <span className="verified">
                <BsFillPatchCheckFill />
              </span>
            )}
            <span className="handleAndTimeAgo">
              @{postOwner} • {format(new Date(timestamp).getTime())}
            </span>
          </span>
          <div className="post">{postContent["content"]}</div>
        </div>
        <div className="footer">
          <div className={`footerIcon hover:bg-[#1e364a] hover:text-[#1d9bf0]`}>
            <FaRegComment />
          </div>
          <div className={`footerIcon hover:bg-[#1b393b] hover:text-[#03ba7c]`}>
            <FaRetweet />
          </div>
          <div className={`footerIcon hover:bg-[#39243c] hover:text-[#f91c80]`}>
            <AiOutlineHeart />
          </div>
          <div className={`footerIcon hover:bg-[#1e364a] hover:text-[#1d9bf0]`}>
            <FiShare />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
