export type CallType = 'video' | 'audio';
export type CallStatus = 'incoming' | 'outgoing' | 'missed';

export interface RecentCall {
    id: string;
    name: string;
    type: CallType;
    status: CallStatus;
    duration?: string; // e.g., "02:15"
    time: string;      // e.g., "10:30 AM"
}
