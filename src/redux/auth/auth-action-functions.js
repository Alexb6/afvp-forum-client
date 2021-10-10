import {
   userSignUpStart,
   userSignUpFailure,
   userSignUpSuccess,
   userLoginStart,
   userLoginFailure,
   userLoginSuccess,
   userLogout,
   refreshTokenStart,
   refreshTokenAbsent,
   refreshTokenEnd,
   updatePasswordStart,
   updatePasswordFailure,
   updatePasswordSuccess,
} from './auth-action';
import { setCurrentUser, clearCurrentUser } from '../user/user-action';
import {
   signUpUserService,
   loginUserService,
   logoutUserService,
   refreshAccessTokenService,
   updateMyPasswordSercice
} from '../../services/auth';

const deleteAllCookies = () => {
   const cookies = document.cookie.split(";");
   for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
   }
}

export const userSignUpAsync = (userData) => async dispatch => {
   dispatch(userSignUpStart());
   // userData is like so: [userResource = String, userInfos = Object]
   const result = await signUpUserService(...userData);

   if (!result) {
      dispatch(userSignUpFailure());
      return;
   } else {
      if (result.error) {
         dispatch(userSignUpFailure(result.errorMessage));
         return;
      } else {
         dispatch(userSignUpSuccess());
      }
   }
}

export const userLoginAsync = (userData) => async dispatch => {
   dispatch(userLoginStart());
   // userData is like so: [userResource = String, email = state, password = state]
   const result = await loginUserService(...userData);

   if (!result) {
      dispatch(userLoginFailure());
      return;
   } else {
      if (result.error) {
         dispatch(userLoginFailure(result.errorMessage));
         return;
      } else {
         dispatch(userLoginSuccess(result.data.token));
         dispatch(setCurrentUser(result.data.user));
      }

   }
}

export const userLogoutAsync = (accessToken) => async dispatch => {
   dispatch(userLogout());
   logoutUserService(accessToken);
   dispatch(clearCurrentUser())
}

export const getFreshAccessTokenAsync = (silentAuth = false) => async dispatch => {
   dispatch(refreshTokenStart(silentAuth));

   const result = await refreshAccessTokenService();

   if (!result) {
      dispatch(refreshTokenAbsent());
      dispatch(refreshTokenEnd());
   } else {
      if (result.error) {
         dispatch(refreshTokenEnd());
         if ([401, 403].includes(result.status)) {
            dispatch(userLogout());
         }
         return;
      }
      if (result.status === 204) {
         dispatch(refreshTokenEnd());
      } else {
         dispatch(userLoginSuccess(result.data.token));
         dispatch(setCurrentUser(result.data.user));
      }
   }
}

export const allTabsLogout = () => dispatch => {
   dispatch(userLogout());
   dispatch(clearCurrentUser());
   deleteAllCookies();
}

export const updateMyPasswordAsync = (userData) => async dispatch => {
   dispatch(updatePasswordStart());
   // userData is like so: [accessToken = String, userInfos = Object]
   const result = await updateMyPasswordSercice(...userData);

   if (!result) {
      dispatch(updatePasswordFailure());
      return;
   } else {
      if (result.error) {
         dispatch(updatePasswordFailure(result.errorMessage));
         return;
      } else {
         dispatch(updatePasswordSuccess(result.data.token));
         dispatch(setCurrentUser(result.data.user));
      }
   }
}
