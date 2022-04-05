import React, { useContext } from "react";
import { SocialContext } from "../../context/SocialContext";
import ProfilePage from "./ProfilePage";
import ProfilePosts from "./ProfilePosts";
import Sidebar from "../Sidebar/Sidebar";
import "./profile.css";
function Profile() {
  const { fetchedCategories } = useContext(SocialContext);
  return (
    <div className="profileOuterWrapper">
      <div className="profileContent">
        <Sidebar categories={fetchedCategories} />
        <div className="profileMainContent no-scrollbar">
          <ProfilePage />
          <ProfilePosts />
        </div>
      </div>
    </div>
  );
}

export default Profile;
