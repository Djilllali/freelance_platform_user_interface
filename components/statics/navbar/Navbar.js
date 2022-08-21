import {
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";
import Styles from "./navbar.module.css";
function Navbar() {
  const router = useRouter();

  return (
    <>
      {" "}
      <div className={Styles.navbar_wrapper}>
        <span>
          <h3 className={Styles.logo}>Turing Jobs</h3>
        </span>
        <span>
          <Button
            type="text"
            icon={<FileTextOutlined />}
            size="large"
            className={Styles.nav_btn}
            onClick={() => {
              router.push("/terms");
            }}
          >
            Terms & conditions
          </Button>
          <Button
            type="text"
            icon={<MessageOutlined />}
            size="large"
            className={Styles.nav_btn}
            onClick={() => {
              router.push("/contact");
            }}
          >
            Contact Us
          </Button>
          <Button
            onClick={() => {
              router.push("/login");
            }}
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            size="large"
          >
            LOGIN
          </Button>
        </span>
      </div>
      <div className={Styles.navbar_relative}></div>
    </>
  );
}

export default Navbar;
