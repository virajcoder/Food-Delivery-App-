import {Navigate} from 'react-router-dom';

export const Auth = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log('Token:', children);
    return token ? children : <Navigate to="/login" replace />;
  };