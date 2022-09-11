import { AuthActionTypes } from "./auth-types";

export const userSignUpStart = () => ({
  type: AuthActionTypes.USER_SIGNUP_START,
});

export const userSignUpFailure = (
  errorMessage = `Mous n'avons réussi à vous inscrire. Veuillez réessayer plus tard.`
) => ({
  type: AuthActionTypes.USER_SIGNUP_FAILURE,
  payload: { errorMessage },
});

export const userSignUpSuccess = () => ({
  type: AuthActionTypes.USER_SIGNUP_SUCCESS,
});

export const userLoginStart = () => ({
  type: AuthActionTypes.USER_LOGIN_START,
});

export const userLoginFailure = (
  errorMessage = `Un problème est survenu lors de la connexion. Veuillez réessayer plus tard.`
) => ({
  type: AuthActionTypes.USER_LOGIN_FAILURE,
  payload: { errorMessage },
});

export const userLoginSuccess = (token) => ({
  type: AuthActionTypes.USER_LOGIN_SUCCESS,
  payload: token,
});

export const userLogout = () => ({
  type: AuthActionTypes.USER_LOGOUT,
});

export const refreshTokenStart = (silentAuth = false) => ({
  type: AuthActionTypes.REFRESH_TOKEN_START,
  payload: { silentAuth },
});

export const refreshTokenAbsent = () => ({
  type: AuthActionTypes.REFRESH_TOKEN_ABSENT,
});

export const refreshTokenEnd = () => ({
  type: AuthActionTypes.REFRESH_TOKEN_END,
});

export const updatePasswordStart = () => ({
  type: AuthActionTypes.UPDATE_PASSWORD_START,
});

export const updatePasswordFailure = (
  errorMessage = `Un problème est survenu lors de l'enregistrement du mot de passe. Veuillez réessayer plus tard.`
) => ({
  type: AuthActionTypes.UPDATE_PASSWORD_FAILURE,
  payload: { errorMessage },
});

export const updatePasswordSuccess = (token) => ({
  type: AuthActionTypes.UPDATE_PASSWORD_SUCCESS,
  payload: token,
});

export const forgotPasswordStart = () => ({
  type: AuthActionTypes.FORGOT_PASSWORD_START,
});

export const forgotPasswordFailure = (
  errorMessage = `Un problème est survenu lors de l'envoi du lien de rénitialisation. Veuillez réessayer plus tard.`
) => ({
  type: AuthActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: { errorMessage },
});

export const forgotPasswordSuccess = (message) => ({
  type: AuthActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: message,
});

export const resetPasswordStart = () => ({
  type: AuthActionTypes.RESET_PASSWORD_START,
});

export const resetPasswordFailure = (
  errorMessage = `Un problème est survenu lors de l'envoi du mot de passe. Veuillez réessayer plus tard.`
) => ({
  type: AuthActionTypes.RESET_PASSWORD_FAILURE,
  payload: { errorMessage },
});

export const resetPasswordSuccess = (message) => ({
  type: AuthActionTypes.RESET_PASSWORD_SUCCESS,
  payload: message,
});
