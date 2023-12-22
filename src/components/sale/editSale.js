import { Form } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardComponent from "../Card/card.components";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { loadSingleSale } from "../../redux/actions/sale/detailSaleAction";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";

import { deleteSale } from "../../redux/actions/sale/deleteSaleAction";
import ReturnSaleInvoiceList from "../Card/saleInvoice/ReturnSaleInvoiceList";
import SaleProductEditCard from "../Card/saleInvoice/SaleProductEditCard";
import TransactionSaleList from "../Card/saleInvoice/TransactionSaleList";
import PackingSlip from "../Invoice/PackingSlip";
import SaleInvoice from "../Invoice/SaleInvoice";
import { updateSale } from "../../redux/actions/sale/updateSaleAction";
//PopUp

const EditDetailSale = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	const [form] = Form.useForm();

	const [visible, setVisible] = useState(false);
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalStems, setTotalStems] = useState(0);
	const [totalDue, setTotalDue] = useState(0);

	//dispatch
	const dispatch = useDispatch();
	const sale = useSelector((state) => state.sales.sale);
	const { singleSaleInvoice } = sale ? sale : {};

	const updateInvoice = (invoiceId, fields) => {
		const { message } = dispatch(
			updateSale(invoiceId, Object.values(fields), totalDue)
		);

		navigate(`/sale/${invoiceId}`);
	};

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

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadProduct({ page: 1, limit: 200 }));
	}, []);

	useEffect(() => {
		dispatch(loadSingleSale(id));

		setTotalStems(
			singleSaleInvoice?.saleInvoiceProduct.reduce(
				(p, item) => p + parseFloat(item.product_quantity),
				0
			)
		);

		setTotalAmount(
			singleSaleInvoice?.saleInvoiceProduct.reduce(
				(p, item) =>
					p +
					parseFloat(item.product_sale_price) *
						parseFloat(item.product_quantity),
				0
			)
		);

		setTotalDue(singleSaleInvoice?.due_amount);
	}, [id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));
	const allProducts = useSelector((state) => state.products.list);

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title="Edit Invoice" />

			<div className="mr-tops">
				{singleSaleInvoice ? (
					<Fragment key={singleSaleInvoice.id}>
						<SaleProductEditCard
							invoiceId={singleSaleInvoice.id}
							list={singleSaleInvoice.saleInvoiceProduct}
							updateInvoice={updateInvoice}
							setAmount={setTotalAmount}
							setStems={setTotalStems}
							setDue={setTotalDue}
							paid={singleSaleInvoice.paid_amount}
							products={allProducts}
							totals={
								<table>
									<tr>
										<th>Total amount</th>
										<td>USD {totalAmount?.toFixed(2)}</td>
									</tr>
									<tr>
										<th>Total due</th>
										<td>USD {totalDue?.toFixed(2)}</td>
									</tr>
									<tr>
										<th>Total stems</th>
										<td>{totalStems}</td>
									</tr>
								</table>
							}
						/>
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default EditDetailSale;
