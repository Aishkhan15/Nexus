import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const RoleGuard = ({ role, children }: {
    role: UserRole;
    children: JSX.Element;
}) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (user.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default RoleGuard;
