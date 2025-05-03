import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
    // Navigate
    const navigate = useNavigate();

    // Field states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    /*const ping = () => {
        fetch('http://localhost:8080/api/test')
        .then(response => response.text())
        .then(data => {
            console.log('Response from server:', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };*/

    const createAccount = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        return fetch('http://localhost:8080/api/createaccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(async response => {
            if (!response.ok) throw new Error('Failed to create user');
            
            const feedbackNow = await response.text();
            setFeedback(feedbackNow);
    
            if (feedbackNow === "account created") {
                navigate("/login");
            }
    
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error(error);
            setFeedback('An error occurred while creating the account');
            setIsSubmitting(false);
        });
    };

    return (
        <div class="bg-custom-dark h-full min-w-[750px] min-h-[500px]">
            <div>
                <title>Sign Up</title>
            </div>

            <div class = "flex items-center justify-center h-screen">
                <div class="flex flex-col bg-white w-[400px] h-[500px] rounded shadow-md justify-center items-center gap-3">
                    <div class = "text-black font-bold font-inter text-3xl">
                        Sign Up
                    </div>
                    <div class = "text-black font-inter text-xs">
                        Make an account to continue
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
                    <button onClick = {createAccount} class = "pt-2 pb-2 pl-4 pr-4 bg-blue-100 rounded-l">Sign Up</button>
                    {feedback && <div class = "text-red-500 ">{feedback}</div>}
                </div>
            </div>
        </div>
    );
}
export default Signup;