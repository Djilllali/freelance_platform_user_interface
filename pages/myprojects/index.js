import { PageHeader } from "antd";
import React from "react";
import Styles from "./myprojects.module.css";
function index() {
  return (
    <div className={Styles.wrapper}>
      <PageHeader
        className={Styles.pageheader}
        onBack={() => null}
        title="Title"
        subTitle="This is a subtitle"
      />
    </div>
  );
}

export default index;
