import React from "react";
import { connect } from "react-redux";

import CustomButton from './../../components/button/custom-button/custom-button.component';
import { verifyEmailAsync } from './../../redux/user/user-action-functions';
import LoadingSpinner from './../../components/loading-spinner/loading-spinner.component';
import { scrollToTop } from './../../utils/scrollToTop';
import ModalErrorPopUp from './../../components/modal/modal-error-popup.component';
import ModalWarningPopUp from './../../components/modal/modal-warning-popup.component';
import ModalPopUp from './../../components/modal/modal-popup/modal-popup.component';

import './email-verification.styles.scss';

class EmailVerification extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         error: '',
         warning: '',
         isModalOpen: false,
         isLoading: false,
      }
   }

   handleVerifyEmail = async () => {
      const { token } = this.props.match.params;
      try {
         this.setState({ isLoading: true });
         await this.props.verifyEmailAsync(token);
         if (this.props.emailVerifiedError) throw new Error(this.props.emailVerifiedError);
         this.setState({ isLoading: false });
         scrollToTop();
      } catch (err) {
         scrollToTop();
         if (this.props.emailVerifiedError.startsWith('Votre courriel est déjà verifié')) {
            this.setState({ isLoading: false, warning: this.props.emailVerifiedError });
         } else {
            this.setState({ isLoading: false, error: this.props.emailVerifiedError });
         }
      }
   }

   closeModal = () => {
      this.setState({ isModalOpen: false });
      setTimeout(() => { this.props.history.push('/login') }, 1000);
   }
   openModal = () => this.setState({ isModalOpen: true });
   errorHandler = () => this.setState({ error: '', warning: '' });

   componentDidUpdate(prevProps) {
      if (this.props.emailVerified !== prevProps.emailVerified) {
         this.openModal();
      }
   }

   render() {
      const { error, warning, isLoading, isModalOpen } = this.state;
      return (
         <div className="email--verification container mt-5 mb-5" >
            <ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Validation du courriel" footerClose>
               Votre courriel est validé. Vous pouvez désormais vous connecter à votre espace personnel.
            </ModalPopUp>
            <ModalErrorPopUp title="Erreur de validation" errorMsg={error} closeModal={this.errorHandler} />
            <ModalWarningPopUp title="Validation effcectuée" errorMsg={warning} closeModal={this.errorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="email--verification-frame">
               <h1>Veuillez confirmer votre courriel </h1>
               <p>En cliquant le bouton ci-dessous, vous confirmerez votre courriel.</p>
               <CustomButton className="custom-button--positive--duck" onClick={this.handleVerifyEmail} >Je confirme</CustomButton>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ user }) => ({
   emailVerified: user.emailVerified,
   emailVerifiedError: user.emailVerifiedError
});
const mapDispatchToProps = dispatch => ({
   verifyEmailAsync: userData => dispatch(verifyEmailAsync(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);