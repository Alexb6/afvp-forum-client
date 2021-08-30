import React from 'react';
import { connect } from 'react-redux';
import { userLogoutAsync, getFreshAccessTokenAsync } from '../../redux/auth/auth-action-functions';
// import { userLogout } from '../../redux/auth/auth-action';
// import { clearCurrentUser } from '../../redux/user/user-action';
// import { deleteAllCookies } from '../../services/auth';

import CustomButton from '../../components/button/custom-button.component';

import './user-page.styles.scss';

class UserPage extends React.Component {

   handleLogout = () => {
      const { accessToken, userLogoutAsync } = this.props;
      return userLogoutAsync(accessToken);
   }

   // multiTabLogout = e => {
   //    if (e.key === 'userLoggedOut') {
   //       console.log('multiTabLogout fired -----------------------------');
   //       this.props.userLogout();
   //       this.props.clearCurrentUser();
   //       deleteAllCookies();
   //    }
   // }

   componentDidMount() {
      const { accessTokenRefreshInterval, getFreshAccessTokenAsync } = this.props;
      this.silentRefreshAuth = setInterval(() => {
         getFreshAccessTokenAsync(true);
      }, accessTokenRefreshInterval);
      // window.addEventListener('storage', this.multiTabLogout);
   }

   componentWillUnmount() {
      clearInterval(this.silentRefreshAuth);
      // window.removeEventListener('userLoggedOut', this.multiTabLogout);
      // window.removeEventListener('storage', console.log('removeEventListener in user component-------------------'));
   }

   render() {
      return (
         <div className="memberpage">
            <div className="container">
               <h1>Espace membre</h1>
               <CustomButton onClick={this.handleLogout} type="submit" className="custom-button--positive--duck">Déconnexion</CustomButton>
            </div>
         </div>
      )
   }

}

const mapStateToProps = ({ auth }) => ({
   accessToken: auth.accessToken,
   accessTokenRefreshInterval: auth.accessTokenRefreshInterval
});
const mapDispatchToProps = dispatch => ({
   userLogoutAsync: token => dispatch(userLogoutAsync(token)),
   getFreshAccessTokenAsync: silentAuth => dispatch(getFreshAccessTokenAsync(silentAuth)),
   // userLogout: () => dispatch(userLogout()),
   // clearCurrentUser: () => dispatch(clearCurrentUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
