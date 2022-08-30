import { CaretDownOutlined, StopOutlined } from "@ant-design/icons";
import { Button, message, PageHeader, Table, Tag, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelWithdrawalRequest,
  fetchMyWithdrawalRequests,
} from "../../reducers/financialdashboardReducer";
import Styles from "./financialdashboard.module.css";
function index() {
  const dispatch = useDispatch();
  const fetchWithdrawalRequestsResult = useSelector(
    (state) => state.financialdashboard.fetchWithdrawalRequestsResult?.data
  );
  const fetchWithdrawalRequestsError = useSelector(
    (state) => state.financialdashboard.fetchWithdrawalRequestsError?.data
  );
  const isFetchingWithdrawalRequests = useSelector(
    (state) => state.financialdashboard.isFetchingWithdrawalRequests
  );

  const router = useRouter();
  const columns = [
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      render: (item) => (
        <span>{new Date(item).toLocaleDateString("fr-FR")}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => <Tag>{item}</Tag>,
    },
    {
      title: "payment method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (item) => <Tag color="magenta">{item} </Tag>,
    },
    {
      title: "Job",
      dataIndex: "job_id",
      key: "job_id",
      render: (item) => (
        <a href={`project/${item}`}>
          <Tag color="cyan">{item}</Tag>{" "}
        </a>
      ),
    },

    {
      title: "Actions : ",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <Button
          icon={<StopOutlined />}
          danger
          onClick={() => {
            message.warn("wait .....");
            dispatch(cancelWithdrawalRequest(item));
          }}
          type="ghost"
        >
          Cancel
        </Button>
      ),
    },
  ];
  useEffect(() => {
    dispatch(fetchMyWithdrawalRequests());
  }, []);

  return (
    <div className={Styles.wrapper}>
      <PageHeader
        className={Styles.pageheader}
        onBack={() => null}
        title="Financial Dashboard"
        subTitle="withdrawal requests"
      />
      <br />
      <Table
        columns={columns}
        dataSource={fetchWithdrawalRequestsResult}
        loading={isFetchingWithdrawalRequests}
      />
    </div>
  );
}

export default index;
