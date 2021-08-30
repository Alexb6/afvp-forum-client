const API_URL = `${process.env.REACT_APP_SERVER_ORIGIN}/api/v1`;
const headers = new Headers();
headers.append('Content-Type', 'application/json');

const getCookieValue = cookieName => {
   if (document.cookie) {
      return document.cookie
         .split('; ')
         .find(el => el.startsWith(`${cookieName}=`))
         .split('=')[1];
   }
   return
}

const setTokenAuthHeader = token => {
   if (token) {
      headers.append('Authorization', `Bearer ${token}`)
   }
}

const setXsrfHeader = xsrfToken => {
   if (xsrfToken) {
      headers.append('xsrfToken', xsrfToken)
   }
}

exports.signUpUserService = async (userResource, userInfos) => {
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

exports.loginUserService = async (userResource, email, password) => {
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

exports.logoutUserService = async (accessToken) => {
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

exports.refreshAccessTokenService = async () => {
   try {
      const xsrfToken = getCookieValue('xsrfToken');
      if (xsrfToken) {
         const userResource = getCookieValue('userResource');
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
