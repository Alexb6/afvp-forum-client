export const headers = new Headers();
headers.set('Content-Type', 'application/json');

export const getCookieValue = cookieName => {
   if (document.cookie) {
      return document.cookie
         .split('; ')
         .find(el => el.startsWith(`${cookieName}=`))
         .split('=')[1];
   }
   return
}

export const setTokenAuthHeader = token => {
   if (token) {
      headers.set('Authorization', `Bearer ${token}`)
   }
}

export const setXsrfHeader = xsrfToken => {
   if (xsrfToken) {
      headers.set('xsrfToken', xsrfToken)
   }
}