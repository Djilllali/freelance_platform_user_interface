import React from "react";
import { Card, message, Input, Form, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cleanupLogin, fetchSignin } from "../../reducers/loginReducer";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 27 },
  };

  const loginResult = useSelector((state) => state.login.loginResult);
  const loginError = useSelector((state) => state.login.loginError);
  const isLogging = useSelector((state) => state.login.isLogging);
  const dispatch = useDispatch();
  const handleLogin = (values) => {
    dispatch(fetchSignin(values));
    console.log(values);
  };
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/profile");
    }
  }, []);
  React.useEffect(() => {
    if (loginError) {
      message.error(loginError.message);
    } else {
      if (loginResult) {
        message.success(loginResult.message);

        router.push("/profile");
      }
    }
    dispatch(cleanupLogin());
  }, [loginResult, loginError]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#e5e5f7",

        backgroundImage:
          " radial-gradient(#c2c4ff 2px, transparent 2px), radial-gradient(#c2c4ff 2px, #e5e5f7 2px)",
        backgroundSize: "80px 80px",
        backgroundPosition: "0 0,40px 40px",
      }}
    >
      <Card
        bodyStyle={{ padding: "  1rem" }}
        style={{
          display: "block",
          width: "fit-content",
          height: "fit-content",
          padding: "0.5rem",
          borderRadius: "1rem",
          minWidth: "400px",
        }}
      >
        <img
          src={"https://placebear.com/g/200/100"}
          alt="QCM Geek"
          style={{ width: "10rem", margin: "0.5rem auto", display: "block" }}
        />{" "}
        <Form layout="vertical" name="Admin Login" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
              loading={isLogging}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="text" style={{ width: "100%" }}>
              Forgot password ?
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
