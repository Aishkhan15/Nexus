import { Badge } from '../ui/Badge';

export interface Transaction {
    id: number;
    type: string;
    amount: number;
    sender: string;
    receiver: string;
    status: 'Pending' | 'Completed' | 'Failed';
    date: string;
}

const statusVariant = (status: string) =>
    status === 'Completed'
        ? 'success'
        : status === 'Pending'
            ? 'warning'
            : 'error';

interface Props {
    transactions: Transaction[];
}

export const TransactionTable: React.FC<Props> = ({ transactions }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm">
            <thead>
                <tr className="text-left text-gray-500 border-b">
                    <th className="py-3">Type</th>
                    <th>Amount</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="py-3 font-medium">{tx.type}</td>
                        <td>${tx.amount}</td>
                        <td>{tx.sender}</td>
                        <td>{tx.receiver}</td>
                        <td>
                            <Badge variant={statusVariant(tx.status)}>
                                {tx.status}
                            </Badge>
                        </td>
                        <td>{tx.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
