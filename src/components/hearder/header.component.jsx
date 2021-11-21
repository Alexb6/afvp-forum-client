import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Spin as Hamburger } from 'hamburger-react'
import { connect } from 'react-redux';

import { ReactComponent as Logo } from './../../assets-src/logo/logo site 120-46px v02_01.svg';
import { ReactComponent as AngleRight } from './../../assets-src/icons/angle-right-solid.svg';
import { ReactComponent as AngleDown } from './../../assets-src/icons/angle-down-solid.svg';
import { ReactComponent as DefaultUser } from './../../assets-src/icons/user.svg';

import DropdownFlag from './dropdown-flag/dropdown-flag.component';

import './header.styles.scss';

const Header = ({ currentUser }) => {
	const [hambClick, setHambClick] = useState(false);
	const [dropdownFlag, setDropdownFlag] = useState(false);

	const hambugerClick = () => setHambClick(!hambClick);
	const mobileMenuClose = () => setHambClick(false);
	const handleDropdownFlag = () => setDropdownFlag(!dropdownFlag);

	const showDropdownFlag = () => {
		if (window.innerWidth > 720) setDropdownFlag(true);
	}
	const hideDropdownFlag = () => {
		if (window.innerWidth > 720) setDropdownFlag(false);
	}

	return (
		<header className="header">
			<nav className="container">
				<div className="navbar__inner row">
					<Link className="navbar__logo" to='/' onClick={mobileMenuClose} >
						<Logo className="logo" />
					</Link>
					<div className="navbar__hamburgers">
						<Hamburger toggled={hambClick} toggle={hambugerClick} size={40} color="#464b4c" />
					</div>
					<ul className={`navbar__menu ${hambClick ? 'active' : ''}`} >
						<div className="menu__separator"></div>
						<li className="menu__item about">
							<Link to='/about' onClick={mobileMenuClose} >à propos</Link>
						</li>
						<li className="menu__item forum">
							<Link to='/forum' onClick={mobileMenuClose} >forum</Link>
						</li>
						<li className="menu__item blog">
							<a href='https://www.blog.afvp.net/' target="_blank" rel="noopener noreferrer" onClick={mobileMenuClose}>blog</a>
						</li>
						<li className="menu__item flag" onMouseEnter={showDropdownFlag} onMouseLeave={hideDropdownFlag}>
							<Link to='#' onClick={handleDropdownFlag} >flag <AngleDown className="fas fa-angle-down" /> <AngleRight className="fas fa-angle-right" /></Link>
							<CSSTransition in={dropdownFlag} timeout={500} classNames={'dropdownFlag-'} unmountOnExit={true} >
								<DropdownFlag dropdownFlag={dropdownFlag} setDropdownFlag={setDropdownFlag} setHambClick={setHambClick} />
							</CSSTransition>
						</li>
						{currentUser ?
							<li className="menu__item login">
								<Link className="current-user" to='/user' onClick={mobileMenuClose}>
									<span className="default-user"><DefaultUser /></span>
									<span className="user-name">{currentUser.first_name}</span>
								</Link>
							</li>
							:
							<li className="menu__item login">
								<Link to='/login' onClick={mobileMenuClose}>connexion</Link>
							</li>
						}
					</ul>

				</div>
			</nav>
		</header>
	)
};


const mapStateToProps = state => ({
	currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);