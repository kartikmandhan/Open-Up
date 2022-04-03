import { Button } from "antd";
import React, { useState, useContext } from "react";
import { message } from "antd";
import { useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import abi from "../../context/myABI.json";
import { SocialContext } from "../../context/SocialContext";
const AddPost = () => {
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
    console.log(options);
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
    <form>
      <div className="row">
        <div className="form-group display-flex">
          <input
            type="text"
            className="mb-2 mt-2 form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="mb-2 form-control"
            placeholder="Post away"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            onClick={onSubmit}
            style={{
              width: "100px",
              alignSelf: "center",
              marginLeft: "auto",
              background: "#111",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
