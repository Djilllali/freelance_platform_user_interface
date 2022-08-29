import React from "react";
import { Button, Card, Checkbox, Form, Input } from "antd";
import Styles from "./contact.module.css";
function Contact() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card title="✉️  Contact us : " className={Styles.contact_card}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name !",
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email !",
              },
            ]}
          >
            <Input placeholder="name@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please input message subject  !",
              },
            ]}
          >
            <Input placeholder="subject" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: "Please input message body  !",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="message body" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Contact;
