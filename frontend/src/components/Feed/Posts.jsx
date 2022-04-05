import React, { useContext } from "react";
import { useMoralisQuery } from "react-moralis";
import { SocialContext } from "../../context/SocialContext";
import Post from "./Post";

const Posts = () => {
  const { selectedCategory } = useContext(SocialContext);
  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("categoryId", selectedCategory.categoryId),
    [selectedCategory],
    { live: true }
  );
  let fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, [
      "postId",
      "contentId",
      "postOwner",
      "parentId",
    ])
  ).reverse();
  console.log(fetchedPosts);
  fetchedPosts = fetchedPosts.filter(
    (pst) =>
      pst.parentId ===
      "0x9100000000000000000000000000000000000000000000000000000000000000"
  );
  const EmptyPost = () => (
    <div className="">
      <h3>Be the first one to post here for {selectedCategory.category} </h3>
    </div>
  );
  return (
    <div>
      {fetchedPosts.length > 0 ? (
        fetchedPosts.map((post) => (
          <Post key={post.postId} post={post} commentIconVisible={true} />
        ))
      ) : (
        <EmptyPost />
      )}
    </div>
  );
};

export default Posts;
