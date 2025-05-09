import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    // Field states
    const [username, setUsername] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [userData, setUserData] = useState(null);

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const goBack = () => {
        navigate("/feed")
    }

    /*const ping = () => {
        fetch("http://localhost:8080/api/test")
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    };*/


    let debounce = 0;
    // Initial functions
    useEffect(() => {
        if (debounce < 1) {
            checkSession();
            debounce += 1;
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

    const changeUser = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const sessionId = userData.sessionId;
        const oldUsername = userData.username;

        return fetch("http://localhost:8080/api/changeusername", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, sessionId, oldUsername }),
        })
            .then(async response => {
                if (!response.ok) throw new Error("Failed to change username");

                const feedbackNow = await response.text();
                setFeedback(feedbackNow);

                if (feedbackNow === "username changed") {
                    const date = new Date();
                    date.setTime(date.getTime() + (20 * 60 * 1000));
                    document.cookie = "SessionId=;expires=Mon, 01 Jan 1000 00:00:00 UTC;path=/";
                    navigate("/login");
                }

                setIsSubmitting(false);
            })
            .catch(error => {
                console.error(error);
                setFeedback("An error occurred while changing the username");
                setIsSubmitting(false);
            });
    };

    return (
        <div class="bg-custom-dark h-full min-w-[750px] min-h-[500px]">
            <div>
                <title>Username Change</title>
            </div>

            <div class="flex items-center justify-center h-screen">
                <div class="flex flex-col bg-white w-[400px] h-[500px] rounded shadow-md justify-center items-center gap-3">
                    <div class="text-color-black font-bold font-inter text-3xl">
                        Change Username
                    </div>
                    <div class="flex text-color-black font-inter text-xs gap-1">
                        Don't want to change your username?
                        <button onClick={goBack} class="text-blue-900 underline">Go Back</button>
                    </div>
                    <br />
                    <input
                        type="text"
                        class="border-b border-black border-opacity-50 w-2/3 outline-none focus:outline-none"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <button onClick={changeUser} class="pt-2 pb-2 pl-4 pr-4 bg-blue-100 rounded-l">Change</button>
                    {feedback && <div class="text-red-500 ">{feedback}</div>}
                </div>
            </div>
        </div>
    );
}
export default Login;