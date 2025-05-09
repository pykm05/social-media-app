import React, { use, useState } from "react";
import { useEffect } from "react";
import { Comment } from "./Comments";

export function Post({ username, postDate, postTitle, postContent, isprofile, postId, onlineUser, onlineUserSession, onClose }) {

    const [votes, setVotes] = useState("...");
    const [comment, setComment] = useState("");
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [seeComments, setSeeComments] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState("");

    const [comments, setComments] = useState([]);

    const updateVote = (numVote) => {
        const username = onlineUser;
        const sessionId = onlineUserSession;
        fetch('http://localhost:8080/api/vote', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, username, sessionId, numVote }),
        })
            .then((response) => {
                setVotes(response.text());
            })
            .catch(error => {
                console.error(error);
            });
    };

    let debounce = false;
    useEffect(() => {
        if (debounce) return;

        getCommentByPost();
        console.log(postId);
        fetch('http://localhost:8080/api/getvotes', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId }),
        })
            .then((response) => {
                setVotes(response.text());
            })
            .catch(error => {
                setVotes("?");
                console.error(error);
            });

        debounce = true;
    }, []);

    const getCommentByPost = () => {
        fetch('http://localhost:8080/api/getcomments', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setComments(prev => [...prev, ...data]);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const createComment = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const owner = onlineUser;
        const sessionId = onlineUserSession;
        const contents = comment;

        return fetch("http://localhost:8080/api/createcomment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ owner, sessionId, contents, postId }),
        })
            .then(async response => {
                if (!response.ok) throw new Error("Failed to create post");

                const feedbackNow = await response.text();
                setFeedback(feedbackNow);

                if (feedbackNow === "Comment created!") {
                    setComments([]);
                    getCommentByPost();
                }
                setIsSubmitting(false);
            })
            .catch(error => {
                console.error(error);
                setFeedback("An error occurred while creating the post");
                setIsSubmitting(false);
            });
    };

    const deletePost = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const sessionId = onlineUserSession;
        const username = onlineUser;

        

        return fetch("http://localhost:8080/api/deletepost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, username, postId }),
        })
        .then(async response => {
            if (!response.ok) throw new Error("Failed to delete post");
            
            const feedbackNow = await response.text();

            alert(feedbackNow);

            if (feedbackNow === "post deleted"){
                onClose();
            }
            
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            alert(error);
            setIsSubmitting(false);
        });
    };

    return (
        <div className="relative flex flex-row gap-3 min-w-[450px] bg-custom-cream p-4 w-full justify-start text-left">
            <button onClick={deletePost} className = "absolute top-2 right-2 text-xs p-2 bg-black rounded-full hover:bg-red-400 text-white transition-colors w-6 h-6 items-center justify-center flex">X</button>

            <div className="flex flex-col items-center gap-3">
                <button onClick={() => updateVote(1)}>
                    <img src="/svg/thumbs_up.svg" alt="Thumbs Up" width="20" />
                </button>
                <div>{votes}</div>
                <button onClick={() => updateVote(-1)}>
                    <img src="/svg/thumbs_down.svg" alt="Thumbs Down" width="20" />
                </button>
            </div>

            <div className="flex flex-col w-full gap-1 justify-start">
                <div>
                    <div className="text-xs">{username} - {postDate}</div>
                    <div className="text-lg font-bold">{postTitle}</div>
                </div>
                <div className="text">{postContent}</div>

                <div className="flex flex-col gap-1 text-xs">
                    <div className="flex flex-row gap-4">
                        <button onClick={() => setShowCommentBox(prev => !prev)} className="hover:text-blue-500 text-left self-start">Comment</button>
                        <button onClick={() => setSeeComments(prev => !prev)} className="hover:text-blue-500 text-left self-start">See Comments</button>
                    </div>
                    {showCommentBox && (
                        <>
                            <textarea placeholder="Comment" class="text-left" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <button onClick={createComment} className="hover:text-blue-500 text-left self-start bg-gray-300 rounded p-1">Post</button>
                            {feedback && <div class="text-purple-500 ">{feedback}</div>}
                        </>)}

                    {seeComments && (
                        comments.length > 0 ? (comments.map(data => (
                            <Comment
                                username={data.owner}
                                commentDate={data.date}
                                commentContent={data.contents}
                            />
                        ))
                        ) : (
                            <div>no comments</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
