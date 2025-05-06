import React, { useState } from "react";

export function Post({ profilePic, username, postDate, postTitle, postContent }) {
    const [votes, setVotes] = useState(0);

    return (
        <div className="flex gap-3 max-w-[500px] min-w-[250px] bg-white p-4">
            <div className="flex flex-col items-center gap-3">
                <img src="/svg/thumbs_up.svg" alt="Thumbs Up" width="20" />
                <div>9000</div>
                <img src="/svg/thumbs_down.svg" alt="Thumbs Down" width="20" />
            </div>

            <div className="flex flex-col w-full gap-3">
                <div>
                    <div className="text-xs">{username} - {postDate}</div>
                    <div className="text-lg">{postTitle}</div>
                </div>
                <div className="text">{postContent}</div>

                <div className="flex gap-3 text-xs">
                    <button className="hover:text-blue-500">Comment</button>
                    <button className="hover:text-blue-500">Share</button>
                </div>

            </div>

        </div>
    );
}
