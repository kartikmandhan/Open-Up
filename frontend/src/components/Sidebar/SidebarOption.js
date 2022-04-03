import React from "react";
import "./Sidebar.css";
import { useHistory } from "react-router";
const style = {
  wrapper: `w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#33c45] transition-all hover:duration-200 hover:ease-in-out`,
  iconContainer: `text-xl mr-4`,
  textGeneral: `font-medium`,
  textActive: `font-bold`,
};
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
      className={style.wrapper}
      onClick={() => {
        console.log(text);
        if (redirect) router.push(redirect);
        if (selectCategory) {
          selectCategory(id);
        }
        setSelected(text);
      }}
    >
      <div className={style.iconContainer}>
        <Icon />
      </div>
      <div className={isActive ? style.textActive : style.textGeneral}>
        {text}
      </div>
    </div>
  );
}

export default SidebarOption;
