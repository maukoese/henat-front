import { Col, Layout, Row } from "antd";
import styles from "./Footer.module.css";

function Footer() {
	const { Footer: AntFooter } = Layout;
	const year = new Date().getFullYear();

	return (
		<AntFooter className={styles.footer}>
			<Row>
				<Col xs={24} md={24} lg={12} className={styles.copyrightCol}>
					<p className={styles.copyrightText}>
						{year}{" "}
						All rights reserved
					</p>
				</Col>
				<Col xs={24} md={24} lg={12}>
					<div className={styles.footerMenu}>
						<ul className={styles.footerList}>
							<li className='nav-item'>
								<a
									href='/'
									className='nav-link text-muted'
									target='/'>
									Home
								</a>
							</li>
							<li className='nav-item'>
								<a href='https://henatflowers.com/about-us/' className='nav-link text-muted' target='/'>
									About Us
								</a>
							</li>
							<li className='nav-item'>
								<a href='https://henatflowers.com/contact-us/' className='nav-link text-muted' target='_blank'>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</Col>
			</Row>
		</AntFooter>
	);
}

export default Footer;
