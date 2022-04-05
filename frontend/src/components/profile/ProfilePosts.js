import { Skeleton } from "antd";
import React, { useContext } from "react";
import { useMoralisQuery } from "react-moralis";
import { SocialContext } from "../../context/SocialContext";
import Post from "../Feed/Post";

const ProfilePosts = () => {
  const { account } = useContext(SocialContext);
  const { data, isFetching } = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("postOwner", account),
    [account],
    { live: true }
  );
  let fetchedPosts = JSON.parse(
    JSON.stringify(data, ["postId", "contentId", "postOwner", "parentId"])
  ).reverse();
  fetchedPosts = fetchedPosts.filter(
    (pst) =>
      pst.parentId ===
      "0x9100000000000000000000000000000000000000000000000000000000000000"
  );
  const EmptyPost = () => (
    <div className="">
      <h3>You have not created any posts yet </h3>
    </div>
  );
  return isFetching ? (
    <Skeleton avatar actve paragraph={{ rows: 4 }} />
  ) : (
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

export default ProfilePosts;
