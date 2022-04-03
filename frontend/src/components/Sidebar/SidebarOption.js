import React from "react";
import "./Sidebar.css";
import { useHistory } from "react-router";

function SidebarOption({
  text,
  Icon,
  redirect,
  isActive,
  setSelected,
  selectCategory,
  id,
}) {
  const router = useHistory();
  return (
    <div
      className={
        isActive ? " innerWrapper textActive" : " innerWrapper textGeneral"
      }
      onClick={() => {
        console.log(text);
        if (redirect) router.push(redirect);
        if (selectCategory) {
          selectCategory(id);
        }
        setSelected(text);
      }}
    >
      <div className="iconContainer">
        <Icon />
      </div>
      <div>{text}</div>
    </div>
  );
}

export default SidebarOption;
