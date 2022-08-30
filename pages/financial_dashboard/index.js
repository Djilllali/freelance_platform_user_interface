import {
  CaretDownOutlined,
  PlusCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelWithdrawalRequest,
  fetchMyWithdrawalRequests,
} from "../../reducers/financialdashboardReducer";
import Styles from "./financialdashboard.module.css";
function index() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const handleOk = () => {};

  const handleCancel = () => {};
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
        children={[
          <Button
            onClick={() => {
              setisModalVisible(true);
            }}
            icon={<PlusCircleOutlined />}
            type="primary"
          >
            Create withdrawal request
          </Button>,
        ]}
      />
      <br />
      <Table
        columns={columns}
        dataSource={fetchWithdrawalRequestsResult}
        loading={isFetchingWithdrawalRequests}
      />
      <Modal
        title="Create withdrawal request"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Select Project">
            <Select>
              <Select.Option>sdfsdfs</Select.Option>
              <Select.Option>aaaaaa</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Payment type">
            <Select>
              <Select.Option>CCP</Select.Option>
              <Select.Option>VISA</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default index;
