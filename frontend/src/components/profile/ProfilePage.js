import React, { useContext } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from "react-router";
import Blockie from "../Blockie";
import "./profile.css";
import { SocialContext } from "../../context/SocialContext";

function ProfilePage() {
  const router = useHistory();
  const { account } = useContext(SocialContext);
  return (
    <div className="profileWrapper ">
      <div className="profileHeader">
        <div className="backButton" onClick={() => router.push("/")}>
          <BsArrowLeftShort />
        </div>
        <div className="px-3">
          <div className="profilePrimary">Kartik Mandhan</div>
          <div className="profileSecondary">4 Posts</div>
        </div>
      </div>
      <div className="coverPhotoContainer">
        <img
          src="http://wonderfulengineering.com/wp-content/uploads/2014/05/twitter-header-1500x500-px-610x203.jpg"
          alt=""
          className="coverPhoto"
        />
      </div>
      <div className="profileImageContainer">
        <div className="profileImageContainer">
          <Blockie currentWallet size={20} />
        </div>
      </div>
      <div className="px-3">
        <div className="">
          <div className="profilePrimary">Kartik Mandhan</div>
        </div>
        <div className="profileSecondary">
          {account && `${account.slice(0, 8)}...${account.slice(-4)}`}
        </div>
      </div>
      <div className="profileNav">
        <h5 className="activeNav">My Posts</h5>
        {/* <div>Reputations</div>
        <div>Media</div>
        <div>Likes</div> */}
      </div>
    </div>
  );
}

export default ProfilePage;
