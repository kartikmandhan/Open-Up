import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import abi from "../context/myABI.json";
import { useWeb3ExecuteFunction } from "react-moralis";

const AddCategoryForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new Category"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of Category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function AddCategory() {
  const [visible, setVisible] = useState(false);

  const contractProcessor = useWeb3ExecuteFunction();
  const onCreate = async (values) => {
    setVisible(false);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

    const options = {
      contractAddress: contractAddress,
      functionName: "addCategory",
      abi: abi,
      params: {
        _category: values.title,
      },
    };
    // console.log(options);
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        message.success("success");
        window.location.href = "/";
      },
      onError: (error) => {
        message.error("Unable to create a post at this momment");
        console.log("err", error);
      },
    });
  };

  return (
    <div>
      <div
        style={{
          color: "#eee",
        }}
        onClick={() => {
          setVisible(true);
        }}
      >
        New Category
      </div>
      <AddCategoryForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

export default AddCategory;
