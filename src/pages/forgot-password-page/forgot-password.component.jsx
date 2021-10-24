import React from "react";
import { connect } from "react-redux";

import './forgot-password.styles.scss';

import CustomButton from './../../components/button/custom-button/custom-button.component';
import FormInput from '../../components/form/form-input/form-input.component';
import FormOptionsSelect from './../../components/form/form-select/form-select.component';
import LoadingSpinner from './../../components/loading-spinner/loading-spinner.component';
import { scrollToTop } from './../../utils/scrollToTop';
import ModalErrorPopUp from './../../components/modal/modal-error-popup.component';
import ModalPopUp from './../../components/modal/modal-popup/modal-popup.component';
import { forgotPasswordAsync } from './../../redux/auth/auth-action-functions.js';

class ForgotPasswordPage extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         email: '',
         isModalOpen: false,
         isLoading: false,
         error: '',
         userType: '',
         userTypeOptions: ['Membre', 'Donateur']
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      const { forgotPasswordAsync } = this.props;
      const { email, userType } = this.state;
      let userResource;
      if (userType) {
         if (userType === 'Membre') userResource = 'members';
         if (userType === 'Donateur') userResource = 'donors';
      }

      try {
         this.setState({ isLoading: true });
         await forgotPasswordAsync([userResource, email]);
         if (this.props.forgotPasswordError) throw new Error(this.props.forgotPasswordError);

         this.setState({ isLoading: false });
         scrollToTop();
         this.openModal();
         this.setState({ userType: '', email: '' })
      } catch (err) {
         scrollToTop();
         this.setState({ isLoading: false, error: err.message || 'Votre demande de réinitialisation du mot de passe n\'a pas été envoyée. Veuillez essayer plus tard.' });
      }

   }

   handleChange = e => {
      const { value, name } = e.target;
      this.setState({ [name]: value })
   }

   closeModal = () => this.setState({ isModalOpen: false });
   openModal = () => this.setState({ isModalOpen: true });
   errorHandler = () => this.setState({ error: '' });

   render() {
      const { email, isModalOpen, error, isLoading, userType, userTypeOptions } = this.state;
      return (
         <div className="forgot--password container mt-5 mb-5" >
            <ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Demande de réinitialisation" footerClose>
               Un lien pour réinitialiser votre mot de passe a été envoyé. Veuillez vérifier votre courriel.
            </ModalPopUp>
            <ModalErrorPopUp title="Une erreur est survenue" errorMsg={error} closeModal={this.errorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="forgot--password-frame">
               <h1>J'ai oublié mon mot de passe</h1>
               <p>Veuillez entrez ces informations pour recevoir un lien de réinitialisation</p>
               <form onSubmit={this.handleSubmit} autoComplete="off" >
                  <FormOptionsSelect name="userType" label="Je suis...*" value={userType} options={userTypeOptions} required onChange={this.handleChange} />
                  <FormInput type="email" name="email" label="Courriel*" value={email} onChange={this.handleChange} required />
                  <CustomButton type="submit" className="custom-button--positive--duck">Envoyer</CustomButton>
               </form>
            </div>
         </div>
      )
   }
}
const mapStateToProps = ({ auth }) => ({
   forgotPasswordError: auth.forgotPasswordError,
});
const mapDispatchToProps = dispatch => ({
   forgotPasswordAsync: (userData) => dispatch(forgotPasswordAsync(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);