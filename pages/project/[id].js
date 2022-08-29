import { Button, Card, Tag, Typography } from "antd";
import React from "react";
import Styles from "./projectdetails.module.css";
const { Title, Paragraph } = Typography;
function ProjectDetails() {
  return (
    <div className={Styles.wrapper}>
      <Card
        className={Styles.project_card}
        title="Web App -- Financial dashboard and other functions for 2 marketplaces"
        bodyStyle={{ padding: "2rem", minHeight: "200px", overflowY: "scroll" }}
        headStyle={{
          fontSize: "1.3rem",
          padding: "1rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
        extra={
          <>
            <Typography>
              Status : <Tag color="cyan"> Open</Tag>
            </Typography>
          </>
        }
        actions={[
          <Typography> Project ID : 62fb7bd4755cb4ca88b60ae3</Typography>,
          <Typography> Hourly rate: 400DA</Typography>,
          <Button type="primary"> Take Job</Button>,
        ]}
      >
        <div>
          <Title level={5}> Description : </Title>
          <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam qui
            eligendi ducimus enim sapiente iste, sequi facilis, nostrum quidem,
            aliquid deserunt! Aperiam dolore reprehenderit autem excepturi enim
            alias dolorem molestias. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Vitae, ut accusantium modi veniam tempore aperiam
            quod consequatur unde nulla voluptates velit esse ducimus porro odit
            laborum molestiae numquam impedit explicabo. Molestiae, adipisci
            sed. Obcaecati, facere excepturi pariatur, sit nihil officia
            accusantium molestias eos at quam dolore, quia quidem voluptatem nam
            deleniti deserunt voluptate id aliquam doloribus culpa similique
            commodi iure. Eveniet pariatur natus officia numquam cumque. Ipsa,
            quaerat voluptate reprehenderit, illum, quibusdam repellat totam
            cupiditate ab enim rem ea officiis veritatis doloremque dicta animi
            ex in deleniti maiores aspernatur maxime.
          </Paragraph>
          <br />

          <Title level={5}> Required Skills : </Title>
          <Tag color="magenta">Skill1</Tag>
          <Tag color="magenta">Skill1</Tag>
          <Tag color="magenta">Skill1</Tag>
          <Tag color="magenta">Skill1</Tag>
          <br />
        </div>
      </Card>
    </div>
  );
}

export default ProjectDetails;
