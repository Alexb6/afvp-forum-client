import React from 'react';
import { connect } from 'react-redux';
import { Cross as Hamburger } from 'hamburger-react'
import { CSSTransition } from 'react-transition-group';

import { userLogoutAsync, getFreshAccessTokenAsync } from '../../redux/auth/auth-action-functions';
import { getUserProfileAsync } from '../../redux/user/user-action-functions';
import UserMenu from './user-menu/user-menu.component';
import UserProfile from './user-profile/user-profile.component';
import UserPasswordChange from './user-password-change/user-password-change.component';

import './user-page.styles.scss';

const menuAbsoluteOffset = 92;

class UserPage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         userMenuHeight: null,
         userHambClick: false,
         userProfileOpen: false,
         changePasswordOpen: false
      }
   }

   calcMenuWidthHeight = () => {
      const menuHeight = document.querySelector('.user-aside-menu').offsetHeight;
      this.setState({ userMenuHeight: menuHeight });
   };

   userHambugerClick = () => { this.setState({ userHambClick: !this.state.userHambClick }) };
   mobileMenuClose = () => { this.setState({ userHambClick: false }) };
   userProfileClose = () => { this.setState({ userProfileOpen: false }) }
   changePasswordClose = () => { this.setState({ changePasswordOpen: false }) }

   handleLogout = () => {
      const { accessToken, userLogoutAsync } = this.props;
      return userLogoutAsync(accessToken);
   };

   handleProfile = () => {
      const { accessToken, getUserProfileAsync } = this.props;
      this.setState({ userProfileOpen: true, changePasswordOpen: false })
      return getUserProfileAsync(accessToken);
   };

   handlechangePassword = () => {
      this.setState({ changePasswordOpen: true, userProfileOpen: false });
   };

   renderMenuComponent = () => {
      const { userProfile } = this.props;
      const { userProfileOpen, changePasswordOpen } = this.state;
      if (userProfile && userProfileOpen) { return <UserProfile userProfile={userProfile} userProfileClose={this.userProfileClose} /> }
      if (changePasswordOpen) { return <UserPasswordChange changePasswordClose={this.changePasswordClose} /> }
      else {
         return <h1 className="welcome">Bienvenue dans votre espace personnel !</h1>
      }
   };

   componentDidMount() {
      const { accessTokenRefreshInterval, getFreshAccessTokenAsync } = this.props;
      this.silentRefreshAuth = setInterval(() => {
         getFreshAccessTokenAsync(true);
      }, accessTokenRefreshInterval);
      this.calcMenuWidthHeight();
   };

   componentWillUnmount() {
      clearInterval(this.silentRefreshAuth);
   };

   render() {
      const { currentUser } = this.props;
      const { userHambClick, userMenuHeight } = this.state;
      return (
         <div className="user-page">
            <div className="user-page-titlebar container-fluid mb-3">
               <div className="titlebar-container container">
                  <h1 className="titlebar-title">Espace personnel</h1>
                  <Hamburger toggled={userHambClick} toggle={this.userHambugerClick} size={36} color="#FFFFFF" />
               </div>
            </div>
            <div className="user--space container">
               <div className="row">
                  <CSSTransition in={userHambClick} timeout={500} classNames="user-aside-menu-" >
                     <UserMenu
                        currentUser={currentUser}
                        handleLogout={this.handleLogout}
                        handleProfile={this.handleProfile}
                        handlechangePassword={this.handlechangePassword}
                        mobileMenuClose={this.mobileMenuClose}
                     />
                  </CSSTransition>
                  <CSSTransition in={userHambClick} timeout={500} classNames="right-side-display-" >
                     <div className="user--display col" style={{ minHeight: userMenuHeight + menuAbsoluteOffset }}>
                        {this.renderMenuComponent()}
                     </div>
                  </CSSTransition>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ auth, user }) => ({
   accessToken: auth.accessToken,
   accessTokenRefreshInterval: auth.accessTokenRefreshInterval,
   currentUser: user.currentUser,
   userProfile: user.userProfile
});
const mapDispatchToProps = dispatch => ({
   userLogoutAsync: token => dispatch(userLogoutAsync(token)),
   getFreshAccessTokenAsync: silentAuth => dispatch(getFreshAccessTokenAsync(silentAuth)),
   getUserProfileAsync: accessToken => dispatch(getUserProfileAsync(accessToken))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
