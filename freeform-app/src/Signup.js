import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
    // Navigate
    const navigate = useNavigate();

    // Field states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    // Validate fields
    const validate = () => {
        console.log(username);
    }

    return (
        <div class="bg-custom-dark h-full min-w-[750px] min-h-[500px]">
            <div>
                <title>Sign Up</title>
            </div>

            <div class = "flex items-center justify-center h-screen">
                <div class="flex flex-col bg-white w-[400px] h-[500px] rounded shadow-md justify-center items-center gap-3">
                    <div class = "text-color-black font-bold font-inter text-3xl">
                        Sign Up
                    </div>
                    <div class = "text-color-black font-inter text-xs">
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
                    <button onClick = {validate} class = "pt-2 pb-2 pl-4 pr-4 bg-blue-100 rounded-l">Sign Up</button>
                </div>
            </div>
        </div>
    );
}
export default Signup;