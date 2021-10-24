import React from "react";
import { connect } from "react-redux";

import './reset-password-page.styles.scss';

import CustomButton from './../../components/button/custom-button/custom-button.component';
import FormInput from '../../components/form/form-input/form-input.component';
import FormErrorMessage from '../../components/form/form-error-message/form-error-message.component';
import LoadingSpinner from './../../components/loading-spinner/loading-spinner.component';
import { scrollToTop } from './../../utils/scrollToTop';
import ModalErrorPopUp from './../../components/modal/modal-error-popup.component';
import ModalPopUp from './../../components/modal/modal-popup/modal-popup.component';
import { checkPassword, checkPasswordConfirm, formIsValid } from '../../utils/formContollers';
import { resetPasswordAsync } from './../../redux/auth/auth-action-functions.js';

class ResetPasswordPage extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         password: '',
         pass_confirm: '',
         isModalOpen: false,
         isLoading: false,
         formErrors: {
            password: '',
            pass_confirm: ''
         },
         error: '',
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      if (formIsValid(this.state.formErrors)) {
         const { resettPasswordAsync } = this.props;
         const { password } = this.state;
         const { token } = this.props.match.params;

         try {
            this.setState({ isLoading: true });
            await resettPasswordAsync([token, password]);
            if (this.props.resetPasswordError) throw new Error(this.props.resetPasswordError);

            this.setState({ isLoading: false });
            scrollToTop();
            this.openModal();
            this.setState({ password: '', pass_confirm: '' })
         } catch (err) {
            scrollToTop();
            this.setState({ isLoading: false, error: err.message || 'Votre demande de réinitialisation du mot de passe n\'a pas été envoyée. Veuillez essayer plus tard.' });
         }
      }
   }

   handleChange = e => {
      const { value, name } = e.target;
      const { password, formErrors } = this.state;
      switch (name) {
         case 'password':
            formErrors.password = checkPassword(value) && value.length ? '' : 'Doit contenir au moins 8 charactères avec une majuscule, un chiffre et un charactère spécial suivant !@#$%^&*'
            this.setState({ formErrors, [name]: value }, () => console.log(this.state));
            break;
         case 'pass_confirm':
            formErrors.pass_confirm = checkPasswordConfirm(password, value) && value.length ? '' : 'Le mot de passe et sa confirmation ne sont pas identique !'
            this.setState({ formErrors, [name]: value }, () => console.log(this.state));
            break;
         default:
            break;
      }
   }

   closeModal = () => {
      this.setState({ isModalOpen: false });
      setTimeout(() => { this.props.history.push('/login') }, 1000);
   }
   openModal = () => this.setState({ isModalOpen: true });
   errorHandler = () => this.setState({ error: '' });

   render() {
      const { password, pass_confirm, isModalOpen, error, isLoading, formErrors } = this.state;
      return (
         <div className="reset--password container mt-5 mb-5" >
            <ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Réinitialisation réussie" footerClose>
               Votre mot de passe a été réinitialisé.
            </ModalPopUp>
            <ModalErrorPopUp title="Une erreur est survenue" errorMsg={error} closeModal={this.errorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="reset--password-frame">
               <h1>Je réinitialise mon mot de passe</h1>
               <p>Veuillez entrez votre nouveau mot de passe</p>
               <form onSubmit={this.handleSubmit} autoComplete="off" >
                  <FormInput type="password" name="password" label="Mot de passe*" value={password} required onChange={this.handleChange} />
                  {formErrors.password.length > 0 && password.length > 3 && (<FormErrorMessage >{formErrors.password}</FormErrorMessage>)}
                  <FormInput type="password" name="pass_confirm" label="Confirmer le mot de passe*" value={pass_confirm} onChange={this.handleChange} required />
                  {formErrors.pass_confirm.length > 0 && pass_confirm.length > 3 && (<FormErrorMessage >{formErrors.pass_confirm}</FormErrorMessage>)}
                  <CustomButton type="submit" className="custom-button--positive--duck">Envoyer</CustomButton>
               </form>
            </div>
         </div>
      )
   }
}
const mapStateToProps = ({ auth }) => ({
   resetPasswordError: auth.resetPasswordError,
});
const mapDispatchToProps = dispatch => ({
   resettPasswordAsync: (userData) => dispatch(resetPasswordAsync(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);