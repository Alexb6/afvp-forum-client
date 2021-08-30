import { AuthActionTypes } from './auth-types';

export const userSignUpStart = () => ({
   type: AuthActionTypes.USER_SIGNUP_START
});

export const userSignUpFailure = (error = 'Un problème est survenu. Veuillez réessayer plus tard.') => ({
   type: AuthActionTypes.USER_SIGNUP_FAILURE,
   payload: { error }
});

export const userSignUpSuccess = () => ({
   type: AuthActionTypes.USER_SIGNUP_SUCCESS
});

export const userLoginStart = () => ({
   type: AuthActionTypes.USER_LOGIN_START
});

export const userLoginFailure = (error = 'Un problème est survenu. Veuillez réessayer plus tard.') => ({
   type: AuthActionTypes.USER_LOGIN_FAILURE,
   payload: { error }
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

// export const setAccessToken = token => ({
//    type: AuthActionTypes.SET_ACCESS_TOKEN,
//    payload: token
// });
