import { Button, Card, Spin, Tag, Typography } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetails } from "../../reducers/jobdetailsReducer";
import Styles from "./projectdetails.module.css";
const { Title, Paragraph } = Typography;
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

  console.log("----------- job details ", jobDetailsResult);
  console.log("----------- router query ", router.query);

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
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
