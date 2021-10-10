import { UserActionTypes } from './user-types';

const INITITIAL_STATE = {
   currentUser: null,
   userProfile: null,
   userProfileError: null,
   emailVerified: false,
   emailVerifiedError: null
}

const userReducer = (state = INITITIAL_STATE, action) => {
   switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload
         }
      case UserActionTypes.CLEAR_CURRENT_USER:
         return {
            ...INITITIAL_STATE
         }
      case UserActionTypes.GET_USER_PROFILE_START:
         return {
            ...state
         }
      case UserActionTypes.GET_USER_PROFILE_SUCCESS:
         return {
            ...state,
            userProfile: action.payload
         }
      case UserActionTypes.GET_USER_PROFILE_FAILURE:
         return {
            ...state,
            userProfileError: action.payload.errorMessage
         }
      case UserActionTypes.UPDATE_USER_PROFILE_START:
         return {
            ...state
         }
      case UserActionTypes.UPDATE_USER_PROFILE_SUCCESS:
         return {
            ...state,
            userProfile: action.payload
         }
      case UserActionTypes.UPDATE_USER_PROFILE_IMAGE_SUCCESS:
         return {
            ...state,
            userProfile: action.payload
         }
      case UserActionTypes.UPDATE_USER_PROFILE_FAILURE:
         return {
            ...state,
            userProfileError: action.payload.errorMessage
         }
      case UserActionTypes.UPDATE_CURRENT_USER_FROM_PROFILE:
         const { id, email, family_name, first_name, photo_url } = action.payload
         return {
            ...state,
            currentUser: { id, email, family_name, first_name, photo_url }
         }
      case UserActionTypes.VERIFY_EMAIL_START:
         return {
            ...state
         }
      case UserActionTypes.VERIFY_EMAIL_SUCCESS:
         return {
            ...state,
            emailVerified: action.payload
         }
      case UserActionTypes.VERIFY_EMAIL_FAILURE:
         return {
            ...state,
            emailVerifiedError: action.payload.errorMessage
         }
      default:
         return state;
   }
};

export default userReducer;
