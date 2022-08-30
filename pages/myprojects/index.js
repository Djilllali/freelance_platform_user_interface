import { Button, PageHeader, Table, Tag, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs } from "../../reducers/myjobsReducer";
import Styles from "./myprojects.module.css";
function index() {
  const fetchJobsResult = useSelector(
    (state) => state.myjobs.fetchJobsResult?.jobs
  );
  const fetchJobsError = useSelector(
    (state) => state.myjobs.fetchJobsError?.data
  );
  const isFetchingJobs = useSelector((state) => state.myjobs.isFetchingJobs);

  const router = useRouter();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Typography.Paragraph
          style={{ maxWidth: "30rem" }}
          ellipsis={{ rows: 1, expandable: false, symbol: "more" }}
        >
          {text}
        </Typography.Paragraph>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => <Tag>{item}</Tag>,
    },
    {
      title: "Estimated time",
      dataIndex: "estimated_time",
      key: "estimated_time",
      render: (item) => <Tag>{item} HOURS</Tag>,
    },
    {
      title: "Hourly rate",
      dataIndex: "client_price",
      key: "client_price",
      render: (item) => <Tag>{item} DA</Tag>,
    },
    {
      title: "Estimated time",
      dataIndex: "estimated_time",
      key: "estimated_time",
      render: (item) => <Tag>{item} HOURS</Tag>,
    },
    {
      title: "Actions : ",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <Button
          onClick={() => {
            router.push(`/project/${item}`);
          }}
          type="primary"
        >
          Details
        </Button>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyJobs());
  }, []);

  return (
    <div className={Styles.wrapper}>
      <PageHeader
        className={Styles.pageheader}
        onBack={() => null}
        title="My projects"
        subTitle="projects dashboard"
      />
      <br />
      <Table
        columns={columns}
        dataSource={fetchJobsResult}
        loading={isFetchingJobs}
      />
    </div>
  );
}

export default index;
