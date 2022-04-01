import { Avatar, Comment, Divider, message, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Blockie from "../Blockie";
import React, { useEffect, useState } from "react";
import { useWeb3ExecuteFunction, useMoralisQuery } from "react-moralis";
import { useMoralis } from "react-moralis";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
const Post = ({ post }) => {
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
    <Comment
      style={{
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        backgroundColor: "white",
        border: "1px solid #e7eaf3",
        borderRadius: "0.5rem",
        fontSize: "16px",
        color: "#1F3947",
        padding: "0px 15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
      actions={actions}
      author={<Text strong>{postOwner}</Text>}
      avatar={
        <Avatar src={<Blockie address={postOwner} number={4} />}></Avatar>
      }
      content={
        <>
          <Text strong style={{ fontSize: "20px", color: "#333" }}>
            {postContent["title"]}
          </Text>
          <p style={{ fontSize: "15px", color: "#111" }}>
            {postContent["content"]}
          </p>
          <Divider style={{ margin: "15px 0" }} />
        </>
      }
    />
  );
};

export default Post;
