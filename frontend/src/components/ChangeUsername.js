import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Modal, Form, Input } from "antd";

const ChangeUsernameForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { user } = useMoralis();

  return (
    <Modal
      visible={visible}
      title="Update Username"
      okText="Update"
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
          name="username"
          label="New Username"
          rules={[
            {
              required: true,
              message: `Enter your new username (current: ${user.getUsername()})`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function ChangeUsername() {
  const [visible, setVisible] = useState(false);
  const { setUserData, isUserUpdating } = useMoralis();
  const onCreate = async (values) => {
    setVisible(false);
    // console.log(options);
    const username = values.username;
    if (!username) return;

    setUserData({
      username,
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
        Change Username
      </div>
      <ChangeUsernameForm
        visible={visible}
        onCreate={onCreate}
        disabled={isUserUpdating}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

export default ChangeUsername;
