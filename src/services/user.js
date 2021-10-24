import API_URL from '../assets-src/data/API-Url';
import { headers, getCookieValue, setTokenAuthHeader, setXsrfHeader, findUserResource } from './_service-functions';

export const getUserProfileService = async (accessToken) => {
   try {
      const userResource = getCookieValue('userResource');
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken && userResource) {
         setXsrfHeader(xsrfToken);
         setTokenAuthHeader(accessToken);
         const response = await fetch(`${API_URL}/${userResource}/profile`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers
         });
         const parseResponse = await response.json();
         if (!response.ok) {
            throw new Error(parseResponse.message)
         }
         return parseResponse;
      }
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}

export const updateUserProfileService = async (accessToken, userInfos) => {
   try {
      const userResource = getCookieValue('userResource');
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken && userResource) {
         setXsrfHeader(xsrfToken);
         setTokenAuthHeader(accessToken);
         const response = await fetch(`${API_URL}/${userResource}/profile/update-profile`, {
            method: 'PATCH',
            credentials: 'include',
            mode: 'cors',
            headers,
            body: JSON.stringify(userInfos)
         });
         const parseResponse = await response.json();
         if (!response.ok) {
            throw new Error(parseResponse.message);
         }
         return parseResponse;
      }
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}

export const updateUserProfileImageService = async (accessToken, imageObj) => {
   try {
      const userResource = getCookieValue('userResource');
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken && userResource) {
         // blank headers for the form-data (file uploads)
         const headers = new Headers();
         if (accessToken && xsrfToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
            headers.set('xsrfToken', xsrfToken);
         }
         const response = await fetch(`${API_URL}/${userResource}/profile/update-profile`, {
            method: 'PATCH',
            credentials: 'include',
            mode: 'cors',
            headers,
            body: imageObj
         });
         const parseResponse = await response.json();
         if (!response.ok) {
            throw new Error(parseResponse.message);
         }
         return parseResponse;
      }
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}

export const verifyEmailService = async (token) => {
   const userResource = findUserResource(token);
   try {
      const response = await fetch(`${API_URL}/${userResource}/verify-email/${token}`, {
         method: 'PATCH',
         credentials: 'include',
         mode: 'cors',
      });
      const parseResponse = await response.json();
      if (!response.ok) {
         throw new Error(parseResponse.message)
      }
      return parseResponse;
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}
