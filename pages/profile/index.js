import { Avatar, Tag } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../reducers/dashboardReducer";
import Styles from "./profile.module.css";
import { Skeleton } from "antd";
import Head from "next/head";

function Index() {
  const dispatch = useDispatch();

  const fetchProfileResult = useSelector(
    (state) => state.dashboard.fetchProfileResult?.data
  );
  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      style={{
        padding: "3rem",
        width: "90%",
        maxWidth: " 700px",
        margin: "1rem auto",
      }}
    >
      <Head>
        <title>Profile</title>
      </Head>
      <div className={Styles.profile_header}>
        <div>
          <Avatar
            style={{
              backgroundColor: "#5d37d0",
            }}
            size={128}
            icon={<UserOutlined />}
          />
        </div>
        <div className={Styles.profile_header_name}>
          {fetchProfileResult?.name ? (
            <Title level={2}>{fetchProfileResult?.name}</Title>
          ) : (
            <Skeleton active paragraph={{ rows: 0 }}></Skeleton>
          )}
          {fetchProfileResult?.domain?.name ? (
            <Title level={5}>{fetchProfileResult?.domain?.name}</Title>
          ) : (
            <Skeleton active paragraph={{ rows: 0 }}></Skeleton>
          )}
        </div>
      </div>
      <br />
      <Title level={5}>Bio :</Title>
      {fetchProfileResult?.bio ? (
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {fetchProfileResult?.bio}
        </Paragraph>
      ) : (
        <Skeleton active paragraph={{ rows: 3 }}></Skeleton>
      )}
      <br />
      <Title level={5}>Pack :</Title>

      <Tag color="#2db7f5">{fetchProfileResult?.pack?.name}</Tag>
      <br />
      <br />
    </div>
  );
}

export default Index;
