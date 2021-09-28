import React from 'react';
import { Link } from 'react-router-dom';

import CustomSmallButton from '../../../components/button/custom-small-button/custom-small-button.component';

import './user-menu.styles.scss';

const UserMenu = ({ currentUser, handleLogout, handleProfile, handlechangePassword, mobileMenuClose }) => (
   <div className="user-aside-menu col">
      {currentUser &&
         <div className="user--infos">
            <div className="user--photo--name">
               <div className="user--photo">
                  {currentUser.photo_url
                     ? <div className="photo--link">
                        <img className="link" src={`${process.env.REACT_APP_SERVER_ORIGIN}/${currentUser.photo_url}`} alt={`${currentUser.first_name} ${currentUser.family_name}`} />
                     </div>
                     : <div className="photo--gradient"></div>
                  }
               </div>
               <div className="user--name">{currentUser.first_name} {currentUser.family_name}</div>
            </div>
            <div className="user--role">Développeur</div>
         </div>
      }
      <CustomSmallButton id="logout" onClick={handleLogout} type="submit" className="custom-small-button--positive--duck-light mb-2">Déconnexion</CustomSmallButton>
      <ul className="user--menu">
         <li className="user--menu--item" onClick={() => { mobileMenuClose(); handleProfile() }}>
            <Link to='#'>Mon Profil</Link>
         </li>
         <li className="user--menu--item" onClick={() => { mobileMenuClose(); handlechangePassword() }}>
            <Link to='#'>Changer de Mot de Passe</Link>
         </li>
         <li className="user--menu--item" onClick={mobileMenuClose}>
            <Link to='#'>Payer ma Cotisation</Link>
         </li>
         <li className="user--menu--item" onClick={mobileMenuClose}>
            <Link to='#'>Faire un Don</Link>
         </li>
      </ul>
      <div className="admin--space">Administration</div>
      <ul className="admin--menu">
         <li className="admin--menu--item" onClick={mobileMenuClose}>
            <Link to='#'>Demandes d'Adhésion</Link>
         </li>
      </ul>
   </div>
)

export default UserMenu;