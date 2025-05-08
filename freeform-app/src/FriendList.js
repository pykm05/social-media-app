import { useNavigate } from "react-router-dom";
import { FriendIcon } from "./components/FriendIcon";
import { useEffect, useState } from "react";

function FriendList() {
    let username = "";
    
    const navigate = useNavigate();

    const freeformButton = () => {
        navigate("/feed");
    };

    const profileButton = () => {
        navigate("/profile/" + userData.username);
    };

    const friendListButton = () => {
        navigate("/friendlist");
    };

    const friendReqButton = () => {
        navigate("/friendrequests");
    };

    const [friends, setFriends] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sessionId = null;
    const [userData, setUserData] = useState(null);

    let debounce = false;
    useEffect(() => {
        if (!debounce) {
            checkSession();
            debounce = true;
        }
    }, []);

    useEffect(() => {
        if (userData) {
            console.log('UserData available, fetching friends...');
            username = userData.username;
            getFriends();
        }
    }, [userData]);

    const getFriends = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        console.log(userData)

        fetch('http://localhost:8080/api/getfriends', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data)
            setFriends(data);
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setIsSubmitting(false);
        });
    }


    // Session Checker
    const checkSession = () => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies){
            const [key, SessionId] = cookie.split("=");
            if (key === "SessionId") {
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
            <div className="flex flex-col justify-between w-[250px] min-w-[200px] bg-custom-dark3 border-r-2">
                <div>
                    <button
                        onClick={freeformButton}
                        className="text-2xl font-extrabold border-b w-full py-4 px-4"
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
                    <button className="text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex flex-grow flex-col gap-[50px] items-center p-8 bg-custom-dark overflow-y-scroll">
                <div className="flex items-center p-3">
                    <div className="text-4xl font-bold text-white">Friends</div>
                </div>
                {friends.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-auto h-auto p-5 border-2 rounded-md">
                        {friends.map((friend, index) => (
                            <FriendIcon key={index} username={friend.username2}></FriendIcon>
                        ))}
                    </div>
                ) : (<div>No friends added</div>)}
            </div>
        </div>
    );

}

export default FriendList;