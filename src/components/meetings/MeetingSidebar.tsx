import React, { useState } from "react";
import MeetingRequest from "./MeetingRequest";
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AlertCircle } from "lucide-react";

// Example request type
interface Request {
    id: string;
    name: string;
    email: string;
    date: string;
    time: string;
    message: string;
    status: "pending" | "accepted" | "declined";
}

const MeetingSidebar = () => {
    const [showForm, setShowForm] = useState(false);
    const [requests, setRequests] = useState<Request[]>([
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            date: "2026-01-20",
            time: "10:00",
            message: "Discuss investment",
            status: "pending",
        },
        {
            id: "2",
            name: "Alice Smith",
            email: "alice@example.com",
            date: "2026-01-22",
            time: "14:00",
            message: "Pitch new idea",
            status: "accepted",
        },
    ]);

    const toggleForm = () => setShowForm(!showForm);

    const handleStatusUpdate = (
        id: string,
        status: "accepted" | "declined"
    ) => {
        setRequests(prev =>
            prev.map(req =>
                req.id === id ? { ...req, status } : req
            )
        );

        if (status === "accepted") {
            const request = requests.find(req => req.id === id);
            if (!request) return;

            const stored = JSON.parse(
                localStorage.getItem("confirmedMeetings") || "[]"
            );

            localStorage.setItem(
                "confirmedMeetings",
                JSON.stringify([...stored, { ...request, status: "accepted" }])
            );
        }
    };

    const pendingRequests = requests.filter((r) => r.status === "pending");
    const acceptedRequests = requests.filter((r) => r.status === "accepted");

    return (
        <div className="w-full max-w-sm space-y-6">

            {/* --- Card 1: Send Meeting Request --- */}
            <Card className="lg:col-span-1">
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">Send Meeting Request</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                    <button
                        onClick={toggleForm}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        {showForm ? "Close Form" : "Request Meeting"}
                    </button>
                    {showForm && <div className="mt-4"><MeetingRequest /></div>}
                </CardBody>
            </Card>

            {/* --- Card 2: Incoming Requests --- */}
            <Card>
                <CardHeader className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-gray-900">
                        Incoming Requests
                    </h2>

                    <div className="ml-auto flex-shrink-0">
                        <Badge variant="primary">
                            {pendingRequests.length} pending
                        </Badge>
                    </div>
                </CardHeader>

                <CardBody>
                    {pendingRequests.length > 0 ? (
                        <div className="space-y-2">
                            {pendingRequests.map((req) => (
                                <div key={req.id} className="p-2 border rounded flex flex-col gap-2">
                                    <p>
                                        <b>{req.name}</b> ({req.email})
                                    </p>
                                    <p>
                                        {req.date} at {req.time}
                                    </p>
                                    <p>{req.message}</p>
                                    <div className="flex flex-wrap gap-2 pt-2">

                                        <button
                                            onClick={() => handleStatusUpdate(req.id, "accepted")}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(req.id, "declined")}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <AlertCircle size={24} className="text-gray-500" />
                            </div>
                            <p className="text-gray-600">No incoming requests</p>
                            <p className="text-sm text-gray-500 mt-1">
                                When investors send requests, they will appear here
                            </p>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* --- Card 3: Accepted / Pending Requests --- */}
            <Card>
                <CardHeader className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-gray-900">Accepted Requests</h2>
                    <div className="ml-auto flex-shrink-0">
                        <Badge variant="success">
                            {acceptedRequests.length} accepted
                        </Badge>
                    </div>

                </CardHeader>
                <CardBody>
                    {acceptedRequests.length > 0 ? (
                        <div className="space-y-2">
                            {acceptedRequests.map((req) => (
                                <div key={req.id} className="p-2 border rounded ">
                                    <p>
                                        <b>{req.name}</b> ({req.email})
                                    </p>
                                    <p>
                                        {req.date} at {req.time}
                                    </p>
                                    <p>{req.message}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No accepted requests yet</p>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default MeetingSidebar;
