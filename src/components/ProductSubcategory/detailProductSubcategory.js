import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteProductSubCategory } from "../../redux/actions/productSubCategory/deleteProductSubCategoryAction";
import { loadSingleProductSubCategory } from "../../redux/actions/productSubCategory/detailProductSubCategoryAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import GenerateBarcodePopUp from "../product/generateBarcodePopUp";

//PopUp

function CustomTable({ list, categoryName }) {
	const dispatch = useDispatch();
	const [columnItems, setColumnItems] = useState([]);
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		// {
		// 	title: "Image",
		// 	dataIndex: "thumbnail_image_url",
		// 	render: (thumbnail_image_url) => (
		// 		<img
		// 			style={{ maxWidth: "40px" }}
		// 			alt='product'
		// 			src={thumbnail_image_url}
		// 		/>
		// 	),
		// },
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "SKU",
			dataIndex: "sku",
			key: "sku",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (name, { id }) => <Link to={`/product/${id}`}>{name}</Link>,
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "Purchase price",
			dataIndex: "purchase_price",
			key: "purchase_price",
			responsive: ["md"],
		},
		{
			title: "Sale price",
			dataIndex: "sale_price",
			key: "sale_price",
			responsive: ["md"],
		},
		{
			title: "Unit Type",
			dataIndex: "unit_type",
			key: "unit_type",
		},

		{
			title: "Reorder QTY",
			dataIndex: "reorder_quantity",
			key: "reorder_quantity",
		},
		{
			title: "Action",
			dataIndex: "sku",
			key: "sku",
			render: (sku) => <GenerateBarcodePopUp sku={sku ? sku : 0} />,
		},
	];

	useEffect(() => {
		setColumnItems(menuItems);
		setColumnsToShow(columns);
	}, []);

	const colVisibilityClickHandler = (col) => {
		const ifColFound = columnsToShow.find((item) => item.key === col.key);
		if (ifColFound) {
			const filteredColumnsToShow = columnsToShow.filter(
				(item) => item.key !== col.key
			);
			setColumnsToShow(filteredColumnsToShow);
		} else {
			const foundIndex = columns.findIndex((item) => item.key === col.key);
			const foundCol = columns.find((item) => item.key === col.key);
			let updatedColumnsToShow = [...columnsToShow];
			updatedColumnsToShow.splice(foundIndex, 0, foundCol);
			setColumnsToShow(updatedColumnsToShow);
		}
	};

	const menuItems = columns.map((item) => {
		return {
			key: item.key,
			label: <span>{item.title}</span>,
		};
	});

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='card card-custom border'>
			<div className='card-body'>
				<div className='card-title d-flex justify-content-between'>
					<h5>Product List</h5>
					{list && (
						<div>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename={`subCategory_${categoryName}`}>
								Download CSV
							</CSVLink>
						</div>
					)}
				</div>

				{list && (
					<div style={{ marginBottom: "30px" }}>
						<Dropdown
							overlay={
								<Menu onClick={colVisibilityClickHandler} items={columnItems} />
							}
							placement='bottomLeft'>
							<Button>Column Visibility</Button>
						</Dropdown>
					</div>
				)}

				<Table
					scroll={{ x: true }}
					loading={!list}
					columns={columnsToShow}
					dataSource={list ? addKeys(list) : []}
				/>
			</div>
		</div>
	);
}

const DetailProductCategory = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const subCategory = useSelector(
		(state) => state.productSubCategories.sub_category
	);

	//Delete Supplier
	const onDelete = () => {
		try {
			dispatch(DeleteProductSubCategory(id));

			setVisible(false);
			toast.warning(`Product : ${subCategory.name} is removed `);
			return navigate("/product-subcategory");
		} catch (error) {
			console.log(error.message);
		}
	};
	// Delete Supplier PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleProductSubCategory(id));
	}, [id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back ' subtitle=' ' />

			<div className='mr-top'>
				{subCategory ? (
					<Fragment key={subCategory.id}>
						<Card bordered={false} className='card-custom'>
							<div
								className='card-header d-flex justify-content-between'
								style={{ padding: 0 }}>
								<div className='w-50'>
									<h5>
										<i className='bi bi-person-lines-fill'></i>
										<span className='mr-left'>
											ID : {subCategory.id} | {subCategory.name}
										</span>
									</h5>
								</div>
								<div className='text-end w-50'>
									<Link
										className='me-3 d-inline-block'
										to={`/product-subcategory/${subCategory.id}/update`}
										state={{ data: subCategory }}>
										<Button
											type='primary'
											shape='round'
											icon={<EditOutlined />}></Button>
									</Link>
									<Popover
										content={
											<a onClick={onDelete}>
												<Button type='primary' danger>
													Yes Please !
												</Button>
											</a>
										}
										title='Are you sure you want to delete ?'
										trigger='click'
										visible={visible}
										onVisibleChange={handleVisibleChange}>
										<Button
											type='danger'
											DetailProductCategory
											shape='round'
											icon={<DeleteOutlined />}></Button>
									</Popover>
								</div>
							</div>

							<div className='my-2 table-responsive'>
								<h5 className='text-center mb-2'>
									{" "}
									Products under <strong>{subCategory.name} </strong>
								</h5>

								<CustomTable
									list={subCategory?.product}
									categoryName={subCategory?.name}
								/>
							</div>
						</Card>
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default DetailProductCategory;
