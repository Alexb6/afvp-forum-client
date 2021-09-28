import React from "react";
import { connect } from "react-redux";

import './user-password-change.styles.scss';

import FormInput from './../../../components/form/form-input/form-input.component';
import FormCancelValidButtons from './../../../components/form/form-cancel-valid-buttons/form-cancel-valid-buttons.component';
import { checkPassword, checkPasswordConfirm, formIsValid } from './../../../utils/formContollers';
import LoadingSpinner from './../../../components/loading-spinner/loading-spinner.component';
import { scrollToTop } from './../../../utils/scrollToTop';
import FormErrorMessage from './../../../components/form/form-error-message/form-error-message.component';
import { updateMyPasswordAsync } from './../../../redux/auth/auth-action-functions';
import ModalPopUp from './../../../components/modal/modal-popup/modal-popup.component';
import ReturnIcon from './../../../components/button/return-icon/return-icon.component';

class UserPasswordChange extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         password_current: '',
         password: '',
         password_confirm: '',
         formErrors: {
            password_current: '',
            password: '',
            pass_confirm: '',
            isModalOpen: false,
            isLoading: false,
            error: ''
         }
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      if (formIsValid(this.state.formErrors)) {
         const { password_current, password, pass_confirm } = this.state;
         const userInfos = { password_current, password, pass_confirm };
         const { updateMyPasswordAsync, accessToken } = this.props;
         try {
            this.setState({ isLoading: true });
            await updateMyPasswordAsync([accessToken, userInfos]);
            if (this.props.updateMyPasswordError) throw new Error(this.props.updateMyPasswordError);

            this.setState({ isLoading: false });
            scrollToTop();
            this.openModal();
            this.setState({ password_current: '', password: '', pass_confirm: '' });
         } catch (err) {
            scrollToTop();
            this.setState({ isLoading: false, error: this.props.updateMyPasswordError || 'Une erreur est survenue, votre demande n\'a pas été envoyée. Veuillez essayer plus tard.' });
         }
      }
   }

   handleChange = e => {
      const { name, value } = e.target;
      const { password, formErrors } = this.state;
      switch (name) {
         case 'password_current':
            formErrors.password_current = checkPassword(value) && value.length ? '' : 'Doit contenir au moins 8 charactères avec une majuscule, un chiffre et un charactère spécial suivant !@#$%^&*'
            this.setState({ formErrors, [name]: value });
            break;
         case 'password':
            formErrors.password = checkPassword(value) && value.length ? '' : 'Doit contenir au moins 8 charactères avec une majuscule, un chiffre et un charactère spécial suivant !@#$%^&*'
            this.setState({ formErrors, [name]: value });
            break;
         case 'pass_confirm':
            formErrors.pass_confirm = checkPasswordConfirm(password, value) && value.length ? '' : 'Le mot de passe et sa confirmation ne sont pas identique !'
            this.setState({ formErrors, [name]: value });
            break;
         default:
            break;
      }
      this.setState({ [name]: value });
   }

   closeModal = () => this.setState({ isModalOpen: false });
   openModal = () => this.setState({ isModalOpen: true });

   render() {
      const { changePasswordClose } = this.props
      const { isModalOpen, isLoading, formErrors, password_current, password, pass_confirm } = this.state;
      return (
         <>
            <ReturnIcon onClick={changePasswordClose} />
            <form className="user--password--change" autoComplete="off">
               <ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Mot de passe" footerClose>
                  Votre mot de passe a été changé !
               </ModalPopUp>
               {isLoading && <LoadingSpinner asOverlay />}
               <div className="password--change--introduction">Veuillez entrer ces informations...</div>
               <FormInput type="password" name="password_current" label="Mot de passe actuel*" value={password_current} onChange={this.handleChange} required />
               {formErrors.password_current.length > 0 && password_current.length > 3 && <FormErrorMessage>{formErrors.password_current}</FormErrorMessage>}
               <FormInput type="password" name="password" label="Nouveau mot de passe*" value={password} onChange={this.handleChange} required />
               {formErrors.password.length > 0 && password.length > 3 && <FormErrorMessage>{formErrors.password}</FormErrorMessage>}
               <FormInput type="password" name="pass_confirm" label="Confirmer le mot de passe*" value={pass_confirm} onChange={this.handleChange} required />
               {formErrors.pass_confirm.length > 0 && pass_confirm.length > 3 && <FormErrorMessage>{formErrors.pass_confirm}</FormErrorMessage>}
               <FormCancelValidButtons submitForm={this.handleSubmit} submitText="Changer" />
            </form>
         </>
      )
   }
}

const mapStateToProps = ({ auth }) => ({
   accessToken: auth.accessToken,
   updateMyPasswordError: auth.updateMyPasswordError
});
const mapDispatchToProps = dispatch => ({
   updateMyPasswordAsync: (userData) => dispatch(updateMyPasswordAsync(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPasswordChange);