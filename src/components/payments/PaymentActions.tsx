import { ArrowDownLeft, ArrowUpRight, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserRole } from '../../types';

interface Props {
    role: UserRole;
}

export const PaymentActions: React.FC<Props> = ({ role }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" >
        {/* Common actions */}
        <Button leftIcon={<ArrowDownLeft size={16} />}>
            Deposit
        </Button>

        <Button variant="outline" leftIcon={<ArrowUpRight size={16} />}>
            Withdraw
        </Button>

        {/* Investor only */}
        {role === 'investor' && (
            <Button
                variant="accent"
                className="md:col-span-2"
                leftIcon={<Send size={16} />}
            >
                Fund a Deal
            </Button>
        )}
    </div>
);
