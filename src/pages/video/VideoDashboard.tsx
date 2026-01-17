import React, { useState } from 'react';
import StartCallCard from '../../components/videoCall/StartCallCard';
import RecentCallsCard from '../../components/videoCall/RecentCallsCard';
import VideoCallModal from '../../components/videoCall/VideoCallModal';
import { RecentCall } from '../../types/RecentCall';
import { Button } from '../../components/ui/Button';
import { Upload } from 'lucide-react';

const VideoDashboard: React.FC = () => {
    // Recent calls mock data
    const [recentCalls, setRecentCalls] = useState<RecentCall[]>([
        { id: '1', name: 'Ali', type: 'video', status: 'incoming', time: '10:30 AM', duration: '02:15' },
        { id: '2', name: 'Sara', type: 'audio', status: 'outgoing', time: '09:50 AM', duration: '05:20' },
        { id: '3', name: 'Ahmed', type: 'video', status: 'missed', time: 'Yesterday 5:00 PM' },
    ]);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [callType, setCallType] = useState<'video' | 'audio'>('video');
    const [currentContact, setCurrentContact] = useState<string>('');

    // Handle call from cards (RecentCallsCard or StartCallCard)
    const handleCall = (call: RecentCall, type: 'video' | 'audio') => {
        setCurrentContact(call.name);
        setCallType(type);
        setModalOpen(true);
    };

    return (
        <div className="flex flex-wrap gap-6 p-4 ">
            <div className='flex flex-row justify-between w-full'>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Call Section</h1>
                    <p className="text-gray-600">Manage your calls and recent interactions</p>
                </div>

            </div>
            <div className="w-[600px]">
                <StartCallCard
                    name="David Chen"
                    onVideoCall={() =>
                        handleCall(
                            { id: '0', name: 'David Chen', type: 'video', status: 'outgoing', time: 'Now' },
                            'video'
                        )
                    }
                    onAudioCall={() =>
                        handleCall(
                            { id: '0', name: 'David Chen', type: 'audio', status: 'outgoing', time: 'Now' },
                            'audio'
                        )
                    }
                />
            </div>

            <RecentCallsCard calls={recentCalls} onCallClick={handleCall} />

            <VideoCallModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                callType={callType}
                contactName={currentContact}
            />
        </div>


    );
};

export default VideoDashboard;
