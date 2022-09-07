import {
  DollarOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Popover } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./navbar.module.css";
import { cleanupLogin, logout } from "../../../reducers/loginReducer";
import { fetchUserProfile } from "../../../reducers/dashboardReducer";

function Navbar() {
  const loginResult = useSelector((state) => state.login.loginResult);
  const loginError = useSelector((state) => state.login.loginError);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const fetchProfileResult = useSelector(
    (state) => state.dashboard.fetchProfileResult?.data
  );
  useEffect(() => {
    if (localStorage.getItem("token")) setisLoggedIn(true);
    console.log("---------token ,", localStorage.getItem("token"));
  }, [loginResult]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserProfile());
    }
  }, [isLoggedIn]);
  const items = [
    { label: "Profile", key: "item-1-profile", icon: <UserOutlined /> },
    { label: "Settings", key: "item-2-settings", icon: <SettingOutlined /> },
    { label: "Logout", key: "item-3-logout", icon: <LogoutOutlined /> },
  ];
  const HamburgerLoggedInMenu = () => {
    return (
      <Menu
        items={[
          {
            label: "Terms & conditions",
            key: "hamburger_logout_terms",
            icon: <FileTextOutlined />,
          },
          {
            label: "Register",
            key: "hamburger_logout_register",
            icon: <UsergroupAddOutlined />,
          },
          {
            label: "Login",
            key: "hamburger_logout_login",
            icon: <UserOutlined />,
          },
        ]}
        onClick={(e) => {
          if (e.key == "hamburger_logout_terms") router.push("/terms");
          if (e.key == "hamburger_logout_register") router.push("/register");
          if (e.key == "hamburger_logout_login") {
            router.push("/login");
          }
        }}
      />
    );
  };
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
        <span className={Styles.hamburger}>
          <Popover content={<HamburgerLoggedInMenu />} trigger="click">
            <Button size="large" icon={<MenuOutlined />}></Button>
          </Popover>
        </span>
        {!isLoggedIn ? (
          <span className={Styles.menulogged}>
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
              icon={<UsergroupAddOutlined />}
              size="large"
              className={Styles.nav_btn}
              onClick={() => {
                router.push("/register");
              }}
            >
              Register
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
          <span className={Styles.menulogged}>
            <Button
              type="text"
              icon={<ScheduleOutlined />}
              size="large"
              className={Styles.nav_btn}
              onClick={() => {
                router.push("/myprojects");
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
                {fetchProfileResult?.name[0].toUpperCase()}
              </Avatar>
            </Popover>
          </span>
        )}
      </div>
    </>
  );
}

export default Navbar;
