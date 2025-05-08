import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "./components/Post";

function Profile() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

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

    const sessionId = null;
    const [userData, setUserData] = useState(null);
    let debounce = false;
    useEffect(() => {
        if (!debounce) {
            checkSession();
            getPostsByUser();
            debounce = true;
        }
    }, []);

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
                    </div>
                </div>

                <div>
                    <button class="text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex flex-grow p-8 bg-custom-dark p-6 overflow-y-auto">
                <div className="flex flex-col items-center text-center bg-custom-dark2 p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
                    {/* Username Placeholder */}
                    <div className="text-4xl font-bold text-white mb-4">{username}</div>

                    {/* Friends Section */}
                    <div className="w-full mb-4">
                        <div className="font-semibold text-xl text-white mb-2">Friends</div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">
                                A
                            </div>
                            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">
                                B
                            </div>
                            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">
                                C
                            </div>
                            {/* Add more friend circles as needed */}
                        </div>
                    </div>

                    {/* Posts */}
                    <div className="font-semibold text-xl text-white mb-2">Posts</div>
                    <div class="flex flex-col min-w-[500px] overflow-y-auto p-6 bg-custom-dark text-black gap-4 flex w-full">
                        {
                            posts.length > 0 ? (posts.map(post => (
                                <Post
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
                                <div>no posts</div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    );

}

export default Profile;