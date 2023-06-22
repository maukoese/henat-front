import {
	Badge,
	Button,
	Card,
	Form,
	InputNumber,
	Col,
	Popover,
	Row,
	Typography,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardComponent from "../Card/card.components";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { loadSingleSale } from "../../redux/actions/sale/detailSaleAction";

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

	//dispatch
	const dispatch = useDispatch();
	const sale = useSelector((state) => state.sales.sale);
	const {
		singleSaleInvoice,
	} = sale ? sale : {};

	const updateInvoice = (invoiceId, fields) => {
		const { message } = dispatch(updateSale(invoiceId, Object.values(fields)));
		
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
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
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
			<PageTitle title="Edit Invoice" />

			<div className="mr-tops">
				{singleSaleInvoice ? (
					<Fragment key={singleSaleInvoice.id}>
						<SaleProductEditCard
							invoiceId={singleSaleInvoice.id}
							list={singleSaleInvoice.saleInvoiceProduct}
							updateInvoice={updateInvoice}
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
