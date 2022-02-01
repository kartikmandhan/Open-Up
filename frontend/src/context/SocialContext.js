import React, { useState } from "react";
export const SocialContext = React.createContext();
const SocialContextProvider = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: "0x",
    category: "default",
  });
  return (
    <SocialContext.Provider value={{ setSelectedCategory, selectedCategory }}>
      {props.children}
    </SocialContext.Provider>
  );
};

export default SocialContextProvider;
