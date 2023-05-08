import React, { Fragment } from "react";
import "./style.css";

const NewDashboardCard = ({ information }) => {
	return (
		<Fragment>
			<div>
				<div className='row'>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, rgba(110,110,170,1) 49%, rgba(36,53,99,1) 100%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>
												{information?.purchase_total
													? information?.purchase_total
													: 0}
											</h3>
											<span className=''>Total Purchase</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-cloud-download font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, rgba(255,140,91,1) 51%, rgba(255,107,36,1) 100%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>
												{information?.sale_total ? information?.sale_total : 0}
											</h3>
											<span className=''>Total Sale</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-rocket font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, rgba(91,170,255,1) 51%, rgba(6,83,207,1) 100%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>
												{information?.sale_profit
													? information?.sale_profit
													: 0}
											</h3>
											<span className=''>Total Profit</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-wallet font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, rgba(86,219,98,1) 51%, rgba(95,179,119,1) 100%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>
												{information?.sale_count ? information?.sale_count : 0}
											</h3>
											<span className=''>Total Sale</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-wallet font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default NewDashboardCard;
