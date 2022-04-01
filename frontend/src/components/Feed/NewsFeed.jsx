import React, { useContext, useState } from "react";
import "./Feed.css";
import PostInput from "./PostInput";
import { SocialContext } from "../../context/SocialContext";
import { BsStars } from "react-icons/bs";
import Posts from "./Posts";
function NewsFeed() {
  return (
    <div className="outerWrapper">
      <div className="header">
        <div className="headerTitle">Home</div>
        <BsStars />
      </div>
      <PostInput />
      <Posts />
    </div>
  );
}

export default NewsFeed;
