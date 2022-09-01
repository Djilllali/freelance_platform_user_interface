import { FileZipOutlined, InboxOutlined } from "@ant-design/icons";
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
import { getJobDetails } from "../../reducers/jobdetailsReducer";
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
    file: "",
  });
  console.log("----------- job details ", jobDetailsResult);
  console.log("----------- router query ", router.query);

  const props = {
    name: "file",
    multiple: false,
    action: "",
    accept: "application/zip",
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
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
                  <Typography>
                    {" "}
                    Estimated time :{jobDetailsResult?.estimated_time} hours
                  </Typography>,
                  <Typography>
                    {" "}
                    Hourly rate: {jobDetailsResult?.client_price} DA
                  </Typography>,
                  <Button type="primary"> Take Job</Button>,
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

                  <Title level={5}> Required Skills : </Title>
                  {jobDetailsResult?.skills?.map((sk) => (
                    <Tag color="magenta">{sk}</Tag>
                  ))}

                  <br />
                </div>
              </Card>

              <Card
                style={{ margin: "2rem auto ", maxWidth: "900px" }}
                title="Submit project"
                actions={[
                  <Button style={{ width: "90%" }} type="primary">
                    {" "}
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  layout="vertical"
                  style={{ margin: "1rem auto" }}
                  onValuesChange={(values, value) => {
                    console.log("----------- submission ", values, value);
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
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
