import React, { useState, useContext } from "react";
import { CgMoreO } from "react-icons/cg";
import SidebarOption from "./SidebarOption";
import {
  BsPerson,
  BsPersonFill,
  BsChatLeftDots,
  BsChatLeftDotsFill,
} from "react-icons/bs";
import "./Sidebar.css";
import { FaHashtag } from "react-icons/fa";
import { BiHash } from "react-icons/bi";

import { SocialContext } from "../../context/SocialContext";
import Account from "../Account/Account";
import ChangeUsername from "../ChangeUsername";
import { useMoralis } from "react-moralis";
function Sidebar({ categories, initialSelectedIcon = "Web3" }) {
  const [selected, setSelected] = useState(initialSelectedIcon);
  const { setSelectedCategory } = useContext(SocialContext);
  function selectCategory(categoryId) {
    const selectedCategory = categories.filter(
      (category) => category.categoryId === categoryId
    );
    setSelectedCategory(selectedCategory[0]);
  }
  const { user } = useMoralis();
  return (
    <div className="wrapper">
      <div className="iconContainer">Open UP</div>
      <div className="navContainer">
        <div className="name">Categories</div>
        {categories.map((category) => (
          <SidebarOption
            Icon={selected === category.category ? FaHashtag : BiHash}
            key={category.categoryId}
            text={category.category}
            id={category.categoryId}
            isActive={Boolean(selected === category.category)}
            setSelected={setSelected}
            selectCategory={selectCategory}
            redirect={"/"}
          />
        ))}
        <SidebarOption
          Icon={selected === "Profile" ? BsPersonFill : BsPerson}
          text="Profile"
          isActive={Boolean(selected === "Profile")}
          setSelected={setSelected}
          redirect={"/profile"}
        />
        <SidebarOption
          Icon={
            selected === "Discussions" ? BsChatLeftDotsFill : BsChatLeftDots
          }
          text="Discussions"
          isActive={Boolean(selected === "Discussions")}
          setSelected={setSelected}
          redirect={"/discussions"}
        />
        <div className="Button">
          <ChangeUsername />
        </div>
      </div>
      <div className="profileButton">
        <div className="profileLeft"></div>
        <div className="profileRight">
          <div className="details">
            <div className="name">{user.getUsername()}</div>
            <div className="handle">
              <Account />
            </div>
            <div className="moreContainer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
