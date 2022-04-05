import React, { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
export const SocialContext = React.createContext();
const SocialContextProvider = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId:
      "0x632da0ba9b5240ef1bffe1bdbf6b894b5b53737235fc1ba2451bba200e073607",
    category: "Web3",
  });
  const { account } = useMoralis();
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );
  return (
    <SocialContext.Provider
      value={{
        account,
        setSelectedCategory,
        selectedCategory,
        fetchedCategories,
      }}
    >
      {props.children}
    </SocialContext.Provider>
  );
};

export default SocialContextProvider;
