import React from "react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

interface Meeting {
    id: string;
    name: string;
    email: string;
    date: string;
    time: string;
    message: string;
}

interface Props {
    meetings: Meeting[];
}

const ConfirmedMeetingsCard: React.FC<Props> = ({ meetings }) => {
    return (
        <Card>
            <CardHeader className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-gray-900">
                    Confirmed Meetings
                </h2>

                <div className="ml-auto flex-shrink-0">
                    <Badge variant="success">
                        {meetings.length} confirmed
                    </Badge>
                </div>
            </CardHeader>

            <CardBody>
                {meetings.length > 0 ? (
                    <div className="space-y-3">
                        {meetings.map((meeting) => (
                            <div
                                key={meeting.id}
                                className="p-4 border rounded-lg "
                            >
                                <p className="font-medium text-gray-900">
                                    {meeting.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {meeting.email}
                                </p>
                                <p className="text-sm mt-1">
                                    {meeting.date} at {meeting.time}
                                </p>
                                {meeting.message && (
                                    <p className="text-sm text-gray-700 mt-1">
                                        {meeting.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">
                        No confirmed meetings yet
                    </p>
                )}
            </CardBody>
        </Card>
    );
};

export default ConfirmedMeetingsCard;
