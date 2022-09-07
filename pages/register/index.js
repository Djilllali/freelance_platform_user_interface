import React, { useEffect } from "react";
import { Button, Card, Checkbox, Form, Input, Select } from "antd";
import Styles from "./contact.module.css";
import { getDomains } from "../../reducers/domainsReducer";
import { useDispatch, useSelector } from "react-redux";
import { getpacks } from "../../reducers/packsReducer";
import { fetchRegister } from "../../reducers/loginReducer";
function Contact() {
  const domains = useSelector((state) => state.domains.domainsResult?.data);
  const packs = useSelector((state) => state.packs.packsResult?.data);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(fetchRegister(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    dispatch(getDomains());
  }, []);
  useEffect(() => {
    dispatch(getpacks());
  }, []);

  return (
    <div className={Styles.pageWrapper}>
      <Card title="S'inscrire 🙋 " className={Styles.contact_card}>
        <Form
          style={{ margin: "0 auto" }}
          name="basic"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nom de Famille"
            name="last_name"
            rules={[
              {
                required: true,
                message: "svp entrez votre nom de famille !",
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Prénom"
            name="first_name"
            rules={[
              {
                required: true,
                message: "svp entrez votre prénom !",
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>

          <Form.Item
            label="Addresse Email"
            name="email"
            rules={[
              {
                required: true,
                message: "svp entez votre addresse email!",
              },
            ]}
          >
            <Input placeholder="name@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Numéro téléphone"
            name="phone"
            rules={[
              {
                required: true,
                message: "svp entrez votre numéro de téléphone  !",
              },
            ]}
          >
            <Input placeholder="+213" />
          </Form.Item>
          <Form.Item
            label="Wilaya"
            name="wilaya"
            rules={[
              {
                required: true,
                message: "svp entrez la Wilaya  !",
              },
            ]}
          >
            <Input placeholder="wilaya" />
          </Form.Item>
          <Form.Item
            label="Domaine"
            name="domain"
            rules={[
              {
                required: true,
                message: "svp selectionnez le domaine !",
              },
            ]}
          >
            <Select
              options={domains?.map((dom) => ({
                label: dom.name,
                value: dom._id,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Pack"
            name="pack"
            rules={[
              {
                required: true,
                message: "svp selectionnez le pack !",
              },
            ]}
          >
            <Select
              options={packs?.map((pk) => ({ label: pk.name, value: pk._id }))}
            ></Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Contact;
