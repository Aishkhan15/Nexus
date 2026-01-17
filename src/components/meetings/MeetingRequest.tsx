import React, { useState } from "react";

const MeetingRequest = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        message: ""
    });
    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending request...");

        try {
            const response = await fetch("/api/meeting-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("Meeting request sent!");
                setFormData({ name: "", email: "", date: "", time: "", message: "" });
            } else {
                setStatus("Failed to send request.");
            }
        } catch (err) {
            console.error(err);
            setStatus("Error sending request.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Request Meeting</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="date" type="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="time" type="time" value={formData.time} onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="message" placeholder="Message / Purpose" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send Request</button>
            </form>
            {status && <p className="mt-3">{status}</p>}
        </div>
    );
};

export default MeetingRequest;
