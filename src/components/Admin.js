import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const AdminRoute = ({ children }) => {
  const token = auth.currentUser;
  return token && token.role === 'admin' ? children : <Navigate to="/" />;
};

export default AdminRoute;