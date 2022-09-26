import { Avatar, Button, Form, Input, Select, Tag } from "antd";
import React, { useState } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { editProfile, fetchUserProfile } from "../../reducers/dashboardReducer";
import Styles from "./profile.module.css";
import { Skeleton } from "antd";
import Head from "next/head";
import { getDomains } from "../../reducers/domainsReducer";

function Index() {
  const dispatch = useDispatch();
  const [EditProfile, setEditProfile] = useState(false);
  const fetchProfileResult = useSelector(
    (state) => state.dashboard.fetchProfileResult?.data
  );
  const isFetchingProfile = useSelector(
    (state) => state.dashboard.isFetchingProfile
  );
  const domainsList = useSelector((state) => state.domains.domainsResult?.data);
  React.useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getDomains());
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
      <Title level={5}>Bio : </Title>
      {!isFetchingProfile ? (
        <>
          {fetchProfileResult?.bio && (
            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
              {fetchProfileResult?.bio}
            </Paragraph>
          )}
        </>
      ) : (
        <Skeleton active paragraph={{ rows: 3 }}></Skeleton>
      )}
      <br />
      <Title level={5}>Pack :</Title>

      <Tag color="#2db7f5">{fetchProfileResult?.pack?.name}</Tag>
      <br />
      <br />
      {!EditProfile && (
        <Button
          type="default"
          shape=""
          icon={<EditOutlined />}
          onClick={() => {
            setEditProfile(true);
          }}
        >
          Edit Profile
        </Button>
      )}

      {EditProfile && (
        <>
          <br />
          <br />
          <Form
            layout="vertical"
            onFinish={(values) => {
              dispatch(editProfile(values));
              setEditProfile(false);
            }}
          >
            <Form.Item name="domain" label="Domain :">
              <Select
                placeholder="choose a domain"
                options={domainsList?.map((dm) => ({
                  label: dm.name,
                  value: dm._id,
                }))}
              ></Select>
            </Form.Item>
            <Form.Item name="bio">
              <Input.TextArea placeholder="add bio ..."></Input.TextArea>
            </Form.Item>
            <Form.Item name="personal_email">
              <Input placeholder="edit email ..."></Input>
            </Form.Item>
            <Form.Item name="ccp">
              <Input placeholder="edit CCP ..."></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

export default Index;
