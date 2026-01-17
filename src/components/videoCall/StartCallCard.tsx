import React from "react";
import { Card, CardHeader, CardBody } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Video, Phone } from "lucide-react";

interface Props {
    name: string;
    onVideoCall: () => void;
    onAudioCall: () => void;
}

const StartCallCard: React.FC<Props> = ({ name, onVideoCall, onAudioCall }) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-gray-900">Start Call</h2>
                <div className="ml-auto">
                    <Badge variant="primary">Ready</Badge>
                </div>
            </CardHeader>
            <CardBody>
                <p className="mb-4 text-gray-700">Start a video or audio call with <b>{name}</b>.</p>
                <div className="flex gap-2">
                    <button
                        onClick={onVideoCall}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        <Video size={18} /> Video Call
                    </button>
                    <button
                        onClick={onAudioCall}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <Phone size={18} /> Audio Call
                    </button>
                </div>
            </CardBody>
        </Card>
    );
};

export default StartCallCard;
