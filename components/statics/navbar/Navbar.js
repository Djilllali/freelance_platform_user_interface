import {
  DollarOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MessageOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Popover } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./navbar.module.css";
import { cleanupLogin, logout } from "../../../reducers/loginReducer";

function Navbar() {
  const loginResult = useSelector((state) => state.login.loginResult);
  const loginError = useSelector((state) => state.login.loginError);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setisLoggedIn(true);
    console.log("---------token ,", localStorage.getItem("token"));
  }, [loginResult]);
  const items = [
    { label: "Profile", key: "item-1-profile", icon: <UserOutlined /> },
    { label: "Settings", key: "item-2-settings", icon: <SettingOutlined /> },
    { label: "Logout", key: "item-3-logout", icon: <LogoutOutlined /> },
  ];

  const ProfileMenu = () => {
    return (
      <Menu
        items={items}
        onClick={(e) => {
          if (e.key == "item-1-profile") router.push("/profile");
          if (e.key == "item-2-settings") router.push("/settings");
          if (e.key == "item-3-logout") {
            dispatch(logout());
            setisLoggedIn(false);
            router.push("/login");
          }
        }}
      />
    );
  };
  return (
    <>
      <div className={Styles.navbar_wrapper}>
        <span>
          <img
            onClick={() => {
              router.push("/");
            }}
            className={Styles.logo}
            src="/turinglogo.png"
          ></img>
        </span>
        {!isLoggedIn ? (
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
        ) : (
          <span>
            <Button
              type="text"
              icon={<ScheduleOutlined />}
              size="large"
              className={Styles.nav_btn}
              onClick={() => {
                router.push("/current_work");
              }}
            >
              My Projects
            </Button>
            <Button
              type="text"
              icon={<SearchOutlined />}
              size="large"
              className={Styles.nav_btn}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Browse Projects
            </Button>

            <Button
              type="text"
              icon={<DollarOutlined />}
              size="large"
              className={Styles.nav_btn}
              onClick={() => {
                router.push("/financial_dashboard");
              }}
            >
              Financial Dashboard
            </Button>
            <Popover content={<ProfileMenu />} trigger="click">
              <Avatar
                style={{
                  backgroundColor: "#5d37d0",
                }}
                size={40}
              >
                MK
              </Avatar>
            </Popover>
          </span>
        )}
      </div>
      <div className={Styles.navbar_wrapper_rel}>
        <span>
          <h3 className={Styles.logo}>Turing Jobs</h3>
        </span>
        <span></span>
      </div>
    </>
  );
}

export default Navbar;
