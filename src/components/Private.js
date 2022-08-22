import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';


const Private = ({ children }) => {
  const token = auth.currentUser;
  return token && token.emailVerified === true ? children : <Navigate to="/login" />;
};

export default Private;