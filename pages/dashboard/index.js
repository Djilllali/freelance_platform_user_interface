import { Checkbox, Form, Layout, Spin, Tag, Typography } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect } from "react";
import { Select } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { exploreJobs } from "../../reducers/jobsReducer";
import Styles from "./jobs.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
const { Option } = Select;

const { Header, Footer, Sider, Content } = Layout;

const tag_colors = [
  "magenta",
  "#87d068",
  "volcano",
  "#108ee9",
  "orange",
  "#f50",
  "gold",
  "lime",
  "blue",
  "geekblue",
  "purple",

  "#2db7f5",
];

function index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const exploreJobsResult = useSelector(
    (state) => state.jobs.exploreJobsResult?.jobs
  );
  const exploreJobsError = useSelector(
    (state) => state.jobs.exploreJobsError?.data
  );
  const isExploringJobs = useSelector((state) => state.jobs.isExploringJobs);

  useEffect(() => {
    dispatch(exploreJobs());
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Head>
        <title>Explore jobs</title>
      </Head>
      <Layout style={{ minHeight: "90vh" }}>
        <Sider
          width={260}
          theme="light"
          style={{ padding: "1rem", paddingTop: "3rem" }}
        >
          <Form>
            <Typography.Title level={5}> Keyword : </Typography.Title>

            <Form.Item>
              <Search
                placeholder="search keyword"
                onSearch={() => {}}
                enterButton
              />
            </Form.Item>
            <Typography.Title level={5}> Domains : </Typography.Title>
            <Form.Item>
              <Checkbox onChange={() => {}}>Informatique</Checkbox>
              <br />
              <Checkbox onChange={() => {}}>Santé</Checkbox>
              <br />

              <Checkbox onChange={() => {}}>Business</Checkbox>
              <br />

              <Checkbox onChange={() => {}}>Sciences humaines</Checkbox>
            </Form.Item>
            <Typography.Title level={5}> Skills : </Typography.Title>

            <Form.Item>
              <Select
                mode="tags"
                style={{ width: "100%" }}
                onChange={() => {}}
              ></Select>
            </Form.Item>
          </Form>
        </Sider>
        <Content
          style={{ overflowY: "clip", maxHeight: "80vh", padding: "2rem" }}
        >
          <Card
            title="Explore projects : "
            bodyStyle={{ padding: "1rem", height: "75vh", overflowY: "scroll" }}
            extra={
              <>
                <Typography.Title
                  level={5}
                  style={{ display: "inline", marginRight: "1rem" }}
                >
                  Sort :{" "}
                </Typography.Title>
                <Select defaultValue={"recent"} onChange={() => {}}>
                  <Option value="recent">Recent</Option>
                  <Option value="rate">Hourly rate</Option>
                </Select>
              </>
            }
          >
            {isExploringJobs ? (
              <div
                style={{
                  display: "block",
                  width: "fit-content",
                  margin: "2rem auto",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <>
                {exploreJobsResult?.map((proj, index) => {
                  let color_index = index % tag_colors.length;
                  return (
                    <>
                      {" "}
                      <Card
                        className={Styles.job_item}
                        type="inner"
                        title={proj.title}
                        onClick={() => {
                          router.push(`/project/${proj._id}`);
                        }}
                        extra={<a href={`/project/${proj._id}`}>More</a>}
                      >
                        {proj.description}{" "}
                        <div>
                          <br />
                          {proj.skills?.map((skill) => {
                            return (
                              <Tag color={tag_colors[color_index]}>{skill}</Tag>
                            );
                          })}
                        </div>
                      </Card>
                      <br />
                    </>
                  );
                })}
              </>
            )}
          </Card>
        </Content>
      </Layout>
    </div>
  );
}

export default index;
