import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
    user,
    redirectPath = '/login',
    children,
}) {
    if(user.authenticated === false) return <Navigate to={redirectPath} replace />;
    return children;
};