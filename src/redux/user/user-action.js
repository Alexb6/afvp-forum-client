import { UserActionTypes } from "./user-types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = () => ({
  type: UserActionTypes.CLEAR_CURRENT_USER,
});

export const getUserProfileStart = () => ({
  type: UserActionTypes.GET_USER_PROFILE_START,
});

export const getUserProfileSuccess = (user) => ({
  type: UserActionTypes.GET_USER_PROFILE_SUCCESS,
  payload: user,
});

export const getUserProfileFailure = (
  errorMessage = "Un problème est survenu lors de la recherche de votre profil. Veuillez réessayer plus tard."
) => ({
  type: UserActionTypes.GET_USER_PROFILE_FAILURE,
  payload: { errorMessage },
});

export const updateUserProfileStart = () => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_START,
});

export const updateUserProfileSuccess = (user) => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: user,
});

export const updateUserProfileImageSuccess = (user) => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  payload: user,
});

export const updateUserProfileFailure = (
  errorMessage = "Un problème est survenu lors de la mise à jour de votre profil. Veuillez réessayer plus tard."
) => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
  payload: { errorMessage },
});

export const updateCurrentUserFromProfile = (user) => ({
  type: UserActionTypes.UPDATE_CURRENT_USER_FROM_PROFILE,
  payload: user,
});

export const verifyEmailStart = () => ({
  type: UserActionTypes.VERIFY_EMAIL_START,
});

export const verifyEmailSuccess = (user) => ({
  type: UserActionTypes.VERIFY_EMAIL_SUCCESS,
  payload: user.email_verified,
});

export const verifyEmailFailure = (
  errorMessage = "Un problème est survenu lors de la vérification du courriel. Veuillez réessayer plus tard."
) => ({
  type: UserActionTypes.VERIFY_EMAIL_FAILURE,
  payload: { errorMessage },
});
