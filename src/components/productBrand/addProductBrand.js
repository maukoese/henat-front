import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import styles from "./AddProdBrand.module.css";

import { Fragment } from "react";

import { useDispatch } from "react-redux";
import { addProductBrand } from "../../redux/actions/productBrand/addProductBrandAciton";
import UploadMany from "../Card/UploadMany";

const AddProductBrand = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      dispatch(addProductBrand(values));

      form.resetFields();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Row className="mr-top" justify="space-between" gutter={[0, 30]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          className="rounded column-design"
        >
          <Card bordered={false} className="criclebox h-full">
            <Title level={4} className="m-2 text-center">
              Add Product Brand
            </Title>
            <Form
              form={form}
              className=""
              name="basic"
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input category Dname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addProdBrandBtnContainer}
              >
                <Button type="primary" htmlType="submit" shape="round">
                  Add Brand
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className="rounded column-design">
          <Card bordered={false} className={styles.importCsvCard}>
            <Title level={4} className="m-2 text-center">
              Import From CSV
            </Title>
            <UploadMany urlPath={"brand"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddProductBrand;
