import React from "react";
import { Button, Typography } from "antd";
import { useRouter } from "next/router";
const { Title } = Typography;

function Error404() {
  const router = useRouter();
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <img style={{ maxWidth: "400px" }} src="/404.png" alt="" />
      <Title level={2}>Page not found 404</Title>
      <Button
        type="primary"
        onClick={() => {
          router.push("/");
        }}
      >
        {" "}
        Go back home{" "}
      </Button>
    </div>
  );
}

export default Error404;
