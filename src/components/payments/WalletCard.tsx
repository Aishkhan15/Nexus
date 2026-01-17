import { Wallet } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';

interface Props {
    balance: number;
}

export const WalletCard: React.FC<Props> = ({ balance }) => (
    <Card>
        <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-primary-50 rounded-xl">
                <Wallet className="text-primary-600" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Wallet Balance</p>
                <h2 className="text-2xl font-bold text-gray-900">
                    ${balance.toLocaleString()}
                </h2>
            </div>
        </CardBody>
    </Card>
);
