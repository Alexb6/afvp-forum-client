import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as AngleRight } from './../../../assets-src/icons/angle-right-solid.svg';
import { flagItems } from './flags/flagItems';


import './dropdown-flag.styles.scss';

function DropdownFlag({ dropdownFlag, setDropdownFlag, setHambClick }) {

	const langSelect = () => {
		setDropdownFlag(false)
		setHambClick(false)
	};

	return (
		<ul className="dropdown__menu" >
			<div className={`dropdown__flag ${dropdownFlag ? 'active' : ''}`}>
				<div className='mobile-close-dropdown' onClick={() => setDropdownFlag(!dropdownFlag)}>
					<AngleRight className="fas fa-angle-right" />
				</div>
				{flagItems.map(item => {
					return (
						<li key={item.index}>
							<Link
								className={item.className}
								to={item.path}
								onClick={langSelect}
							>
								<div className="flag-flag">{item.flag}</div> {item.language}
							</Link>
						</li>
					);
				})}
			</div>

		</ul>
	);
}

export default DropdownFlag;