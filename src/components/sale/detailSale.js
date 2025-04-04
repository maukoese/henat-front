import { Badge, Button, Card, Col, Popover, Row, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CardComponent from "../Card/card.components";
import Loader from "../loader/loader";
import PackingSlip from "../Invoice/PackingSlip";
import PageTitle from "../page-header/PageHeader";
import ReturnSaleInvoiceList from "../Card/saleInvoice/ReturnSaleInvoiceList";
import SaleInvoice from "../Invoice/SaleInvoice";
import SaleProductListCard from "../Card/saleInvoice/SaleProductListCard";
import TransactionSaleList from "../Card/saleInvoice/TransactionSaleList";
import { deleteSale } from "../../redux/actions/sale/deleteSaleAction";
import { loadSingleSale } from "../../redux/actions/sale/detailSaleAction";
import { toast } from "react-toastify";

//PopUp

const DetailSale = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const sale = useSelector(state => state.sales.sale);
	const {
		status,
		totalPaidAmount,
		totalReturnAmount,
		dueAmount,
		singleSaleInvoice,
		returnSaleInvoice,
		transactions,
	} = sale ? sale : {};

	//Delete Customer
	const onDelete = () => {
		try {
			dispatch(deleteSale(id));

			setVisible(false);
			toast.warning(`Sale : ${sale.id} is removed `);
			return navigate("/salelist");
		} catch (error) {
			console.log(error.message);
		}
	};
	// Delete Customer PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = newVisible => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleSale(id));
	}, [id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title="Back" />

			<div className="mr-top">
				{singleSaleInvoice ? (
					<Fragment key={singleSaleInvoice.id}>
						<Card bordered={false} className="card-custom">
							<h5 className="m-2">
								<i className="bi bi-person-lines-fill"></i>
								<span className="mr-left">
									ID : {singleSaleInvoice.id} |
								</span>
							</h5>
							<div className="card-header d-flex justify-content-center">
								<div className="me-2 mb-2">
									<Link to={`/sale/return/${id}`}>
										<Button type="primary" shape="round">
											{" "}
											Return Product{" "}
										</Button>
									</Link>
								</div>
								<div className="me-2">
									<Link to={`/sale/${id}/edit`}>
										<Button
											type="primary"
											shape="round"
											icon={<EditOutlined />}
										></Button>
									</Link>
								</div>
								<div className="me-2">
									<Popover
										content={
											<a onClick={onDelete}>
												<Button type="primary" danger>
													Yes Please !
												</Button>
											</a>
										}
										title="Are you sure you want to delete ?"
										trigger="click"
										open={visible}
										onOpenChange={handleVisibleChange}
									>
										<Button
											type="danger"
											shape="round"
											icon={<DeleteOutlined />}
										></Button>
									</Popover>
								</div>
								<div className={"text-end me-2"}>
									<SaleInvoice data={singleSaleInvoice} />
								</div>
								<div className={"text-end me-2"}>
									<PackingSlip data={singleSaleInvoice} />
								</div>
							</div>
							<div className="card-body">
								<Row justify="space-around">
									<Col span={11}>
										<Badge.Ribbon
											text={status}
											color={
												status === "PAID"
													? "green"
													: "red"
											}
										>
											<CardComponent title="Sale Invoice Information ">
												<h5 className="text-center mt-2 mb-2">
													Initital Invoice Info
												</h5>

												<Row justify="space-between">
													<Col span={6}>
														<p>
															<Typography.Text
																strong
															>
																Flower Amount :
															</Typography.Text>{" "}
															<strong>
																{singleSaleInvoice.total_amount.toFixed(
																	2
																)}
															</strong>
														</p>

														<p>
															<Typography.Text
																strong
															>
																Total Amount :
															</Typography.Text>{" "}
															<strong>
																{(
																	singleSaleInvoice.total_amount +
																	parseFloat(
																		singleSaleInvoice.documentation ??
																			0
																	) +
																	parseFloat(
																		singleSaleInvoice.freight ??
																			0
																	) +
																	parseFloat(
																		singleSaleInvoice.handling ??
																			0
																	)
																).toFixed(2)}
															</strong>
														</p>

														<p>
															<Typography.Text
																strong
															>
																Due Amount :
															</Typography.Text>{" "}
															<strong
																style={{
																	color: "red",
																}}
															>
																{" "}
																{(
																	singleSaleInvoice.due_amount +
																	parseFloat(
																		singleSaleInvoice.documentation ??
																			0
																	) +
																	parseFloat(
																		singleSaleInvoice.freight ??
																			0
																	) +
																	parseFloat(
																		singleSaleInvoice.handling ??
																			0
																	)
																).toFixed(2)}
															</strong>
														</p>

														<p>
															<Typography.Text
																strong
															>
																Paid Amount :
															</Typography.Text>{" "}
															<strong>
																{singleSaleInvoice.paid_amount.toFixed(
																	2
																)}
															</strong>
														</p>

														<p>
															<Typography.Text
																strong
															>
																Discount :
															</Typography.Text>{" "}
															<strong>
																{singleSaleInvoice.discount.toFixed(
																	2
																)}
															</strong>
														</p>

														<p>
															<Typography.Text
																strong
															>
																Profit :
															</Typography.Text>{" "}
															<strong>
																{singleSaleInvoice.profit.toFixed(
																	2
																)}
															</strong>
														</p>

														<p>
															<Typography.Text
																strong
															>
																Sale Date :
															</Typography.Text>{" "}
															<strong>
																{singleSaleInvoice.created_at.slice(
																	0,
																	10
																)}
															</strong>
														</p>
													</Col>

													<Col span={6}>
														<p>
															<Typography.Text
																strong
															>
																HS Code:
															</Typography.Text>{" "}
															<strong>
																{
																	singleSaleInvoice.hs_code
																}
															</strong>
														</p>
														<p>
															<Typography.Text
																strong
															>
																Documentation:
															</Typography.Text>{" "}
															<strong>
																{singleSaleInvoice.documentation ??
																	0}
															</strong>
														</p>
														<p>
															<Typography.Text
																strong
															>
																Freight:
															</Typography.Text>{" "}
															<strong>
																{
																	singleSaleInvoice.freight
																}
															</strong>
														</p>
														<p>
															<Typography.Text
																strong
															>
																Handling:
															</Typography.Text>{" "}
															<strong>
																{
																	singleSaleInvoice.handling
																}
															</strong>
														</p>
													</Col>
												</Row>

												<div>
													<h5 className="text-center mt-2 mb-2">
														Update Invoice Info
													</h5>

													<p>
														<Typography.Text strong>
															Total Paid Amount :
														</Typography.Text>{" "}
														<strong>
															{totalPaidAmount.toFixed(
																2
															)}
														</strong>
													</p>

													<p>
														<Typography.Text strong>
															Total Return Amount:
														</Typography.Text>{" "}
														<strong>
															{totalReturnAmount.toFixed(
																2
															)}
														</strong>
													</p>

													<p>
														<Typography.Text strong>
															Due Amount :
														</Typography.Text>{" "}
														<strong
															style={{
																color: "red",
															}}
														>
															{(
																singleSaleInvoice.total_amount +
																parseFloat(
																	singleSaleInvoice.documentation ??
																		0
																) +
																parseFloat(
																	singleSaleInvoice.freight ??
																		0
																) +
																parseFloat(
																	singleSaleInvoice.handling ??
																		0
																) -
																totalPaidAmount
															).toFixed(2)}
														</strong>
													</p>
												</div>
											</CardComponent>
										</Badge.Ribbon>
									</Col>
									<Col span={12}>
										<CardComponent title="Customer Information">
											<p>
												<Typography.Text strong>
													Customer Name :
												</Typography.Text>{" "}
												<strong>
													{
														singleSaleInvoice
															.customer.name
													}
												</strong>
											</p>

											<p>
												<Typography.Text strong>
													Due Amount :
												</Typography.Text>{" "}
												<strong>
													{
														singleSaleInvoice
															.customer
															?.due_amount
													}
												</strong>
											</p>

											{/* <p>
												<Typography.Text strong>Phone :</Typography.Text>{" "}
												<strong>{singleSaleInvoice.customer.phone}</strong>
											</p> */}

											<p>
												<Typography.Text strong>
													Address :
												</Typography.Text>{" "}
												<strong>
													{
														singleSaleInvoice
															.customer.address
													}
												</strong>
											</p>
										</CardComponent>
									</Col>
								</Row>
								<br />
							</div>
						</Card>
						<SaleProductListCard
							list={singleSaleInvoice.saleInvoiceProduct}
						/>

						<ReturnSaleInvoiceList list={returnSaleInvoice} />

						<TransactionSaleList list={transactions} />
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default DetailSale;
