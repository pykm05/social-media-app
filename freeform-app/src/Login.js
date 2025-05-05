import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    // Field states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const signupButton = () => {
        navigate("/signup")
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

    const loginAccount = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        return fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then(async response => {
            if (!response.ok) throw new Error("Failed to create user");
            
            const feedbackNow = await response.text();
            setFeedback(feedbackNow);
    
            if (feedbackNow.match(uuidRegex)) {
                const date = new Date();
                date.setTime(date.getTime() + (5 * 60 * 1000));
                document.cookie = "SessionId=" + feedbackNow + ";expires=" + date.toUTCString() + ";path=/";
                navigate("/feed");
                setFeedback("Logged In");
            }
    
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setFeedback("An error occurred while creating the account");
            setIsSubmitting(false);
        });
    };

    return (
        <div class="bg-custom-dark h-full min-w-[750px] min-h-[500px]">
            <div>
                <title>Login</title>
            </div>

            <div class = "flex items-center justify-center h-screen">
                <div class="flex flex-col bg-white w-[400px] h-[500px] rounded shadow-md justify-center items-center gap-3">
                    <div class = "text-color-black font-bold font-inter text-3xl">
                        Welcome Back
                    </div>
                    <div class = "flex text-color-black font-inter text-xs gap-1">
                        Don"t have an account?
                        <button onClick = {signupButton} class = "text-blue-900 underline">Sign up</button>
                    </div>
                    <br/>
                    <input
                        type = "text"
                        class = "border-b border-black border-opacity-50 w-2/3 outline-none focus:outline-none"
                        placeholder = "Username"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <input
                        type = "password"
                        class = "border-b border-black border-opacity-50 w-2/3 outline-none focus:outline-none"
                        placeholder = "Password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <button onClick = {loginAccount} class = "pt-2 pb-2 pl-4 pr-4 bg-blue-100 rounded-l">Login</button>
                    {feedback && <div class = "text-red-500 ">{feedback}</div>}
                </div>
            </div>
        </div>
    );
}
export default Login;