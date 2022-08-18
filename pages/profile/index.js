import { Avatar, Tag } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../reducers/dashboardReducer";

function index() {
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
    <div style={{ padding: "3rem" }}>
      <div>
        <div>
          <Avatar
            style={{
              backgroundColor: "#2db7f5",
            }}
            size={128}
            icon={<UserOutlined />}
          />
        </div>
        <div>
          <Title level={2}>{fetchProfileResult?.name}</Title>
          <Title level={5}>{fetchProfileResult?.domain?.name}</Title>
        </div>
      </div>
      <br />
      <Title level={5}>Bio :</Title>
      <Paragraph
        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
        style={{ maxWidth: "30rem" }}
      >
        {fetchProfileResult?.bio}
      </Paragraph>
      <br />
      <Title level={5}>Pack :</Title>

      <Tag color="#2db7f5">{fetchProfileResult?.pack?.name}</Tag>
      <br />
      <br />
      <Title level={5}>Skills :</Title>
      <div>
        <Tag color="red">React</Tag>
        <Tag color="volcano">NodeJS</Tag>
        <Tag color="orange">Redux</Tag>
        <Tag color="gold">Javascript</Tag>
        <Tag color="lime">python</Tag>
        <Tag color="green">Mobile development</Tag>
        <Tag color="cyan">SQL</Tag>
        <Tag color="blue">noSQL</Tag>
      </div>
    </div>
  );
}

export default index;
