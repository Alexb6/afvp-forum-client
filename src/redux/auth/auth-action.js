import { AuthActionTypes } from './auth-types';

export const userSignUpStart = () => ({
   type: AuthActionTypes.USER_SIGNUP_START
});

export const userSignUpFailure = (errorMessage = 'Mous n\'avons réussi à vous inscrire. Veuillez réessayer plus tard.') => ({
   type: AuthActionTypes.USER_SIGNUP_FAILURE,
   payload: { errorMessage }
});

export const userSignUpSuccess = () => ({
   type: AuthActionTypes.USER_SIGNUP_SUCCESS
});

export const userLoginStart = () => ({
   type: AuthActionTypes.USER_LOGIN_START
});

export const userLoginFailure = (errorMessage = 'Un problème est survenu lors de la connexion. Veuillez réessayer plus tard.') => ({
   type: AuthActionTypes.USER_LOGIN_FAILURE,
   payload: { errorMessage }
});

export const userLoginSuccess = token => ({
   type: AuthActionTypes.USER_LOGIN_SUCCESS,
   payload: token
});

export const userLogout = () => ({
   type: AuthActionTypes.USER_LOGOUT
});

export const refreshTokenStart = (silentAuth = false) => ({
   type: AuthActionTypes.REFRESH_TOKEN_START,
   payload: { silentAuth }
});

export const refreshTokenAbsent = () => ({
   type: AuthActionTypes.REFRESH_TOKEN_ABSENT
});

export const refreshTokenEnd = () => ({
   type: AuthActionTypes.REFRESH_TOKEN_END
});
