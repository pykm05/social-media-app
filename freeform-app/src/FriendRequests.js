import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FriendRequest } from "./components/FriendRequest";

function FriendRequests() {
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState(false);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [feedback, setFeedback] = useState();
    const [receiverUsername, setReceiver] = useState("");
    const [isSubmitting, setIsSubmitting] = useState("");

    const profileButton = () => {
        navigate("/profile/" + userData.username);
    };

    const friendListButton = () => {
        navigate("/friendlist");
    };

    const friendReqButton = () => {
        navigate("/friendrequests");
    };

    const freeformButton = () => {
        navigate("/feed");
    };
    
    const updateUsername = () => {
        navigate("/changeusername");
    };

    const logout = () => {
        document.cookie = "SessionId=;expires=Mon, 01 Jan 1000 00:00:00 UTC;path=/";
        navigate("/");
    };

    const sessionId = null;
    const [userData, setUserData] = useState(null);

    let debounce = 0;
    // Initial functions
    useEffect(() => {
        if (debounce < 1) {
            checkSession();
            debounce += 1;
        }
    }, []);

    useEffect(() => {
        if (userData) {
            console.log('UserData available, fetching friend requests...');
            getFriendReqs();
        }
    }, [userData]);

    const sendFriendReq = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const senderUsername = userData.username;
        const sessionId = userData.sessionId;

        return fetch("http://localhost:8080/api/sendfriendreq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderUsername, sessionId, receiverUsername }),
        })
            .then(async response => {
                if (!response.ok) throw new Error("Failed to create post");

                const feedbackNow = await response.text();
                setFeedback(feedbackNow);

                if (feedbackNow === "Friend request sent!") {
                    setReceivedRequests([]);
                    getFriendReqs();
                }
                setIsSubmitting(false);
            })
            .catch(error => {
                console.error(error);
                setFeedback("An error occurred while creating the request");
                setIsSubmitting(false);
            });
    };

    // Session Checker
    const checkSession = () => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, SessionId] = cookie.split("=");
            if (key === "SessionId") {
                return fetch("http://localhost:8080/api/validatesession", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ SessionId }),
                })
                    .then(async response => {
                        if (!response.ok) {
                            document.cookie = "SessionId=;expires=Mon, 01 Jan 1000 00:00:00 UTC;path=/";
                            navigate("/login");
                            return;
                        }

                        const tempData = await response.json();

                        if (tempData == null) {
                            document.cookie = "SessionId=;expires=Mon, 01 Jan 1000 00:00:00 UTC;path=/";
                            navigate("/login");
                            return;
                        } else {
                            setUserData(tempData);
                            return;
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
        document.cookie = "SessionId=;expires=Mon, 01 Jan 1000 00:00:00 UTC;path=/";
        navigate("/login");
    };

    const getFriendReqs = () => {
        const username = userData.username;
        const sessionId = userData.sessionId;
        fetch('http://localhost:8080/api/getfriendreqs', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, sessionId }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setReceivedRequests(prev => [...prev, ...data]);
                console.log(receivedRequests);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleClose = () => {
        setReceivedRequests([]);
        getFriendReqs();
    };

    return (
        <div className="flex h-screen font-inter text-white bg-custom-dark">
            {/* Sidebar */}
            <div class="flex flex-col justify-between w-[250px] min-w-[250px] bg-custom-dark3 border-r-2">
                <div>
                    <button
                        onClick={freeformButton}
                        class="text-2xl font-extrabold border-b w-full py-4 px-4"
                    >
                        Freeform
                    </button>

                    <div class="flex flex-col p-4 gap-3">
                        <div class="font-bold underline text-center py-4 ">{userData?.username}</div>
                        <button onClick={profileButton} class="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Profile</button>
                        <button onClick={friendListButton} class="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend List</button>
                        <button onClick={friendReqButton} class="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend Requests</button>
                        <button onClick = {updateUsername} class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Update Username</button>
                    </div>
                </div>

                <div>
                    <button onClick={logout} class="text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex-grow p-8 bg-custom-dark p-6 overflow-y-scroll min-w-[500px]tf">
                <div className="flex flex-col bg-custom-dark2 p-6 gap-5 shadow-lg w-full max-w-3xl mx-auto">
                    <div className="w-full border-2 p-5 rounded-lg">
                        <div className="flex flex-col">
                            <div className="font-semibold text-xl mb-5">Add Friend</div>
                            <div className="flex justify-between text-black bg-custom-cream p-2 rounded">
                                <input value={receiverUsername} onChange={(e) => setReceiver(e.target.value)} className="focus:outline-none bg-custom-cream w-[400px]" placeholder="Enter username..."></input>
                                <button onClick={sendFriendReq} className="hover:bg-custom-cream3 bg-custom-cream2 p-1 pr-5 pl-5 rounded">Send Request</button>
                            </div>
                            <div>
                                {feedback && <div class="text-purple-500 ">{feedback}</div>}
                            </div>
                        </div>
                    </div>

                    <div class="w-full border-t border-gray-300 my-4"></div>

                    <div className="flex flex-col gap-4 border-2">
                        <div>
                            {
                                (receivedRequests.length > 0 ? (receivedRequests.map(data => (
                                    <FriendRequest
                                        onClose = {handleClose}
                                        sender = {data.sender}
                                        receiver = {data.receiver}
                                        receiverSessionId = {userData.sessionId}
                                    />
                                ))
                                ) : (
                                    <div>no friend requests</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default FriendRequests;