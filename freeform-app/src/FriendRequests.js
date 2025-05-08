import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FriendRequest } from "./components/FriendRequest";

function FriendRequests() {
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState(false);
    const [receivedRequests, setReceivedRequests] = useState([]);

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

    const handleClick = () => {
        setRequestSent(true)
    }
    
    const sessionId = null;
    const [userData, setUserData] = useState(null);

    let debounce = false;
    useEffect(() => {
        if (!debounce) {
            checkSession();
            setReceivedRequests(['Gustophiles', 'long nameeeeeeeeeeeee', 'j pork',
                'j pork', 'j pork', 'j pork',
                'j pork', 'j pork', 'j pork'
            ]);
            debounce = true;
        }
    }, []);

    // Session Checker
    const checkSession = () => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies){
            const [key, SessionId] = cookie.split("=");
            if (key === "SessionId"){
                return fetch("http://localhost:8080/api/validatesession", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ SessionId }),
                })
                .then(async response => {
                    if (!response.ok) {
                        navigate("/login");
                        return;
                    }

                    const tempData = await response.json();
            
                    if (tempData == null) {
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
        navigate("/login");
    };

    return (
        <div className="flex h-screen font-inter text-white bg-custom-dark">
            {/* Sidebar */}
            <div class = "flex flex-col justify-between w-[250px] min-w-[250px] bg-custom-dark3 border-r-2">
                <div>
                    <button
                        onClick={freeformButton}
                        class = "text-2xl font-extrabold border-b w-full py-4 px-4"
                    >
                        Freeform
                    </button>

                    <div class = "flex flex-col p-4 gap-3">
                        <div class = "font-bold underline text-center py-4 ">{userData?.username}</div>
                        <button onClick = {profileButton} class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Profile</button>
                        <button onClick = {friendListButton} class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend List</button>
                        <button onClick = {friendReqButton} class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend Requests</button>
                    </div>
                </div>

                <div>
                    <button class = "text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
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
                                <input className="focus:outline-none bg-custom-cream w-[400px]" placeholder="Enter username..."></input>
                                <button onClick={handleClick} className="hover:bg-custom-cream3 bg-custom-cream2 p-1 pr-5 pl-5 rounded">Send Request</button>
                            </div>
                            <div>
                                {requestSent ? (<>Request sent</>) : (<></>)}
                            </div>
                        </div>
                    </div>

                    <div class="w-full border-t border-gray-300 my-4"></div>

                    <div className="flex flex-col gap-4 border-2">
                        <div>
                            {receivedRequests.length > 0 ? (
                                <div>
                                    {receivedRequests.map((username, index) => (
                                        <FriendRequest key={index} username={username} />
                                    ))}
                                </div>
                            ) : (<div>No friends added</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default FriendRequests;