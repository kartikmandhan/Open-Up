import React, { useState } from "react";
export const SocialContext = React.createContext();
const SocialContextProvider = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId:
      "0x632da0ba9b5240ef1bffe1bdbf6b894b5b53737235fc1ba2451bba200e073607",
    category: "Web3",
  });
  return (
    <SocialContext.Provider value={{ setSelectedCategory, selectedCategory }}>
      {props.children}
    </SocialContext.Provider>
  );
};

export default SocialContextProvider;
