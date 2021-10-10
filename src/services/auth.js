import API_URL from '../assets-src/data/API-Url';
import { headers, getCookieValue, setTokenAuthHeader, setXsrfHeader } from './_service-functions';

export const signUpUserService = async (userResource, userInfos) => {
   try {
      const response = await fetch(`${API_URL}/${userResource}/signup`, {
         method: 'POST',
         credentials: 'include',
         mode: 'cors',
         headers,
         body: JSON.stringify(userInfos)
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

export const loginUserService = async (userResource, email, password) => {
   try {
      const response = await fetch(`${API_URL}/${userResource}/login`, {
         method: 'POST',
         credentials: 'include',
         mode: 'cors',
         headers,
         body: JSON.stringify({ email, password })
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

export const logoutUserService = async (accessToken) => {
   try {
      const userResource = getCookieValue('userResource');
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken && userResource) {
         setXsrfHeader(xsrfToken);
         setTokenAuthHeader(accessToken);
         await fetch(`${API_URL}/${userResource}/logout`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers
         });
      }
      return;
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}

export const refreshAccessTokenService = async () => {
   try {
      const userResource = getCookieValue('userResource');
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken && userResource) {
         setXsrfHeader(xsrfToken);
         const response = await fetch(`${API_URL}/${userResource}/refresh-token`, {
            method: 'POST',
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
      return;
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}

export const updateMyPasswordSercice = async (accessToken, userInfos) => {
   try {
      const userResource = getCookieValue('userResource');
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken && userResource) {
         setXsrfHeader(xsrfToken);
         setTokenAuthHeader(accessToken);
         const response = await fetch(`${API_URL}/${userResource}/update-my-password`, {
            method: 'PATCH',
            credentials: 'include',
            mode: 'cors',
            headers,
            body: JSON.stringify(userInfos)
         });
         const parseResponse = await response.json();
         if (!response.ok) {
            throw new Error(parseResponse.message)
         }
         return parseResponse;
      }
      return;
   } catch (err) {
      return {
         error: true,
         errorMessage: err.message
      }
   }
}
