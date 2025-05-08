import { useNavigate } from "react-router-dom";
import { Post } from "./components/Post";
import { useEffect } from "react";
import React, { useState } from "react";

function Feed() {
    const numPosts = 5;
    const [offset, setOffset] = useState(0);

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [posts, setPosts] = useState([]);

    const sessionId = null;
    const [userData, setUserData] = useState(null);

    const freeformButton = () => {
        navigate("/feed");
    };

    let debounce = false;
    // Initial functions
    useEffect(() => {
        if (!debounce) {
            checkSession();
            console.log(userData);
            getPosts();
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

    // Load posts 
    // This is all for pagination for extra credit
    const getPosts = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        fetch('http://localhost:8080/api/getposts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numPosts, offset }),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setPosts(prev => [...prev, ...data]);
            setOffset(prev => prev + numPosts);
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setIsSubmitting(false);
        });
    };

    return (
        <div class = "flex h-screen font-inter text-white bg-custom-dark min-w-[750px] min-h-[500px]">
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
                        <button class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Profile</button>
                        <button class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend List</button>
                        <button class = "w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend Requests</button>
                    </div>
                </div>

                <div>
                    <button class = "text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
                        Logout
                    </button>
                </div>
            </div>
            
            <div class = "flex flex-col min-w-[500px] overflow-y-auto p-6 bg-custom-dark text-black gap-4 flex items-center w-full">
                {
                    posts.length > 0 ? (posts.map(post => (
                        <Post
                            username = {post.owner}
                            postDate = {post.date}
                            postTitle = {post.title}
                            postContent = {post.contents}
                        />
                    ))
                ) : (
                    <div>no posts</div>
                )
                }
                
                <button onClick = {getPosts} class = "text-l w-1/3 text-white hover:text-blue-300 transition-colors underline">Load more posts</button>
            </div>
        </div>
    );
}

export default Feed;
