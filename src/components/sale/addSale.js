import "./sale.css";

import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Products from "./Products";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AddSale = () => {
	const { Option } = Select;
	const [formData, setFormData] = useState({});
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();

	const onClickLoading = () => {
		setLoader(true);
	};

	const [date, setDate] = useState(moment());
	const [afterDiscount, setAfterDiscount] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllCustomer({ page: 1, limit: 1000 }));
	}, []);

	useEffect(() => {
		dispatch(loadProduct({ page: 1, limit: 1000 }));
	}, []);

	const allCustomer = useSelector(state => state.customers.list);
	const allProducts = useSelector(state => state.products.list);
	const allStaff = useSelector(state => state.users.list);

	useEffect(() => {
		dispatch(loadAllStaff({ status: "true" }));
	}, []);

	const [customer, setCustomer] = useState(null);
	const [salesPerson, setSalesPerson] = useState(null);
	const [documentation, setDocumentation] = useState(0);

	// Form Function
	const [form] = Form.useForm();
	
	const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
		total: 0,
		discount: 0,
		afterDiscount: 0,
		paid: 0,
		due: 0,
	});

	const onFormSubmit = async () => {
		const saleInvoiceProduct = selectedProds.map(prod => {
			return {
				product_id: prod.id,
				product_quantity: prod.selectedQty * prod.boxes,
				boxes: prod.boxes,
				pack_rate: prod.selectedQty,
				measure: prod.unit_measurement,
				product_sale_price: prod.sale_price,
			};
		});

		try {
			const valueData = {
				paid_amount: totalDiscountPaidDue.paid.toFixed(2),
				discount: totalDiscountPaidDue.discount.toFixed(2),
				customer_id: customer,
				user_id: salesPerson,
				saleInvoiceProduct,
				documentation: formData.documentation,
				freight: formData.freight,
				handling: formData.handling,
				hsCode: formData.hsCode,
				date
			};
			
			const resp = await dispatch(addSale(valueData));

			if (resp.message === "success") {
				form.resetFields();
				setFormData({});
				setAfterDiscount(0);
				setLoader(false);
				dispatch(
					loadAllSale({
						page: 1,
						limit: "",
						startdate: moment().format("YYYY-MM-DD"),
						enddate: moment().format("YYYY-MM-DD"),
						user: "",
					})
				);
				navigate(`/sale/${resp.createdInvoiceId}`);
			} else {
				setLoader(false);
			}
		} catch (error) {
			console.log(error.message);
			setLoader(false);
			toast.error("Error while sales");
		}
	};

	const updateFormData = () => {
		const data = form.getFieldsValue();

		const total = data.saleInvoiceProduct?.reduce((acc, p) => {
			if (p) {
				const { product_quantity = 0, product_sale_price = 0 } = p;
				acc += product_quantity * product_sale_price;
			}

			return acc;
		}, 0);

		data.total = total;
		data.due = total - (data.paid_amount ?? 0) - (data.discount ?? 0);

		setFormData(data);
		if (data.discount) {
			setAfterDiscount(total - (data.discount ?? 0));
		}
		if (data.discount === 0) {
			setAfterDiscount(0);
		}
	};

	// Select Supplier Funciton
	const onChange = async values => {
		updateFormData();
	};

	const onSearch = value => {};

	// Products Handlers

	const [selectedProds, setSelectedProds] = useState([]);

	const handleSelectedProds = (prodId, key) => {
		const foundProd = allProducts.find(item => item.id === prodId);
		// if (foundProd === undefined) {
		let updatedSelectedProds = [...selectedProds];

		if (selectedProds[key]) {
			updatedSelectedProds[key] = {
				...foundProd,
				selectedQty: foundProd.selectedQty,
				boxes: 1,
			};
			setSelectedProds(updatedSelectedProds);
		} else {
			setSelectedProds(prev => [
				...prev,
				{ ...foundProd, selectedQty: foundProd.pack_rate, boxes: 1 },
			]);
		}

		// }
	};

	const handleSelectedProdsQty = (
		key,
		selectedQty,
		unit_measurement,
		boxes = 1
	) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, selectedQty, unit_measurement, boxes };
			} else prodCopy = { ...prod };

			return prodCopy;
		});

		setSelectedProds(updatedSelectedProds);
	};

	const handleSelectedProdsSalePrice = (key, salePrice) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, sale_price: salePrice };
			} else prodCopy = { ...prod };

			return prodCopy;
		});
		setSelectedProds(updatedSelectedProds);
	};

	const handleDeleteProd = key => {
		if (selectedProds[key]) {
			const updatedProds = selectedProds.filter(
				(prod, index) => key !== index
			);
			setSelectedProds(updatedProds);
		}
	};

	const handleDiscount = discountAmount => {
		const afterDiscount = totalDiscountPaidDue.total - discountAmount;
		let dueAmount = totalDiscountPaidDue.total - discountAmount;
		if (totalDiscountPaidDue.paid > 0) {
			dueAmount = dueAmount - totalDiscountPaidDue.paid;
		}
		setTotalDiscountPaidDue(prev => ({
			...prev,
			discount: discountAmount,
			due: dueAmount,
			afterDiscount,
		}));
	};

	const handlePaid = paidAmount => {
		const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
		setTotalDiscountPaidDue(prev => ({
			...prev,
			paid: paidAmount,
			due: dueAmount,
		}));
	};

	useEffect(() => {
		if (selectedProds.length > 0) {
			let total = 0;
			let afterDiscount = 0;
			let due = 0;

			selectedProds.forEach(prod => {
				total += prod.sale_price * prod.selectedQty * prod.boxes;
			});

			if (totalDiscountPaidDue.discount > 0) {
				afterDiscount = total - totalDiscountPaidDue.discount;
			} else afterDiscount = total;

			if (totalDiscountPaidDue.paid > 0) {
				due = afterDiscount - totalDiscountPaidDue.paid;
			} else due = afterDiscount;

			setTotalDiscountPaidDue(prev => ({
				...prev,
				total,
				afterDiscount,
				due,
			}));
		}
	}, [
		selectedProds,
		totalDiscountPaidDue.paid,
		totalDiscountPaidDue.discount,
	]);

	return (
		<Card className="mt-3">
			<Form
				form={form}
				className="m-lg-4"
				name="dynamic_form_nest_item"
				// onFinish={onFinish}
				onChange={onChange}
				onFinishFailed={() => {
					setLoader(false);
				}}
				layout="vertical"
				size="large"
				autoComplete="off"
			>
				<Row className="mr-top" gutter={[24, 24]}>
					<Col span={24} className="border rounded column-design">
						<Title level={4} className="m-2 text-center">
							Sale New Products
						</Title>
					</Col>

					<Col span={24} lg={24}>
						<div className="d-flex justify-content-between mb-1">
							<Form.Item
								label="Customer "
								name="customer_id"
								style={{ maxWidth: "250px" }}
								rules={[
									{
										required: true,
										message: "Please Select a Customer!",
									},
								]}
							>
								<Select
									loading={!allCustomer}
									showSearch
									placeholder="Select a customer "
									optionFilterProp="children"
									onChange={id => setCustomer(id)}
									onSearch={onSearch}
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.includes(input.toLowerCase())
									}
								>
									{allCustomer &&
										allCustomer.map(sup => (
											<Option key={sup.id} value={sup.id}>
												{sup.name}
											</Option>
										))}
								</Select>
							</Form.Item>

							<Form.Item name="hsCode" label="HS Code">
								<Input
									placeholder="HS Code"
								/>
							</Form.Item>

							<Form.Item label="Date" required>
								<DatePicker
									onChange={value => setDate(value._d)}
									defaultValue={date}
									style={{ marginBottom: "10px" }}
									label="date"
									name="date"
									rules={[
										{
											required: true,
											message: "Please input Date!",
										},
									]}
								/>
							</Form.Item>

							{/* Sales Person Input Field */}
							<Form.Item
								label="Sales Person "
								name="sales_person_id"
								style={{ maxWidth: "250px" }}
								rules={[
									{
										required: true,
										message:
											"Please Select a sales person!",
									},
								]}
							>
								<Select
									loading={!allStaff}
									showSearch
									placeholder="Select sales person "
									optionFilterProp="children"
									onChange={id => setSalesPerson(id)}
									onSearch={onSearch}
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.includes(input.toLowerCase())
									}
								>
									{allStaff &&
										allStaff?.map(info => (
											<Option
												key={info.id}
												value={info.id}
											>
												{info.username}
											</Option>
										))}
								</Select>
							</Form.Item>
						</div>

						<Products
							formData={formData}
							setData={setFormData}
							allProducts={allProducts}
							// updateFormData={updateFormData}
							selectedProds={selectedProds}
							handleSelectedProds={handleSelectedProds}
							handleSelectedProdsQty={handleSelectedProdsQty}
							handleSelectedProdsSalePrice={
								handleSelectedProdsSalePrice
							}
							handleDeleteProd={handleDeleteProd}
						/>
					</Col>

					<Col span={24} lg={24}>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}
						>
							<strong>Flower Total: </strong>
							<strong>
								{totalDiscountPaidDue.total.toFixed(2)} USD
							</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<strong>Box number: </strong>
							<strong>
								{selectedProds &&
									selectedProds.reduce(
										(p, c) => p + c.boxes,
										0
									)}
							</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<strong>Stem count: </strong>
							<strong>
								{selectedProds &&
									selectedProds.reduce(
										(p, c) => p + c.selectedQty,
										0
									)}
							</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<strong>Documentation: </strong>

							<Form.Item name="documentation">
								<InputNumber
									placeholder="Documentation"
								/>
							</Form.Item>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<strong>Freight: </strong>

							<Form.Item name="freight">
								<InputNumber
									placeholder="Freight"
								/>
							</Form.Item>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<strong>Handling: </strong>

							<Form.Item name="handling">
								<InputNumber
									placeholder="Handling"
								/>
							</Form.Item>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<strong>Discount: </strong>
							<Form.Item name="discount">
								<InputNumber
									type="number"
									onChange={handleDiscount}
									placeholder="Discount"
								/>
							</Form.Item>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<strong>After Discount: </strong>
							<strong>
								{totalDiscountPaidDue.afterDiscount.toFixed(2)}{" "}
								USD
							</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<strong>Paid Amount: </strong>
							<Form.Item name="paid_amount">
								<InputNumber
									type="number"
									onChange={handlePaid}
									placeholder="Paid"
								/>
							</Form.Item>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}
						>
							<strong>Due Amount: </strong>
							<strong>
								{totalDiscountPaidDue.due.toFixed(2)} USD
							</strong>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}
						>
							<strong>Grand Total: </strong>
							<strong>
								{(totalDiscountPaidDue.due + form.getFieldsValue().documentation + form.getFieldsValue().freight  + form.getFieldsValue().handling ).toFixed(2)} USD
							</strong>
						</div>

						<Form.Item style={{ marginTop: "15px" }}>
							<Button
								block
								type="primary"
								htmlType="submit"
								loading={loader}
								onClick={() => {
									onClickLoading();
									onFormSubmit();
								}}
							>
								Sell Product
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default AddSale;
