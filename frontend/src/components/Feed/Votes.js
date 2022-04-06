import React, { useEffect, useState } from "react";
import abi from "../../context/myABI.json";
import { useMoralis, useMoralisQuery } from "react-moralis";

function Votes({ postId }) {
  const { Moralis } = useMoralis();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const [postVotes, setPostVotes] = useState("0");

  const { data } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postId", postId),
    [],
    { live: true }
  );
  const options = {
    contractAddress: contractAddress,
    functionName: "getPost",
    abi: abi,
    params: {
      _postId: postId,
    },
  };

  useEffect(() => {
    async function getPostVotes() {
      await Moralis.enableWeb3();
      const result = await Moralis.executeFunction(options);
      //   console.log("results", result);
      setPostVotes(result[3]);
    }
    getPostVotes();
    // eslint-disable-next-line
  }, [data]);

  return <>{postVotes}</>;
}

export default Votes;
