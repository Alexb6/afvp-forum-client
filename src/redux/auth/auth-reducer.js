import { AuthActionTypes } from './auth-types';
import moment from 'moment';

const INITIAL_STATE = {
   accessToken: null,
   accessTokenRefreshInterval: null,
   isAuthenticated: false,
   refreshTokenLoading: false,
   loginError: null,
   signUpError: null
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
            signUpError: action.payload.error
         }
      case AuthActionTypes.USER_SIGNUP_SUCCESS:
         return {
            ...INITIAL_STATE
         }
      case AuthActionTypes.USER_LOGIN_START:
         return {
            ...state
         }
      case AuthActionTypes.USER_LOGIN_FAILURE:
         return {
            ...state,
            loginError: action.payload.error
         }
      case AuthActionTypes.USER_LOGIN_SUCCESS:
         if (localStorage.userLoggedOut) delete localStorage.userLoggedOut;
         return {
            ...state,
            accessToken: action.payload.accessToken,
            accessTokenRefreshInterval: action.payload.accessTokenRefreshInterval,
            isAuthenticated: true,
            refreshTokenLoading: false
         }
      case AuthActionTypes.USER_LOGOUT:
         localStorage.setItem('userLoggedOut', moment(new Date()).format());
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
      default:
         return state;
   }
}

export default authReducer;
