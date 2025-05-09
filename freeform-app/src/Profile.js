import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "./components/Post";
import { FriendIcon } from "./components/FriendIcon";

function Profile() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [friends, setFriends] = useState([]);

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

    const logout = () => {
        document.cookie = "SessionId=;expires=Mon, 01 Jan 1000 00:00:00 UTC;path=/";
        navigate("/");
    };

    const updateUsername = () => {
        navigate("/changeusername");
    };

    const [userData, setUserData] = useState(null);
    let debounce = 0;
    // Initial functions
    useEffect(() => {
        if (debounce <= 1) {
            checkSession();
            if (debounce == 1) {
                getPostsByUser();
            }
            debounce += 1;
        }
    }, []);

    useEffect(() => {
        if (userData) {
            console.log('UserData available, fetching friends...');
            getFriends();
        }
    }, [userData]);

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

    const getPostsByUser = () => {
        const owner = username;
        fetch('http://localhost:8080/api/getpostsbyuser', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ owner }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(prev => [...prev, ...data]);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleClose = () => {
        setPosts([]);
        getPostsByUser();
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

            <div className="flex flex-grow p-8 bg-custom-dark p-6 overflow-y-auto">
                <div className="flex flex-col items-center text-center bg-custom-dark2 p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
                    {/* Username Placeholder */}
                    <div className="text-4xl font-bold text-white mb-4">{username}</div>

                    {/* Friends Section */}
                    <div className="flex flex-grow flex-col gap-[50px] items-center p-8">
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

                    {/* Posts */}
                    <div className="font-semibold text-xl text-white mb-2">Posts</div>
                    <div class="flex flex-col min-w-[500px] p-6 bg-custom-dark text-black gap-4 flex w-full">
                        {
                            posts.length > 0 ? (posts.map(post => (
                                <Post
                                    onClose = {handleClose}
                                    username={post.owner}
                                    postDate={post.date}
                                    postTitle={post.title}
                                    postContent={post.contents}
                                    isprofile={false}
                                    postId={post.post_id}
                                    onlineUserSession={userData.sessionId}
                                    onlineUser={userData.username}
                                />
                            ))
                            ) : (
                                <div class = "text-white">no posts</div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    );

}

export default Profile;