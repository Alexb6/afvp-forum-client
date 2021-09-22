import {
   getUserProfileStart,
   getUserProfileSuccess,
   getUserProfileFailure,
   updateUserProfileStart,
   updateUserProfileSuccess,
   updateUserProfileImageSuccess,
   updateUserProfileFailure,
   updateCurrentUserFromProfile
} from './user-action';
import { getUserProfileService, updateUserProfileService, updateUserProfileImageService } from './../../services/user';

export const getUserProfileAsync = (accessToken) => async dispatch => {
   dispatch(getUserProfileStart());

   const result = await getUserProfileService(accessToken);

   if (!result) {
      dispatch(getUserProfileFailure());
      return;
   } else {
      if (result.error) {
         dispatch(getUserProfileFailure(result.errorMessage));
         return;
      } else {
         dispatch(getUserProfileSuccess(result.data.user));
      }
   }
}

export const updateUserProfileAsync = (userData) => async dispatch => {
   dispatch(updateUserProfileStart());
   // userData is like so: [accessToken = String, userInfos = Object]
   const result = await updateUserProfileService(...userData);

   if (!result) {
      dispatch(updateUserProfileFailure());
      return;
   } else {
      if (result.error) {
         dispatch(updateUserProfileFailure(result.errorMessage));
         return;
      } else {
         dispatch(updateUserProfileSuccess(result.data.user));
         dispatch(updateCurrentUserFromProfile(result.data.user))
      }
   }
}

export const updateUserProfileImageAsync = (userData) => async dispatch => {
   dispatch(updateUserProfileStart());
   // userData is like so: [accessToken = String, imageObj = Object]
   const result = await updateUserProfileImageService(...userData);

   if (!result) {
      dispatch(updateUserProfileFailure());
      return;
   } else {
      if (result.error) {
         dispatch(updateUserProfileFailure(result.errorMessage));
         return;
      } else {
         dispatch(updateUserProfileImageSuccess(result.data.user));
         dispatch(updateCurrentUserFromProfile(result.data.user))
      }
   }
}
