import { SocialContext } from "../context/SocialContext";
import React, { useContext } from "react";
import { Feed } from "./Feed";
import Sidebar from "./Sidebar/Sidebar";
const Main = () => {
  const { fetchedCategories } = useContext(SocialContext);
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
        <Feed />
      </div>
    </div>
  );
};

export default Main;
