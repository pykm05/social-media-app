import { useEffect, useState } from "react";

export function FriendRequest({ sender, receiver, receiverSessionId, onClose }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const accept = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const sessionId = receiverSessionId;
        

        return fetch("http://localhost:8080/api/acceptfriendreq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender, sessionId, receiver }),
        })
        .then(async response => {
            if (!response.ok) throw new Error("Failed to accept");
            
            const feedbackNow = await response.text();

            if (feedbackNow === "Friend request accepted"){
                onClose();
            }
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setIsSubmitting(false);
        });
    };

    const decline = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const sessionId = receiverSessionId;
        

        return fetch("http://localhost:8080/api/declinefriendreq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender, sessionId, receiver }),
        })
        .then(async response => {
            if (!response.ok) throw new Error("Failed to decline");
            
            const feedbackNow = await response.text();

            if (feedbackNow === "Friend request declined"){
                onClose();
            }
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setIsSubmitting(false);
        });
    };
    
    return (
        <div className="w-full border-2 p-5 rounded-lg">
            <div className="flex justify-between">
                <div className="font-semibold text-xl mb-5 max-w-[500px]">{sender.length > 30 ? (
                    sender.slice(0, 30) + "..."
                ) : (sender)}</div>
                <div className="flex items-center gap-3 text-black flex-shrink-0">
                    <button onClick={accept} className="p-2 pl-5 pr-5 rounded bg-green-500 hover:bg-green-600">Accept</button>
                    <button onClick={decline} className="p-2 pl-5 pr-5 rounded bg-red-500 hover:bg-red-600">Decline</button>
                </div>
            </div>
        </div>
    );
}
