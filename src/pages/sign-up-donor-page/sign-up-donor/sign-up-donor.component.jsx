import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../../../components/form/form-input/form-input.component';
import CustomButton from '../../../components/button/custom-button/custom-button.component';
import FormOptionsSelect from '../../../components/form/form-select/form-select.component';
import FormErrorMessage from '../../../components/form/form-error-message/form-error-message.component';
import { checkEmail, checkPassword, checkPasswordConfirm, formIsValid } from '../../../utils/formContollers';
import ModalPopUp from '../../../components/modal/modal-popup/modal-popup.component';
import ModalErrorPopUp from '../../../components/modal/modal-error-popup.component';
import ModalWarningPopUp from './../../../components/modal/modal-warning-popup.component';
import { scrollToTop } from '../../../utils/scrollToTop';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.component';
import { userSignUpAsync } from '../../../redux/auth/auth-action-functions';

import './sign-up-donor.styles.scss';

class SignUpDonor extends React.Component {
   constructor() {
      super();

      this.state = {
         gender: '',
         family_name: '',
         first_name: '',
         email: '',
         password: '',
         pass_confirm: '',
         address: '',
         country: '',
         firm: '',
         genderOptions: ['Monsieur', 'Madame'],
         formErrors: {
            email: '',
            password: '',
            pass_confirm: ''
         },
         isModalOpen: false,
         isLoading: false,
         error: '',
         warning: ''
      }
   }

   handleSubmit = async e => {
      e.preventDefault();
      if (formIsValid(this.state.formErrors)) {
         const { gender, family_name, first_name, email, password, pass_confirm, address, country, firm } = this.state;
         const userInfos = { gender, family_name, first_name, email, password, pass_confirm, address, country, firm };
         const { userSignUpAsync } = this.props;
         try {
            await userSignUpAsync(['donors', userInfos]);
            if (this.props.signUpError) throw new Error(this.props.signUpError);

            this.setState({ isLoading: false });
            scrollToTop();
            this.openModal();
            this.setState({ gender: '', family_name: '', first_name: '', email: '', password: '', pass_confirm: '', address: '', country: '', firm: '' });
         } catch (err) {
            scrollToTop();
            if (this.props.signUpError.startsWith('Un utilisateur avec ce courriel existe déjà')) {
               this.setState({ isLoading: false, warning: this.props.signUpError || 'Une erreur est survenue, votre demande n\'a pas été envoyée. Veuillez essayer plus tard.' });
            } else {
               this.setState({ isLoading: false, error: this.props.signUpError || 'Une erreur est survenue, votre demande n\'a pas été envoyée. Veuillez essayer plus tard.' });
            }
         }
      }
   }

   handleChange = e => {
      const { value, name } = e.target;
      const { password, formErrors } = this.state;
      switch (name) {
         case 'email':
            formErrors.email = checkEmail(value) && value.length ? '' : `Le courriel n'a pas encore une forme correcte !`
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
   errorHandler = () => this.setState({ error: '', warning: '' });

   render() {
      const { isModalOpen, formErrors, isLoading, error, warning, gender, family_name, first_name, email, password, pass_confirm, address, country, firm } = this.state;
      return (
         <div className="sign-up col-xl-7 col-lg-8 col-md-10 col-sm-10 col-12 mb-3">
            <ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Compte crée" footerClose>
               Vous êtes inscrit en tant que donateur. Vous pouvez désormais faire des dons dans votre espace personnel !
            </ModalPopUp>
            <ModalErrorPopUp errorMsg={error} closeModal={this.errorHandler} />
            <ModalWarningPopUp title="Courriel utilisé" errorMsg={warning} closeModal={this.errorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            <h2 className="sign-up-title">Je soutiens l'AFVP</h2>
            <p>Veuillez créer un compte pour faire un don à l'association. Nous aurons besoin de ces informations pour vous remettre un justificatif fiscal.</p>
            <p className="sign-up-connect-account">Je suis déjà donateur, <a href="/login">je me connecte</a> à mon compte.</p>
            <form onSubmit={this.handleSubmit} autoComplete="off">
               <FormOptionsSelect name="gender" label="Civilité *" value={gender} options={this.state.genderOptions} placeholder='' required onChange={this.handleChange} />
               <FormInput type="text" name="family_name" label="Nom *" value={family_name} required onChange={this.handleChange} />
               <FormInput type="text" name="first_name" label="Prénom *" value={first_name} required onChange={this.handleChange} />
               <FormInput type="email" name="email" label="Courriel *" value={email} required onChange={this.handleChange} />
               {formErrors.email.length > 0 && email.length > 3 && (<FormErrorMessage >{formErrors.email}</FormErrorMessage>)}
               <FormInput type="password" name="password" label="Mot de passe *" value={password} required onChange={this.handleChange} />
               {formErrors.password.length > 0 && password.length > 3 && (<FormErrorMessage >{formErrors.password}</FormErrorMessage>)}
               <FormInput type="password" name="pass_confirm" label="Confirmer le mot de passe *" value={pass_confirm} required onChange={this.handleChange} />
               {formErrors.pass_confirm.length > 0 && pass_confirm.length > 3 && (<FormErrorMessage >{formErrors.pass_confirm}</FormErrorMessage>)}
               <FormInput type="text" name="address" label="Adresse *" value={address} required onChange={this.handleChange} />
               <FormInput type="text" name="country" label="Pays *" value={country} required onChange={this.handleChange} />
               <FormInput type="text" name="firm" label="Entreprise" value={firm} onChange={this.handleChange} />
               <CustomButton type="submit" className="custom-button--positive--duck">Créer</CustomButton>
            </form>
         </div>
      )
   }
}

const mapStateToProps = ({ auth }) => ({
   signUpError: auth.signUpError
});
const mapDispatchToProps = dispatch => ({
   userSignUpAsync: (userData) => dispatch(userSignUpAsync(userData))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUpDonor);
