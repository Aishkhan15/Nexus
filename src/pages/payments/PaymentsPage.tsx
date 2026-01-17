import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { WalletCard } from '../../components/payments/WalletCard';
import { PaymentActions } from '../../components/payments/PaymentActions';
import { TransactionTable, Transaction } from '../../components/payments/TransactionTable';
import { UserRole } from '../../types';

interface Props {
    role: UserRole;
}

const mockTransactions: Transaction[] = [
    {
        id: 1,
        type: 'Transfer',
        amount: 2000,
        sender: 'Investor',
        receiver: 'Startup ABC',
        status: 'Completed',
        date: '2024-03-03',
    },
];

export const PaymentsPage: React.FC<Props> = ({ role }) => {
    const [balance] = useState(role === 'investor' ? 3500 : 1200);

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900">
                Payments & Wallet
            </h1>

            <WalletCard balance={balance} />

            <PaymentActions role={role} />

            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">
                        Transaction History
                    </h2>
                </CardHeader>
                <CardBody>
                    <TransactionTable transactions={mockTransactions} />
                </CardBody>
            </Card>
        </div>
    );
};
