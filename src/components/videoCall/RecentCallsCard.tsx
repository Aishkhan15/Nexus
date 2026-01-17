import React from "react";
import { Card, CardHeader, CardBody } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Video, Phone } from "lucide-react";
import { RecentCall } from "../../types/RecentCall";

interface Props {
    calls: RecentCall[];
    onCallClick: (call: RecentCall, type: 'video' | 'audio') => void;
}

const RecentCallsCard: React.FC<Props> = ({ calls, onCallClick }) => {
    return (
        <Card className="w-80">
            <CardHeader className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-gray-900">Recent Calls</h2>
                <div className="ml-auto">
                    <Badge variant="primary">{calls.length} recent</Badge>
                </div>
            </CardHeader>
            <CardBody>
                {calls.length > 0 ? (
                    <div className="space-y-2">
                        {calls.map((call) => (
                            <div key={call.id} className="p-2 border rounded flex flex-col gap-2">
                                <p className="font-medium">{call.name}</p>
                                <p className="text-sm text-gray-500">
                                    {call.type === "video" ? "Video" : "Audio"} • {call.status} • {call.time}{" "}
                                    {call.duration && `• ${call.duration}`}
                                </p>
                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={() => onCallClick(call, "video")}
                                        className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        <Video size={16} /> Video
                                    </button>
                                    <button
                                        onClick={() => onCallClick(call, "audio")}
                                        className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        <Phone size={16} /> Audio
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <Video size={24} className="text-gray-500" />
                        </div>
                        <p className="text-gray-600">No recent calls</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Your recent calls will appear here
                        </p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default RecentCallsCard;
