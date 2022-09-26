import {
  CalendarOutlined,
  FileZipOutlined,
  InboxOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  message,
  PageHeader,
  Spin,
  Tag,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants";
import {
  getJobDetails,
  submitJob,
  takeJob,
} from "../../reducers/jobdetailsReducer";
import Styles from "./projectdetails.module.css";
const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

function ProjectDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const jobDetailsResult = useSelector(
    (state) => state.jobdetails.jobDetailsResult?.job
  );
  const jobDetailsError = useSelector(
    (state) => state.jobdetails.jobDetailsError?.data
  );
  const isFetchingJob = useSelector((state) => state.jobdetails.isFetchingJob);

  useEffect(() => {
    if (router?.query?.id) dispatch(getJobDetails(router.query.id));
  }, [router.query]);
  const [Submission, setSubmission] = useState({
    message: "",
    file: null,
  });
  console.log("----------- job details ", jobDetailsResult);
  console.log("----------- router query ", router.query);

  const props = {
    name: "file",
    multiple: false,
    action: "",
  };
  return (
    <div className={Styles.wrapper}>
      {isFetchingJob ? (
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
          {jobDetailsResult && (
            <>
              <Head>
                <title>{jobDetailsResult?.title}</title>
              </Head>
              <PageHeader
                className={Styles.pageheader}
                onBack={() => null}
                title="Project details"
              />

              <Card
                className={Styles.project_card}
                title={jobDetailsResult?.title}
                bodyStyle={{
                  padding: "2rem",
                  minHeight: "200px",
                  overflowY: "scroll",
                }}
                headStyle={{
                  fontSize: "1.3rem",
                  padding: "1rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
                extra={
                  <>
                    <Typography>
                      Status :{" "}
                      <Tag color="cyan"> {jobDetailsResult?.status}</Tag>
                    </Typography>
                  </>
                }
                actions={[
                  <Typography key={`actionestimatedtime`}>
                    {" "}
                    Estimated time :{jobDetailsResult?.estimated_time} hours
                  </Typography>,
                  <Typography key={`actionhourlyrate`}>
                    {" "}
                    Hourly rate: {jobDetailsResult?.client_price} DA
                  </Typography>,
                  <>
                    {jobDetailsResult?.status === "virgin" && (
                      <Button
                        onClick={() => {
                          dispatch(takeJob(router.query.id));
                        }}
                        key={`actionestitakejob`}
                        type="primary"
                      >
                        {" "}
                        Take Job
                      </Button>
                    )}
                  </>,
                ]}
              >
                <div>
                  <Title level={5}> Description : </Title>
                  <Paragraph
                    ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                  >
                    {jobDetailsResult?.description}
                  </Paragraph>
                  <br />
                  {jobDetailsResult?.file && (
                    <>
                      <Title level={5}> Attachments : </Title>
                      <a
                        onClick={() => {
                          window.open(
                            baseUrl + `/files/${jobDetailsResult?.file}`
                          );
                        }}
                      >
                        {" "}
                        <PaperClipOutlined /> {jobDetailsResult?.file}
                      </a>
                      <br />
                    </>
                  )}
                  <Title level={5}> Required Skills : </Title>
                  {jobDetailsResult?.skills?.map((sk) => (
                    <Tag key={`sk${sk}}`} color="magenta">
                      {sk}
                    </Tag>
                  ))}

                  <br />
                </div>
              </Card>

              {jobDetailsResult?.status === "inprogress" && (
                <Card
                  style={{ margin: "2rem auto ", maxWidth: "900px" }}
                  title="Submit project"
                  actions={[
                    <Button
                      onClick={() => {
                        let form_data = new FormData();
                        form_data.append(
                          "upload",
                          Submission.file?.originFileObj
                        );
                        form_data.append("message", Submission.message);
                        form_data.append("project_id", router.query.id);
                        dispatch(submitJob(form_data, router.query.id));
                      }}
                      style={{ width: "90%" }}
                      type="primary"
                    >
                      {" "}
                      Submit
                    </Button>,
                  ]}
                >
                  <Form
                    layout="vertical"
                    style={{ margin: "1rem auto" }}
                    onValuesChange={(values, value) => {
                      console.log("----------- submission ", value);

                      setSubmission({
                        message: value.comment,
                        file: value.file?.fileList[0],
                      });
                    }}
                  >
                    <Form.Item name="comment" label="Comment :">
                      <TextArea
                        placeholder="comment ..."
                        style={{ margin: "1rem auto", padding: "1rem" }}
                      ></TextArea>
                    </Form.Item>
                    <Form.Item name="file" label="Upload files :">
                      <Dragger style={{}} {...props}>
                        <p className="ant-upload-drag-icon">
                          <FileZipOutlined />
                        </p>
                        <p
                          className="ant-upload-text"
                          style={{ padding: "2rem" }}
                        >
                          Click or drag file to this area to upload
                        </p>
                      </Dragger>
                    </Form.Item>
                  </Form>
                </Card>
              )}

              {jobDetailsResult?.status === "finished" && (
                <Card
                  title="Submission details"
                  style={{ margin: "2rem auto ", maxWidth: "900px" }}
                >
                  <div>
                    <Typography.Title level={5}>Message :</Typography.Title>

                    <Typography.Paragraph>
                      {jobDetailsResult?.submission?.message}
                    </Typography.Paragraph>
                  </div>
                  <div>
                    <Typography.Title level={5}>
                      Attached file :
                    </Typography.Title>

                    <Typography.Paragraph>
                      <FileZipOutlined />
                      {"      "} {jobDetailsResult?.submission?.file}
                    </Typography.Paragraph>
                  </div>
                  <div>
                    <Typography.Title level={5}>Date :</Typography.Title>
                    <Typography.Paragraph>
                      <CalendarOutlined />
                      {"      "}
                      {new Date(
                        jobDetailsResult?.submission?.time
                      ).toLocaleDateString()}
                    </Typography.Paragraph>
                  </div>
                </Card>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
