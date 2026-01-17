import React, { useState, useRef, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    callType: 'video' | 'audio';
    contactName: string;
}

const VideoCallModal: React.FC<Props> = ({ isOpen, onClose, callType, contactName }) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isVideoOn, setVideoOn] = useState(true);
    const [isAudioOn, setAudioOn] = useState(true);

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const startStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: callType === 'video',
                    audio: true,
                });
                setLocalStream(stream);

                // For mock, assign same stream as remote
                setRemoteStream(stream);
            } catch (err) {
                console.error('Error accessing media devices:', err);
            }
        };

        startStream();

        return () => {
            localStream?.getTracks().forEach(track => track.stop());
            remoteStream?.getTracks().forEach(track => track.stop());
            setLocalStream(null);
            setRemoteStream(null);
        };
    }, [isOpen, callType]);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [localStream, remoteStream]);

    const toggleVideo = () => {
        localStream?.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
        setVideoOn(!isVideoOn);
    };

    const toggleAudio = () => {
        localStream?.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
        setAudioOn(!isAudioOn);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-4xl p-4 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-xl font-bold"
                >
                    ✕
                </button>

                {/* Remote video */}
                {callType === 'video' && (
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-96 rounded-md bg-black mb-4"
                    />
                )}

                {/* Local video thumbnail */}
                {callType === 'video' && (
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-32 h-24 rounded-md bg-black absolute bottom-4 right-4 border-2 border-white"
                    />
                )}

                {/* Audio call text if audio only */}
                {callType === 'audio' && (
                    <div className="text-white text-center text-lg py-20">
                        Audio Call with {contactName}
                    </div>
                )}

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={toggleVideo}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                        {isVideoOn ? 'Video On' : 'Video Off'}
                    </button>
                    <button
                        onClick={toggleAudio}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                        {isAudioOn ? 'Audio On' : 'Muted'}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        End Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;
