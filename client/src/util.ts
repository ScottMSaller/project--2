import { jwtDecode } from 'jwt-decode';

const user = JSON.parse(localStorage.getItem('user') || '{}');

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken: any = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now(); // Convert exp to milliseconds
    return !isExpired; // Returns true if the token is valid and not expired
};

const message = (): React.ReactNode => {
  if (isLoggedIn()) {
      return `logged in as ${user.username}`;
  } else {
      return '';
  }
};



export {message as message, isLoggedIn as isLoggedIn, user as user};