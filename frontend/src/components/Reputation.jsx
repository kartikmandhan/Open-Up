import { useMoralisQuery, useMoralis } from "react-moralis";
import { useContext, useState } from "react";
import { useEffect } from "react";
import abi from "../context/myABI.json";
import { SocialContext } from "../context/SocialContext";
const Reputation = () => {
  const { Moralis, account } = useMoralis();
  const { selectedCategory } = useContext(SocialContext);
  const [reputationValue, setReputation] = useState(0);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postOwner", account),
    [],
    {
      live: true,
    }
  );

  const categoryId = selectedCategory["categoryId"];

  const options = {
    contractAddress: contractAddress,
    functionName: "getReputation",
    abi: abi,
    params: {
      _address: account,
      _categoryID: categoryId,
    },
  };

  useEffect(() => {
    async function getReputation() {
      await Moralis.enableWeb3();
      const result = await Moralis.executeFunction(options);
      setReputation(result);
    }

    getReputation();
  }, [votes, account, categoryId]);

  return <>{reputationValue}</>;
};

export default Reputation;
