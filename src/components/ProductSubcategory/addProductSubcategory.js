import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import styles from "./AddProdSubcat.module.css";

import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProductSubCategory } from "../../redux/actions/productSubCategory/addProductSubCategoryAciton";
import UploadMany from "../Card/UploadMany";
import { toast } from "react-toastify";
import { loadAllProductCategory } from "../../redux/actions/productCategory/getProductCategoryAction";

const AddProductCategory = () => {
	const category = useSelector((state) => state.productCategories?.list);
	const dispatch = useDispatch();
	const { Title } = Typography;
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const onClick = () => {
		setLoading(true);
	};
	const onFinish = async (values) => {
		try {
			const resp = await dispatch(addProductSubCategory(values));
			if (resp.message === "success") {
				setLoading(false);
				form.resetFields();
			} else {
				setLoading(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	//dispatch category in a useEffect
	useEffect(() => {
		dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
	}, []);

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoading(false);
	};

	return (
		<Fragment>
			<Row className='mr-top' justify='space-between' gutter={[0, 30]}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='rounded column-design'>
					<Card bordered={false} className='criclebox h-full'>
						<Title level={4} className='m-2 text-center'>
							Add Product Subcategory
						</Title>
						<Form
							form={form}
							className=''
							name='basic'
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
							autoComplete='off'>
							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Name'
								name='name'
								rules={[
									{
										required: true,
										message: "Please input category Dname!",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "15px" }}
								name='product_category_id'
								label='Select Category '
								rules={[
									{
										required: true,
										message: "Please select category!",
									},
								]}>
								<Select
									name='product_category_id'
									loading={!category}
									showSearch
									placeholder='Select Category'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children.includes(input)
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(optionB.children.toLowerCase())
									}>
									{category &&
										category.map((cate) => (
											<Select.Option key={cate.id} value={cate.id}>
												{cate.name}
											</Select.Option>
										))}
								</Select>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								className={styles.addProdSubCatBtnContainer}>
								<Button
									onClick={onClick}
									loading={loading}
									type='primary'
									htmlType='submit'
									shape='round'>
									Add Subcategory
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='rounded column-design'>
					<Card bordered={false} className={styles.importCsvCard}>
						<Title level={4} className='m-2 text-center'>
							Import From CSV
						</Title>
						<UploadMany urlPath={"subcategory"} />
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddProductCategory;
