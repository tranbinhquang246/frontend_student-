import React from "react";
import axios from "axios";
import { Button, Form, Input, InputNumber } from "antd";

function ModalAdd({ setIsOpenModalAdd, setIsOpenHome, setData }) {
  const getStudent = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}students`);
    setData(response.data);
  };

  const submitCreateStudent = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_URL}students`, data)
      .then((response) => {
        getStudent();
        alert(response.data.message);
        setIsOpenModalAdd(false);
        setIsOpenHome(true);
      });
  };

  const handleClickCancel = () => {
    setIsOpenModalAdd(false);
    setIsOpenHome(true);
  };
  const onFinish = (values) => {
    submitCreateStudent(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-500">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Class"
          name="classroom"
          rules={[{ required: true, message: "Please input your class" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Avatar URL"
          name="avatar"
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="default"
            htmlType="button"
            className="ml-2"
            onClick={handleClickCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ModalAdd;
