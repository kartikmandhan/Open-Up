import React, { useContext } from "react";
import "./Feed.css";
import PostInput from "./PostInput";
import { SocialContext } from "../../context/SocialContext";
import { BsStars } from "react-icons/bs";
import Posts from "./Posts";
import { Avatar } from "antd";
import Reputation from "../Reputation";
import Blockie from "../Blockie";
function NewsFeed() {
  const { selectedCategory } = useContext(SocialContext);
  return (
    <div className="outerWrapper">
      <div className="header">
        <div className="headerTitle">{selectedCategory.category}</div>
        <BsStars />
      </div>
      <div
        style={{
          justifyContent: "space-between",
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          backgroundColor: "#55C096",
          border: "1px solid #77C096",
          borderRadius: "0.5rem",
          fontSize: "16px",
          color: "#1F3947",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          padding: "10px 13px",
        }}
      >
        <Avatar src={<Blockie currentWallet />} />
        <h4>
          Your Reputation in {selectedCategory?.category} is {<Reputation />}
        </h4>
      </div>
      <PostInput />
      <Posts />
    </div>
  );
}

export default NewsFeed;
