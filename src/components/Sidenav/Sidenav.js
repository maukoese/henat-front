import {
	CheckOutlined,
	CodeSandboxOutlined,
	FileDoneOutlined,
	FileOutlined,
	FileSyncOutlined,
	FlagOutlined,
	HomeOutlined,
	MinusSquareOutlined,
	ShoppingCartOutlined,
	SettingOutlined,
	ShoppingOutlined,
	UnorderedListOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	UserSwitchOutlined,
	WalletOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
// import styles from "./Sidenav.module.css";

const Sidenav = ({ color, sideNavOpenKeys }) => {
	const menu = [
		{
			label: (
				<NavLink to='/dashboard'>
					<span>Dashboard</span>
				</NavLink>
			),
			key: "dashboard",
			icon: <HomeOutlined />,
		},

		{
			label: "PRODUCTS",
			key: "product",
			icon: <CodeSandboxOutlined />,
			children: [
				{
					label: (
						<NavLink to='/product'>
							<span>Products</span>
						</NavLink>
					),
					key: "products",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/product-category'>
							<span>Product Categories</span>
						</NavLink>
					),
					key: "productCategory",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/product-subcategory'>
							<span>Product Subcategories</span>
						</NavLink>
					),
					key: "productSubcategory",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/product-brand'>
							<span>Product Brand</span>
						</NavLink>
					),
					key: "productBrand",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "PURCHASE",
			key: "purchase",
			icon: <ShoppingOutlined />,
			children: [
				{
					label: (
						<NavLink to='/supplier'>
							<span>Suppliers</span>
						</NavLink>
					),
					key: "suppliers",
					icon: <UserOutlined />,
				},
				{
					label: (
						<NavLink to='/purchase'>
							<span>New Purchase</span>
						</NavLink>
					),
					key: "newPurchase",
					icon: <CheckOutlined />,
				},
				{
					label: (
						<NavLink to='/purchaselist'>
							<span>Purchase List</span>
						</NavLink>
					),
					key: "purchaseList",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "SALE",
			key: "sale",
			icon: <MinusSquareOutlined />,
			children: [
				{
					label: (
						<NavLink to='/customer'>
							<span>Customers</span>
						</NavLink>
					),
					key: "customers",
					icon: <UserOutlined />,
				},
				{
					label: (
						<NavLink to='/sale'>
							<span>New Sale</span>
						</NavLink>
					),
					key: "newSale",
					icon: <CheckOutlined />,
				},
				{
					label: (
						<NavLink to='/salelist'>
							<span>Sale List</span>
						</NavLink>
					),
					key: "saleList",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "ACCOUNTS",
			key: "accounts",
			icon: <WalletOutlined />,
			children: [
				{
					label: (
						<NavLink to='/account/'>
							<span>Account</span>
						</NavLink>
					),
					key: "accountList",
					icon: <UnorderedListOutlined />,
				},
				{
					label: (
						<NavLink to='/transaction/create'>
							<span>New Transaction</span>
						</NavLink>
					),
					key: "newTransaction",
					icon: <CheckOutlined />,
				},
				{
					label: (
						<NavLink to='/transaction/'>
							<span>Transaction List</span>
						</NavLink>
					),
					key: "transactionList",
					icon: <UnorderedListOutlined />,
				},
			],
		},
		{
			label: "REPORT",
			key: "report",
			icon: <FlagOutlined />,
			children: [
				{
					label: (
						<NavLink to='/account/trial-balance'>
							<span>Trial Balance</span>
						</NavLink>
					),
					key: "trialBalance",
					icon: <FileDoneOutlined />,
				},
				{
					label: (
						<NavLink to='/account/balance-sheet'>
							<span>Balance Sheet</span>
						</NavLink>
					),
					key: "balanceSheet",
					icon: <FileOutlined />,
				},
				{
					label: (
						<NavLink to='/account/income'>
							<span>Income Statement</span>
						</NavLink>
					),
					key: "incomeStatement",
					icon: <FileSyncOutlined />,
				},
			],
		},

		{
			label: "HR",
			key: "hr",
			icon: <UserOutlined />,
			children: [
				{
					label: (
						<NavLink to='/hr/staffs'>
							<span>Staffs</span>
						</NavLink>
					),
					key: "staffs",
					icon: <UsergroupAddOutlined />,
				},
				{
					label: (
						<NavLink to='/role'>
							<span>Role & Permissions</span>
						</NavLink>
					),
					key: "roleAndPermissions",
					icon: <UserSwitchOutlined />,
				},
				{
					label: (
						<NavLink to='/designation/'>
							<span>Designation</span>
						</NavLink>
					),
					key: "designation",
					icon: <UserSwitchOutlined />,
				},
			],
		},

		{
			label: "SETTINGS",
			key: "settings",
			icon: <SettingOutlined />,
			children: [
				{
					label: (
						<NavLink to='/invoice-setting'>
							<span>Invoice Settings</span>
						</NavLink>
					),
					key: "invoiceSetting",
					icon: <SettingOutlined />,
				},
			],
		},
	];

	return (
		<div>
			<Menu
				theme='dark'
				mode='inline'
				items={menu}
				className='sidenav-menu'
				// openKeys={[sideNavOpenKeys]}
				// style={{ backgroundColor: "transparent" }}
			/>
		</div>
	);
};

export default Sidenav;
