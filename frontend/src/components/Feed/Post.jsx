import { Avatar, Comment, Divider, message, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Blockie from "../Blockie";
import React, { useEffect, useState } from "react";
import { useWeb3ExecuteFunction, useMoralisQuery } from "react-moralis";
import { useMoralis } from "react-moralis";
import { FaRegComment } from "react-icons/fa";
import { useHistory } from "react-router";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Votes from "./Votes";
import abi from "../../context/myABI.json";
const Post = ({ post, commentIconVisible }) => {
  const history = useHistory();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const contractProcessor = useWeb3ExecuteFunction();
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
  const { account, user } = useMoralis();
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
    if (account.toLowerCase() === postOwner.toLowerCase())
      return message.error("You cannot vote on your own Post");
    if (voteStatus) return message.error("Already voted");
    const options = {
      contractAddress: contractAddress,
      functionName: direction,
      abi: abi,
      params: {
        _postId: post["postId"],
        [direction === "voteDown" ? "_reputationTaken" : "_reputationAdded"]: 1,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => message.success(direction),
      onError: (error) => console.error(error),
    });
  }
  const actions = [
    <Tooltip key="comment-basic-like" title="Vote Up">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginRight: "16px",
          color: "#eee",
        }}
        onClick={() => vote("voteUp")}
      >
        {voteStatus === 1 ? <LikeFilled /> : <LikeOutlined />}
      </span>
    </Tooltip>,
    <span style={{ fontSize: "15px", color: "#eee" }}>
      <Votes postId={postId} />
    </span>,
    <Tooltip key="comment-basic-dislike" title="Vote Down">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginLeft: "8px",
          color: "#eee",
        }}
        onClick={() => vote("voteDown")}
      >
        {voteStatus === -1 ? <DislikeFilled /> : <DislikeOutlined />}
      </span>
    </Tooltip>,
    commentIconVisible && (
      <Tooltip key="comment-basic-comment" title="Comment">
        <span
          style={{
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            marginLeft: "8px",
            color: "#eee",
          }}
          onClick={() =>
            history.push({ pathname: `/post/${postId}`, state: post })
          }
        >
          <FaRegComment />
        </span>
      </Tooltip>
    ),
  ];
  return (
    <Comment
      style={{
        boxShadow: "0 0.2rem 0.2rem rgb(189 197 209 / 20%)",
        backgroundColor: "#15202b",
        border: "1px solid #38444d",
        borderRadius: "0.5rem",
        fontSize: "16px",
        color: "#ffffff",
        padding: "0px 15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
      actions={actions}
      author={
        <Text style={{ color: "#777" }} strong>
          {postOwner}
        </Text>
      }
      avatar={
        <Avatar src={<Blockie address={postOwner} number={4} />}></Avatar>
      }
      content={
        <>
          <Text strong style={{ fontSize: "20px", color: "#fff" }}>
            {postContent["title"]}
          </Text>
          <p style={{ fontSize: "15px", color: "#ccc" }}>
            {postContent["content"]}
          </p>
          <Divider style={{ margin: "15px 0" }} />
        </>
      }
    />
  );
};

export default Post;
