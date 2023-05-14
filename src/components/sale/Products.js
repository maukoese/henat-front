import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { loadSingleProduct } from "../../redux/actions/product/detailProductAction";

const getItemTotal = (item) => {
	if (!item || typeof item !== "object") return 0;
	var totalPrice = item.product_quantity * item.product_sale_price;
	if (isNaN(totalPrice)) totalPrice = 0;
	return totalPrice;
};

export default function Products({
	allProducts,
	formData,
	setData,
	updateFormData,
	selectedProds,
	handleSelectedProdsQty,
	handleDeleteProd,
	handleSelectedProds,
	handleSelectedProdsSalePrice,
}) {
	return (
		<>
			<Row gutter={[16]}>
				<Col span={2}>
					<div className='font-weight-bold border-b'>S.No</div>
				</Col>
				<Col span={5}>
					<div className='font-weight-bold border-b'>Variety</div>
				</Col>
				<Col span={2}>
					<div className='font-weight-bold'>Length</div>
				</Col>
				<Col span={3}>
					<div className='font-weight-bold'>Pack Rate</div>
				</Col>
				<Col span={3}>
					<div className='font-weight-bold'>Box No</div>
				</Col>
				<Col span={4}>
					<div className='font-weight-bold'>Unit Price</div>
				</Col>
				<Col span={4}>
					<div className='font-weight-bold'>Stem Count</div>
				</Col>
				<Col span={2}>
					<div></div>
				</Col>
			</Row>

			<hr style={{ backgroundColor: "black" }} />

			<Form.List name='saleInvoiceProduct'>
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }, index) => (
							<Row className='mt-2' gutter={[16]} key={key}>
								<Col span={2}>{index + 1}</Col>
								<Col span={5}>
									<Form.Item {...restField} name={[name, "product_id"]}>
										<Select
											placeholder='Select Product'
											showSearch
											optionFilterProp='children'
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.includes(input.toLowerCase())
											}
											onChange={(prodId) => handleSelectedProds(prodId, key)}>
											{Array.isArray(allProducts) &&
												allProducts.map((p) => (
													<Select.Option key={p.id} value={p.id}>
														{p.name}
													</Select.Option>
												))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={2}>
									<div className='font-weight-bold'>
										{selectedProds[key] && selectedProds[key].unit_measurement
											? selectedProds[key].unit_measurement
											: 0}
										{selectedProds[key] && selectedProds[key].unit_type
											? selectedProds[key].unit_type
											: 'cm'}
									</div>
								</Col>
								<Col span={3}>
									<Form.Item {...restField} name={[name, "product_quantity"]}>
										<InputNumber
											style={{ width: "100%" }}
											placeholder='Pack Rate'
											onChange={(qty) => handleSelectedProdsQty(key, qty, selectedProds[key] ? selectedProds[key].boxes : 1)}
											value={
												selectedProds[key] ? selectedProds[key].pack_rate : 1
											}
										/>
										<p style={{ display: "none" }}>
											{selectedProds[key] ? selectedProds[key].selectedQty : 1}
										</p>
									</Form.Item>
								</Col>
								<Col span={3}>
									<Form.Item {...restField} name={[name, "box_no"]}>
										<InputNumber
											style={{ width: "100%" }}
											placeholder='Boxes'
											onChange={(boxNo) => handleSelectedProdsQty(key, selectedProds[key] ? selectedProds[key].selectedQty : 1, boxNo)}
											value={
												selectedProds[key] ? (selectedProds[key].boxes ?? 1) : 1
											}
										/>
										<p style={{ display: "none" }}>
											{selectedProds[key] ? selectedProds[key].boxes : 1}
										</p>
									</Form.Item>
								</Col>
								<Col span={3}>
									<Form.Item {...restField} name={[name, "product_sale_price"]}>
										<InputNumber
											placeholder='Sale price'
											onChange={(salePrice) =>
												handleSelectedProdsSalePrice(key, salePrice)
											}
											value={
												selectedProds[key] ? selectedProds[key].sale_price : ""
											}
										/>
										<p style={{ display: "none" }}>
											{selectedProds[key] ? selectedProds[key].sale_price : ""}
										</p>
									</Form.Item>
								</Col>
								<Col span={4}>
									<div className='font-weight-bold text-center'>
										{selectedProds[key] &&
											selectedProds[key].selectedQty *
												selectedProds[key].boxes}
									</div>
								</Col>
								<Col span={2}>
									<Form.Item>
										<Button
											shape='circle'
											icon={<DeleteOutlined />}
											onClick={() => {
												remove(name);
												handleDeleteProd(key);
											}}></Button>
									</Form.Item>
								</Col>
							</Row>
						))}
						<Form.Item style={{ marginTop: "20px" }}>
							<Button
								type='dashed'
								onClick={() => add()}
								block
								icon={<PlusOutlined />}>
								Add Product
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</>
	);
}
