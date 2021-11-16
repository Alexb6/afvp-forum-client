import { AuthActionTypes } from './auth-types';
import dayjs from 'dayjs';

const INITIAL_STATE = {
   accessToken: null,
   accessTokenRefreshInterval: null,
   isAuthenticated: false,
   refreshTokenLoading: false,
   loginError: null,
   signUpError: null,
   updateMyPasswordError: null,
   forgotPasswordError: null,
   resetPasswordError: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case AuthActionTypes.USER_SIGNUP_START:
         return {
            ...state
         }
      case AuthActionTypes.USER_SIGNUP_FAILURE:
         return {
            ...state,
            signUpError: action.payload.errorMessage
         }
      case AuthActionTypes.USER_SIGNUP_SUCCESS:
         return {
            ...INITIAL_STATE
         }
      case AuthActionTypes.USER_LOGIN_START:
         if (localStorage.userLoggedOut) delete localStorage.userLoggedOut;
         return {
            ...state
         }
      case AuthActionTypes.USER_LOGIN_FAILURE:
         return {
            ...state,
            loginError: action.payload.errorMessage
         }
      case AuthActionTypes.USER_LOGIN_SUCCESS:
         return {
            ...state,
            accessToken: action.payload.accessToken,
            accessTokenRefreshInterval: action.payload.accessTokenRefreshInterval,
            isAuthenticated: true,
            refreshTokenLoading: false
         }
      case AuthActionTypes.USER_LOGOUT:
         localStorage.setItem('userLoggedOut', dayjs(new Date()).format());
         return {
            ...INITIAL_STATE
         }
      case AuthActionTypes.REFRESH_TOKEN_START:
         const { silentAuth } = action.payload
         return silentAuth
            ? { ...state, refreshTokenLoading: true }
            : { ...INITIAL_STATE, refreshTokenLoading: true }
      case AuthActionTypes.REFRESH_TOKEN_END:
         return {
            ...state,
            refreshTokenLoading: false
         }
      case AuthActionTypes.UPDATE_PASSWORD_START:
         return {
            ...state
         }
      case AuthActionTypes.UPDATE_PASSWORD_FAILURE:
         return {
            ...state,
            updateMyPasswordError: action.payload.errorMessage
         }
      case AuthActionTypes.UPDATE_PASSWORD_SUCCESS:
         return {
            ...state,
            accessToken: action.payload.accessToken,
            accessTokenRefreshInterval: action.payload.accessTokenRefreshInterval,
            isAuthenticated: true,
            refreshTokenLoading: false
         }
      case AuthActionTypes.FORGOT_PASSWORD_START:
         return {
            ...state
         }
      case AuthActionTypes.FORGOT_PASSWORD_FAILURE:
         return {
            ...state,
            forgotPasswordError: action.payload.errorMessage
         }
      case AuthActionTypes.FORGOT_PASSWORD_SUCCESS:
         return {
            ...state,
         }
      case AuthActionTypes.RESET_PASSWORD_START:
         return {
            ...state
         }
      case AuthActionTypes.RESET_PASSWORD_FAILURE:
         return {
            ...state,
            resetPasswordError: action.payload.errorMessage
         }
      case AuthActionTypes.RESET_PASSWORD_SUCCESS:
         return {
            ...state,
         }
      default:
         return state;
   }
}

export default authReducer;
