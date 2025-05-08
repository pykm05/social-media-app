import React, { use, useState } from "react";
import { useEffect } from "react";

export function Comment({ username, commentDate, commentContent }) {

    return (
        <div className="flex flex-col w-full gap-1 justify-start min-w-[200px] bg-custom-cream text-left border-2 border-black p-2">
            <div>
                <div className="text-xs">{username} - {commentDate}</div>
            </div>
            <div className="text-xs">{commentContent}</div>
        </div>
    );
}
