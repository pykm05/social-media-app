import { useNavigate } from "react-router-dom";
import { Post } from "./components/Post";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRef } from "react";

function Feed() {
    const num = useRef(5);
    const off = useRef(0);

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [posts, setPosts] = useState([]);

    const sessionId = null;
    const [userData, setUserData] = useState(null);
    
    const [contents, setPostContent] = useState("");
    const [title, setPostTitle] = useState("");
    const [feedback, setFeedback] = useState("");

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

    let debounce = false;
    // Initial functions
    useEffect(() => {
        if (!debounce) {
            checkSession();
            getPostButton();
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
    const getPosts = (numPosts, offset) => {
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
            off.current += numPosts;
        })
        .catch(error => {
            console.error(error);
        });
    };

    const getPostButton = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        getPosts(num.current, off.current);
        setIsSubmitting(false);
    }

    const createPost = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const owner = userData.username;
        const sessionId = userData.sessionId;
        
        return fetch("http://localhost:8080/api/createpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ owner, sessionId, contents, title }),
        })
        .then(async response => {
            if (!response.ok) throw new Error("Failed to create post");
            
            const feedbackNow = await response.text();
            setFeedback(feedbackNow);

            if (feedbackNow === "Post created!"){
                setPosts([]);
                off.current = 0;
                getPosts(num.current, off.current);
            }
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setFeedback("An error occurred while creating the post");
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
            
            <div class = "flex flex-col min-w-[500px] overflow-y-auto p-6 bg-custom-dark text-black gap-4 flex items-center w-full">


                <div className="flex flex-col gap-3 min-w-[450px] bg-custom-cream p-4 w-full">
                    <div class = "text-black text-xl">Create a post!</div>
                    <textarea placeholder = "Title" class = "p-2" value = {title} onChange = {(e) => setPostTitle(e.target.value)}/>
                    <textarea placeholder = "Content" class = "p-2 h-[100px] text-left" value = {contents} onChange = {(e) => setPostContent(e.target.value)}/>
                    <button onClick = {createPost} class = "p-2 rounded bg-blue-200">Post</button>
                    {feedback && <div class = "text-purple-500 ">{feedback}</div>}
                </div>


                {
                    posts.length > 0 ? (posts.map(post => (
                        <Post
                            username = {post.owner}
                            postDate = {post.date}
                            postTitle = {post.title}
                            postContent = {post.contents}
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
                
                <button onClick = {getPostButton} class = "text-l w-1/3 text-white hover:text-blue-300 transition-colors underline">Load more posts</button>
            </div>
        </div>
    );
}

export default Feed;
