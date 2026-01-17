import React from 'react';
import { useAuth } from '../../context/AuthContext'; // adjust path to your context
import { PaymentsPage } from './PaymentsPage';

export const PaymentsWrapper: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <p>Loading...</p>; // optional spinner
    if (!user) return <p>Please log in</p>; // redirect to login if needed

    return <PaymentsPage role={user.role} />;
};
