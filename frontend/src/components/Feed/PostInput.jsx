import React, { useState, useContext } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import Blockie from "../Blockie";
import "./Feed.css";
import { message } from "antd";
import { useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import abi from "../../context/myABI.json";
import { SocialContext } from "../../context/SocialContext";
function PostInput() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { selectedCategory } = useContext(SocialContext);
  const ipfsProcessor = useMoralisFile();
  const contractProcessor = useWeb3ExecuteFunction();
  const validateForm = () => {
    let result = !title || !content ? false : true;
    return result;
  };
  const processContent = async (content) => {
    const ipfsResult = await ipfsProcessor.saveFile(
      "post.json",
      { base64: btoa(JSON.stringify(content)) },
      { saveIPFS: true }
    );
    return ipfsResult._ipfs;
  };

  async function uploadPost(post) {
    const contentURI = await processContent(post);
    // console.log(contentURI);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const options = {
      contractAddress: contractAddress,
      functionName: "createPost",
      abi: abi,
      params: {
        _parentId: "0x91",
        _contentUri: contentURI,
        _categoryId: selectedCategory.categoryId,
      },
    };
    // console.log(options);
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => message.success("success"),
      onError: (error) => {
        message.error("Unable to create a post at this momment");
        console.log("err", error);
      },
    });
  }
  const clearForm = () => {
    setTitle("");
    setContent("");
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      return message.error(
        "Remember to add the title and the content of your post"
      );
    }
    console.log(title, content);
    uploadPost({ title, content });
    clearForm();
  }

  return (
    <div className="wrapper">
      <div className="InputBoxLeft">
        <Blockie currentWallet scale={3} />
      </div>
      <div className="InputBoxRight">
        <form>
          <input
            type="text"
            className="inputField"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="inputField"
            placeholder="What's Happening?.."
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="formLowerContainer">
            <div className="iconsContainer">
              <BsCardImage className="icon" />
              <RiFileGifLine className="icon" />
              <RiBarChartHorizontalFill className="icon" />
              <BsEmojiSmile className="icon" />
              <IoMdCalendar className="icon" />
              <MdOutlineLocationOn className="icon" />
            </div>
            <button
              type="submit"
              className={`submitGeneral ${
                content ? "activeSubmit" : "inactiveSubmit"
              }`}
              onClick={onSubmit}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostInput;
