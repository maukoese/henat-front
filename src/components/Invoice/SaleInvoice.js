import "./style.css";

import React, { Fragment, forwardRef, useRef } from "react";
import { useEffect, useState } from "react";

import { Button } from "antd";
import getSetting from "../../api/getSettings";
import moment from "moment";
import number2words from "../../utils/numberToWords";
import { useReactToPrint } from "react-to-print";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
	return (
		<Fragment>
			<div ref={ref} className="wrapper">
				<div className="box4">
					<img
						src="/henat.png"
						width={150}
						className="ms-4 mb-1 "
						alt="Logo"
					/>
					<h4>{invoiceData?.company_name}</h4>
					<p>{invoiceData?.address}</p>
					<p>
						{invoiceData?.email} . {invoiceData?.phone}
					</p>
				</div>

				<div className="box5">
					<table className="table2">
						<tr>
							<th>Client Name</th>
							<td>{data?.customer.name}</td>
						</tr>
						<tr>
							<th>Address</th>
							<td>{data?.customer.address}</td>
						</tr>
						<tr>
							<th>H.S Code</th>
							<td>{data.hs_code}</td>
						</tr>
						{/* <tr>
							<th>Contact No</th>
							<td>{data?.customer.phone}</td>
						</tr> */}
					</table>
				</div>

				<div className="box6">
					<table className="table2">
						<tr>
							<th colSpan={2}>
								<h3 className="center">SALE INVOICE</h3>
							</th>
						</tr>
						<tr>
							<th>Invoice No</th>
							<td>{data?.id}</td>
						</tr>
						<tr>
							<th>Invoice Date</th>
							<td>{moment(data?.date).format("YYYY-MM-DD")}</td>
						</tr>
					</table>
				</div>

				<div className="box7">
					<table className="table1">
						<thead>
							<th>S.No</th>
							<th>Variety</th>
							<th>Length</th>
							<th>Pack Rate</th>
							<th>Box Number</th>
							<th>Stem Count</th>
							<th>Unit Price</th>
							<th>Total Price</th>
						</thead>
						<tbody>
							{data &&
								data.saleInvoiceProduct.map(d => (
									<tr key={d.id}>
										<td>{d.id}</td>
										<td>
											<p>{d.product.name}</p>
										</td>
										<td>{d["length"]}cm</td>
										<td>{d.pack_rate}</td>
										<td>{d.boxes}</td>
										<td>{d.product_quantity}</td>
										<td>{d.product_sale_price}</td>
										<td>
											{(
												d.product_quantity *
												d.product_sale_price
											).toFixed(2)}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				<div className="box9">
					<table className="table2">
						<tr>
							<th>Box number</th>
							<td>
								{data &&
									data.saleInvoiceProduct.reduce(
										(p, c) => p + c.boxes,
										0
									)}
							</td>
						</tr>
						<tr>
							<th>Stem count</th>
							<td>
								{data &&
									data.saleInvoiceProduct.reduce(
										(p, c) => p + c.product_quantity,
										0
									)}
							</td>
						</tr>
						<tr>
							<th>Sub total</th>
							<td>{data.total_amount.toFixed(2)}</td>
						</tr>
						<tr>
							<th>Discount (-)</th>
							<td>{data.discount.toFixed(2)}</td>
						</tr>
						<tr>
							<th>Flower total</th>
							<td>
								{(data.total_amount - data.discount).toFixed(2)}
							</td>
						</tr>
						<tr>
							<th>Documentation</th>
							<td>{data.documentation}</td>
						</tr>
						<tr>
							<th>Freight</th>
							<td>{data.freight}</td>
						</tr>
						<tr>
							<th>Handling</th>
							<td>{data.handling}</td>
						</tr>
						<tr>
							<th>Grand total</th>
							<td>
								{(
									data.total_amount +
									parseFloat(data.documentation) +
									parseFloat(data.freight) +
									parseFloat(data.handling) -
									data.discount
								).toFixed(2)}
							</td>
						</tr>
						<tr>
							<th>Paid</th>
							<td>{data.paid_amount.toFixed(2)}</td>
						</tr>
						<tr>
							<th>Due</th>
							<td>
								{(
									data.due_amount +
									parseFloat(data.documentation) +
									parseFloat(data.freight) +
									parseFloat(data.handling)
								).toFixed(2)}
							</td>
						</tr>
					</table>
				</div>

				<div className="box10">
					<hr />
					<p>Received By</p>
				</div>

				<div className="box11">
					<hr />
					<p>Authorized By</p>
				</div>

				<div className="box12">
					<hr />
					{invoiceData?.footer}
				</div>

				<div className="box13">
					<p>
						<b>In Words: </b>
						{number2words(
							parseFloat(data.total_amount) +
								parseFloat(data.documentation) +
								parseFloat(data.freight) +
								parseFloat(data.handling) -
								parseFloat(data.discount)
						).toUpperCase()}{" "}
						USD
					</p>

					<div>
						<table>
							<tr>
								<th colSpan={2}>Make payments to:</th>
							</tr>
							<tr>
								<th>A/C NAME</th>
								<td>Henat Enterprises Ltd</td>
							</tr>
							<tr>
								<th>BANK NAME</th>
								<td>I&M Bank Ltd</td>
							</tr>
							<tr>
								<th>BRANCH</th>
								<td>Gateway Mall</td>
							</tr>
							<tr>
								<th>A/C NO</th>
								<td>03101164281210 </td>
							</tr>
							<tr>
								<th>CURRENCY</th>
								<td>USD </td>
							</tr>
							<tr>
								<th>SWIFT</th>
								<td>IMBLKENA</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</Fragment>
	);
});

const SaleInvoice = ({ data }) => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const [invoiceData, setInvoiceData] = useState(null);
	useEffect(() => {
		getSetting().then(data => setInvoiceData(data.result));
	}, []);

	return (
		<div>
			<div className="hidden">
				<PrintToPdf
					ref={componentRef}
					data={data}
					invoiceData={invoiceData}
				/>
			</div>
			{invoiceData && (
				<Button type="primary" shape="round" onClick={handlePrint}>
					Print PDF
				</Button>
			)}
		</div>
	);
};

export default SaleInvoice;
