import { Menu } from "antd";
import { SocialContext } from "../context/SocialContext";
import React, { useContext } from "react";

const Categories = ({ categories }) => {
  const { setSelectedCategory } = useContext(SocialContext);
  function selectCategory(categoryId) {
    const selectedCategory = categories.filter(
      (category) => category.categoryId === categoryId
    );
    setSelectedCategory(selectedCategory[0]);
  }
  return (
    <div className="col-lg-3">
      <Menu
        onClick={(e) => selectCategory(e.key)}
        mode="inline"
        style={{
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          backgroundColor: "white",
          border: "1px solid #e7eaf3",
          borderRadius: "0.5rem",
          fontSize: "16px",
          color: "#1F3947",
          padding: "10px 0",
        }}
      >
        <Menu.ItemGroup title="Categories">
          {categories.map((category) => (
            <Menu.Item key={category.categoryId}>{category.category}</Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default Categories;
