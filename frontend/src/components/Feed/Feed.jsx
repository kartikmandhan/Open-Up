import { SocialContext } from "../../context/SocialContext";
import React, { useContext, useState } from "react";
import { Avatar, Button } from "antd";
import Blockie from "../Blockie";
import AddPost from "./AddPost";
import PostInput from "./PostInput";
import Posts from "./Posts";
const Feed = () => {
  const { selectedCategory } = useContext(SocialContext);
  const [addPostVisible, setAddPostVisible] = useState(false);
  return (
    <div className="col-lg-9">
      {selectedCategory.category === "default" ? (
        <h4>Please Select a Category</h4>
      ) : (
        <>
          <div
            style={{
              justifyContent: "space-between",
              boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
              backgroundColor: "white",
              border: "1px solid #e7eaf3",
              borderRadius: "0.5rem",
              fontSize: "16px",
              color: "#1F3947",
              display: "flex",
              alignItems: "center",

              padding: "10px 13px",
            }}
          >
            <Avatar src={<Blockie currentWallet />} />
            <h4>Your Reputation in {selectedCategory?.category} is 0</h4>
            <Button
              onClick={() => {
                setAddPostVisible((prevValue) => !prevValue);
              }}
              shape="round"
            >
              Post
            </Button>
          </div>

          {addPostVisible && <PostInput />}
          <Posts />
        </>
      )}
    </div>
  );
};

export default Feed;
