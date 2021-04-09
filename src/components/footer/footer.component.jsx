import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoFooter } from './../../assets-src/logo/Untitled-1.svg';
import { ReactComponent as HollowRightChevron } from './../../assets-src/icons/hollow-right-chevron.svg';
import { ReactComponent as PencilDesigner } from './../../assets-src/icons/pencil-designer.svg';
import LineDivider from './../line-divider/line-divider.component';
import AFVP from './../../assets-src/data/data-AFVP';

import './footer.styles.scss';

const { title, address, zipCode, town, country } = AFVP;

const Footer = () => (
	<div className="footer container-fluid">
		<div className="footer-body container">
			<div className="footer-address">
				<div className="address-logo">
					<LogoFooter className="logo" />
				</div>
				<div className="address-address">
					<h4>{title}</h4>
					<p>{address}</p>
					<p>{zipCode} {town}, {country}</p>
				</div>
			</div>
			<div className="footer-contact">
				<Link className="contact-contact" to='/contact'><HollowRightChevron /> Nous Contacter</Link>
				<Link className="contact-membership" to='/signinsignup'> <HollowRightChevron /> Nous Rejoindre</Link>
				<Link className="contact-donation" to='/signinsignupdonation'> <HollowRightChevron /> Faire un Don</Link>
			</div>
		</div>
		<LineDivider backgroundColor='#969696' height={0.1} />
		<div className="footer-footer container">
			<div className="footer-copyright">
				<p>Copyright <span className="copyright-entity">&copy;</span> {new Date().getFullYear()} </p>
			</div>
			<div className="footer-designer">
				<PencilDesigner /> <span>Design : ALex Tran</span>
			</div>
		</div>
	</div>
);

export default Footer;