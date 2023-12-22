import { Col, InputNumber, Row, Table, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

const SaleProductListCard = ({
	invoiceId,
	list,
	totals,
	paid,
	updateReturn,
	returnOnChange,
	updateInvoice,
	setAmount,
	setDue,
	setStems,
	products,
}) => {
	const [fields, setFields] = useState({});

	const updateField = (product_id, field, value) => {
		let newFields = fields;
		newFields[product_id][field] = value;
		newFields[product_id]["product_quantity"] =
			newFields[product_id]["pack_rate"] * newFields[product_id]["boxes"];

		setFields(newFields);

		setStems(
			Object.values(newFields).reduce(
				(p, item) => p + parseFloat(item.product_quantity),
				0
			)
		);

		const totalAmount = Object.values(newFields).reduce(
			(p, item) =>
				p +
				parseFloat(item.product_sale_price) *
					parseFloat(item.product_quantity),
			0
		);

		setDue(totalAmount - paid);
		setAmount(totalAmount);
	};

	const removeItem = (item) => {
		list.splice(list.indexOf(item), 1);
	};

	const addItem = (newProd) => {
		const product = products.find((p) => p.id === newProd);

		list.push({
			id: newProd,
			product_id: product.id,
			invoice_id: product.invoice_id,
			product_quantity: 1,
			product_sale_price: product.sale_price,
			boxes: 0,
			pack_rate: product.pack_rate,
			product,
			length: product.unit_measurement,
		});
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	const columns = [
		{
			title: "Variety",
			dataIndex: "product",
			key: "product.name",
			render: (product) => (
				<Link to={`/product/${product.id}`}>{product.name}</Link>
			),
		},
		{
			title: "Pack Rate",
			dataIndex: "pack_rate",
			key: "pack_rate",
			render: (pack_rate, { id }) => (
				<InputNumber
					name="pack_rate"
					defaultValue={pack_rate}
					onChange={(newP) => updateField(id, "pack_rate", newP)}
				/>
			),
		},
		{
			title: "Length",
			dataIndex: "length",
			key: "length",
			render: (l, { id }) => (
				<InputNumber
					name="length"
					defaultValue={l}
					onChange={(newP) =>
						updateField(id, "unit_measurement", newP)
					}
				/>
			),
		},
		{
			title: "Box No",
			dataIndex: "boxes",
			key: "boxes",
			render: (boxes, { id }) => (
				<InputNumber
					name="boxes"
					defaultValue={boxes}
					onChange={(newP) => updateField(id, "boxes", newP)}
				/>
			),
		},
		{
			title: "Unit Price",
			dataIndex: "product_sale_price",
			key: "product_sale_price",
			render: (v, { id }) => (
				<InputNumber
					name="product_sale_price"
					defaultValue={v}
					onChange={(newP) =>
						updateField(id, "product_sale_price", newP)
					}
				/>
			),
		},
		{
			title: " ",
			key: "Total Price ",
			dataIndex: "",
			render: (x, item) => (
				<>
					<Button
						type="danger"
						shape="round"
						onClick={(e) => removeItem(item)}
						icon={<DeleteOutlined />}
					></Button>
				</>
			),
		},
	];

	if (updateReturn) {
		// columns.splice(3, 0, {
		//   title: "Remain Quantity",
		//   dataIndex: "remain_quantity",
		//   key: "remain_quantity",
		//   width: "120px",
		// });
		columns.splice(4, 0, {
			title: "Return Quantity",
			dataIndex: "return_quantity",
			key: "return_quantity",
			width: "150px",
			render: (
				value,
				{ product_id, product_quantity, product_sale_price: price }
			) => {
				return (
					<div>
						<InputNumber
							onChange={(value) =>
								returnOnChange({ id: product_id, value, price })
							}
							style={{ width: "120px" }}
							placeholder="Return Qty"
							max={product_quantity}
							min={0}
							value={value}
						/>
					</div>
				);
			},
		});
	}

	useEffect(() => {
		setFields(
			list.reduce(
				(
					p,
					{
						id,
						product_id,
						invoice_id,
						product_quantity,
						product_sale_price,
						boxes,
						pack_rate,
						product,
						length,
					}
				) => ({
					...p,
					...{
						[id]: {
							id,
							product_id,
							invoice_id,
							product_quantity,
							product_sale_price,
							boxes,
							pack_rate,
							product,
							measure: length,
						},
					},
				}),
				{}
			)
		);
	}, [fields]);

	return (
		<Row>
			<Col span={24} className="mt-2">
				<div
					className="header-solid h-full m-2"
					bordered={false}
					title={[
						<h6 className="font-semibold m-0 text-center">
							sale Product Information
						</h6>,
					]}
					style={{ paddingTop: "0" }}
				>
					<form
						className="col-info"
						method="POST"
						onSubmit={updateInvoice}
					>
						<div className="row">
							<div className="col-md-3">
								<Button
									type="primary"
									htmlType="submit"
									icon={<SaveOutlined />}
									onClick={(e) => {
										e.preventDefault();
										updateInvoice(invoiceId, fields);
									}}
									className="mb-2"
								>
									Update Invoice
								</Button>
							</div>

							<div className="col-md-4 offset-md-5">
								<div
									className="input-group"
									style={{ width: "100px;" }}
								>
									<Select
										placeholder="Add Product"
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										onChange={addItem}
									>
										{Array.isArray(products) &&
											products.map((p) => (
												<Select.Option
													key={p.id}
													value={p.id}
												>
													{p.name}
												</Select.Option>
											))}
									</Select>
								</div>
							</div>
						</div>
						
						<Table
							scroll={{ x: true }}
							loading={!list}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>

						{totals && totals}

						<Button
							type="primary"
							htmlType="submit"
							icon={<SaveOutlined />}
							onClick={(e) => {
								e.preventDefault();
								updateInvoice(invoiceId, fields);
							}}
							className="mt-4"
						>
							Update Invoice
						</Button>
					</form>
				</div>
			</Col>
		</Row>
	);
};

export default SaleProductListCard;
