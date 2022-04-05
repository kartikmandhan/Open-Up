import React from "react";
import { useMoralisQuery } from "react-moralis";
import Sidebar from "./Sidebar/Sidebar";
import Post from "./Feed/Post";
import PostInput from "./Feed/PostInput";
const CommentPage = (props) => {
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );
  const post = props.location.state;
  console.log(post.postId);
  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("parentId", post?.postId),
    [post],
    { live: true }
  );
  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();
  console.log(fetchedPosts);
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          fontFamily: "Roboto, sans-serif",
          color: "#041836",
          padding: "10px 30px",
          maxWidth: "1200px",
          width: "100%",
          gap: "20px",
        }}
      >
        <Sidebar categories={fetchedCategories} />
        <div style={{ flexDirection: "column" }}>
          <Post post={post} commentIconVisible={false} />
          {fetchedPosts?.length > 0 &&
            fetchedPosts.map((post) => (
              <Post key={post?.postId} post={post} commentIconVisible={false} />
            ))}
          <PostInput parentId={post?.postId} isComment={true} />
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
