import React, { useState, useContext } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import Blockie from "../Blockie";
import "./Feed.css";
import { message, Tooltip, notification } from "antd";
import { useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import abi from "../../context/myABI.json";
import { SocialContext } from "../../context/SocialContext";
function PostInput({ parentId = "0x91", isComment = false }) {
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
        _parentId: parentId,
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
    openNotification();
    e.preventDefault();
    if (!validateForm() && !isComment) {
      return message.error(
        "Remember to add the title and the content of your post"
      );
    }
    console.log(title, content);
    uploadPost({ title, content });
    clearForm();
  }
  const openNotification = () => {
    notification.open({
      message: isComment ? "Comment Created" : "Post Created",
      description:
        "Complete Metamask transaction, and wait for the transaction to proceed",
      onClick: () => {},
    });
  };
  return (
    <div className="postInputWrapper">
      <div className="InputBoxLeft">
        <Blockie currentWallet scale={3} />
      </div>
      <div className="InputBoxRight ">
        <form>
          {!isComment && (
            <input
              type="text"
              className="inputField"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <textarea
            type="text"
            className="inputField"
            placeholder={isComment ? "Enter Comment..." : "What's Happening?.."}
            rows={isComment ? "1" : "3"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="formLowerContainer">
            {!isComment && (
              <div className="iconsContainer">
                <Tooltip key="comming-soon" title="Coming Soon">
                  <BsCardImage className="icon" />
                  <RiFileGifLine className="icon" />
                  <RiBarChartHorizontalFill className="icon" />
                  <BsEmojiSmile className="icon" />
                  <IoMdCalendar className="icon" />
                  <MdOutlineLocationOn className="icon" />
                </Tooltip>
              </div>
            )}
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
