import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import styles from "./AddProdCat.module.css";

import { Fragment } from "react";

import { useDispatch } from "react-redux";
import { addProductCategory } from "../../redux/actions/productCategory/addProductCategoryAciton";
import UploadMany from "../Card/UploadMany";

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      dispatch(addProductCategory(values));

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
              Add Product Category
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
                className={styles.addProdCatBtnContainer}
              >
                <Button type="primary" htmlType="submit" shape="round">
                  Add Category
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
            <UploadMany urlPath={"category"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddProductCategory;
