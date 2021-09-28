import React from "react";
import { connect } from 'react-redux';
import Masonry from 'react-masonry-css';

import './user-profile.styles.scss';

import PencilEditIcon from './../../../components/button/pencil-edit-icon/pencil-edit-icon.component';
import ReturnIcon from './../../../components/button/return-icon/return-icon.component';
import { updateUserProfileAsync } from './../../../redux/user/user-action-functions';
import FormInput from './../../../components/form/form-input/form-input.component';
import FormTextArea from './../../../components/form/form-textarea/form-text-area.component';
// import FormButtons from './form-buttons/form-buttons.component';
import FormCancelValidButtons from './../../../components/form/form-cancel-valid-buttons/form-cancel-valid-buttons.component';
import ProfileImage from './profile-image/profile-image.component';

const INITIAL_STATE = {
   firstNameState: '',
   familyNameState: '',
   specialityState: '',
   titleState: '',
   emailState: '',
   address01State: '',
   address02State: '',
   address03State: '',
   countryState: '',
   biographyState: '',
   hobbyState: '',
   imageFormOpen: false,
   nameFormOpen: false,
   emailFormOpen: false,
   specialityFormOpen: false,
   bioFormOpen: false,
}

const masonryColumnBreakpoints = {
   default: 2,
   800: 1
};

class UserProfile extends React.Component {
   constructor(props) {
      super(props);

      this.state = INITIAL_STATE;
   }

   mapUserInfosToState = ({ first_name, family_name, email, address01, address02, address03, country, title, speciality, biography, hobby }) => {
      this.setState({
         firstNameState: first_name ? first_name : '',
         familyNameState: family_name ? family_name : '',
         emailState: email ? email : '',
         address01State: address01 ? address01 : '',
         address02State: address02 ? address02 : '',
         address03State: address03 ? address03 : '',
         countryState: country ? country : '',
         titleState: title ? title : '',
         specialityState: speciality ? speciality : '',
         biographyState: biography ? biography : '',
         hobbyState: hobby ? hobby : '',
      });
   }

   handleFormChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   };

   handleFormSubmit = async (e, userInfos) => {
      e.preventDefault();
      const { accessToken, updateUserProfileAsync } = this.props

      await updateUserProfileAsync([accessToken, userInfos]);
      this.handleNameFormClose();
      this.handleSpecialityFormClose();
      this.handleEmailFormClose();
      this.handleBioFormClose();
   };

   handleNameFormOpen = () => {
      this.setState({ nameFormOpen: true });
      this.mapUserInfosToState(this.props.userProfile);
   };

   handleNameFormClose = () => {
      this.setState({ nameFormOpen: false });
      this.mapUserInfosToState(INITIAL_STATE);
   };

   handleNameFormSubmit = async e => {
      const userInfos = {
         family_name: this.state.familyNameState,
         first_name: this.state.firstNameState
      }
      await this.handleFormSubmit(e, userInfos);
   };

   handleSpecialityFormOpen = () => {
      this.setState({ specialityFormOpen: true });
      this.mapUserInfosToState(this.props.userProfile);
   };

   handleSpecialityFormClose = () => {
      this.setState({ specialityFormOpen: false });
      this.mapUserInfosToState(INITIAL_STATE);
   };

   handleSpecialityFormSubmit = async e => {
      const userInfos = {
         speciality: this.state.specialityState,
         title: this.state.titleState
      }
      await this.handleFormSubmit(e, userInfos);
   };

   handleEmailFormOpen = () => {
      this.setState({ emailFormOpen: true });
      this.mapUserInfosToState(this.props.userProfile);
   };

   handleEmailFormClose = () => {
      this.setState({ emailFormOpen: false });
      this.mapUserInfosToState(INITIAL_STATE);
   };

   handleEmailFormSubmit = async e => {
      const userInfos = {
         email: this.state.emailState,
         address01: this.state.address01State,
         address02: this.state.address02State,
         address03: this.state.address03State,
         country: this.state.countryState
      }
      await this.handleFormSubmit(e, userInfos);
   };

   handleBioFormOpen = () => {
      this.setState({ bioFormOpen: true });
      this.mapUserInfosToState(this.props.userProfile);
   };

   handleBioFormClose = () => {
      this.setState({ bioFormOpen: false });
      this.mapUserInfosToState(INITIAL_STATE);
   };

   handleBioFormSubmit = async e => {
      const userInfos = {
         biography: this.state.biographyState,
         hobby: this.state.hobbyState
      }
      await this.handleFormSubmit(e, userInfos);
   };

   renderArrayProfile = () => {
      const { userProfile: { first_name, family_name, speciality, title, email, address01, address02, address03, country, biography, hobby } } = this.props;
      const {
         nameFormOpen,
         familyNameState,
         firstNameState,
         specialityFormOpen,
         specialityState,
         titleState,
         emailFormOpen,
         emailState,
         address01State,
         address02State,
         address03State,
         countryState,
         bioFormOpen,
         biographyState,
         hobbyState
      } = this.state;
      const ArrayProfile = [];
      ArrayProfile.push(
         <div className="profile--group profile--photo-name" key="profile--photo-name">
            <div className="section section--photo">
               <ProfileImage />
            </div>
            <div className="section section--name">
               {nameFormOpen
                  ? <form autoComplete="off">
                     <FormInput type="text" name="familyNameState" label="Nom*" value={familyNameState} required onChange={this.handleFormChange} />
                     <FormInput type="text" name="firstNameState" label="Prénom*" value={firstNameState} required onChange={this.handleFormChange} />
                     {/* <FormButtons formClose={this.handleNameFormClose} formSubmit={this.handleNameFormSubmit} /> */}
                     <FormCancelValidButtons closeForm={this.handleNameFormClose} closeText="Annuler" submitText="Modifier" submitForm={this.handleNameFormSubmit} />
                  </form>
                  : <>
                     <span>{first_name} {family_name}</span>
                     <PencilEditIcon onClick={this.handleNameFormOpen} />
                  </>
               }
            </div>
         </div>
      );
      ArrayProfile.push(
         <div className="profile--group profile--specialty-title" key="profile--specialty-title">
            {specialityFormOpen
               ? <form autoComplete="off">
                  <FormInput type="text" name="specialityState" label="Spécialité" value={specialityState} required onChange={this.handleFormChange} />
                  <FormInput type="text" name="titleState" label="Titre" value={titleState} required onChange={this.handleFormChange} />
                  {/* <FormButtons formClose={this.handleSpecialityFormClose} formSubmit={this.handleSpecialityFormSubmit} /> */}
                  <FormCancelValidButtons closeForm={this.handleSpecialityFormClose} closeText="Annuler" submitText="Modifier" submitForm={this.handleSpecialityFormSubmit} />
               </form>
               : <>
                  <PencilEditIcon onClick={this.handleSpecialityFormOpen} />
                  <div className="section section--specialty">
                     <div className="section--label">Spécialité</div>
                     <div className="section--data">{speciality}</div>
                  </div>
                  <div className="section section--title">
                     <div className="section--label">Titre</div>
                     <div className="section--data">{title}</div>
                  </div>
               </>
            }
         </div>
      );
      ArrayProfile.push(
         <div className="profile--group profile--email-address" key="profile--email-address">
            {emailFormOpen
               ? <form autoComplete="off">
                  <FormInput type="text" name="emailState" label="Courriel" value={emailState} required onChange={this.handleFormChange} />
                  <FormInput type="text" name="address01State" label="Adresse 01" value={address01State} required onChange={this.handleFormChange} />
                  <FormInput type="text" name="address02State" label="Adresse 02" value={address02State} required onChange={this.handleFormChange} />
                  <FormInput type="text" name="address03State" label="Adresse 03" value={address03State} required onChange={this.handleFormChange} />
                  <FormInput type="text" name="countryState" label="Pays" value={countryState} required onChange={this.handleFormChange} />
                  {/* <FormButtons formClose={this.handleEmailFormClose} formSubmit={this.handleEmailFormSubmit} /> */}
                  <FormCancelValidButtons closeForm={this.handleEmailFormClose} closeText="Annuler" submitText="Modifier" submitForm={this.handleEmailFormSubmit} />
               </form>
               : <>
                  <PencilEditIcon onClick={this.handleEmailFormOpen} />
                  <div className="section section--email">
                     <div className="section--label">Courriel</div>
                     <div className="section--data">{email}</div>
                  </div>
                  <div className="section section--address">
                     <div className="section--label">Adresse</div>
                     <div className="section--data address01">{address01}</div>
                     <div className="section--data address02">{address02}</div>
                     <div className="section--data address03">{address03}</div>
                  </div>
                  <div className="section section--country">
                     <div className="section--label">Pays</div>
                     <div className="section--data">{country}</div>
                  </div>
               </>
            }
         </div>
      );
      ArrayProfile.push(
         <div className="profile--group profile--biography-hobby" key="profile--biography-hobby">
            {bioFormOpen
               ? <form autoComplete="off">
                  <FormTextArea type="text" name="biographyState" label="Biographie" value={biographyState} required onChange={this.handleFormChange} />
                  <FormTextArea type="text" name="hobbyState" label="Hobby" value={hobbyState} required onChange={this.handleFormChange} />
                  {/* <FormButtons formClose={this.handleBioFormClose} formSubmit={this.handleBioFormSubmit} /> */}
                  <FormCancelValidButtons closeForm={this.handleBioFormClose} closeText="Annuler" submitText="Modifier" submitForm={this.handleBioFormSubmit} />
               </form>
               : <>
                  <PencilEditIcon onClick={this.handleBioFormOpen} />
                  <div className="section section--biography">
                     <div className="section--label">Biographie</div>
                     <div className="section--data">{biography}</div>
                  </div>
                  <div className="section section--hobby">
                     <div className="section--label">Hobby</div>
                     <div className="section--data">{hobby}</div>
                  </div>
               </>
            }
         </div>
      );
      return ArrayProfile;
   }

   render() {
      const { userProfileClose } = this.props;
      return (
         <div className="profile--user">
            <ReturnIcon onClick={userProfileClose} />
            <Masonry
               breakpointCols={masonryColumnBreakpoints}
               className="masonry-grid"
               columnClassName="masonry-grid_column"
            >
               {this.renderArrayProfile()}
            </Masonry>
         </div>
      )
   }
}

const mapStateToProps = ({ auth }) => ({
   accessToken: auth.accessToken,
});
const mapDispatchToProps = dispatch => ({
   updateUserProfileAsync: userData => dispatch(updateUserProfileAsync(userData))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
