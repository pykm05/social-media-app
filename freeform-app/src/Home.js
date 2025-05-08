import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const signupButton = () => {
        navigate("/signup")
    };
    
    const loginButton = () => {
        navigate("/login")
    };

    return (
        <div class = "bg-custom-dark min-w-[750px] min-h-[500px]">
            {/* Navbar */}
            <div class = "flex bg-custom-dark2 text-white justify-between w-full border-b h-[10vh] min-h-[50px]">
                {/* Logo on the left side */}
                <div class = "flex gap-1 items-center text-2xl pl-5 font-extrabold font-inter">
                    <img src = "images/logo512.png" alt = "logo" class = "w-auto h-[1em]"></img>
                    Freeform
                </div>

                {/* Buttons on the right side */}
                <div class = "flex items-center pr-5 gap-4 font-sans">
                    <button class = "text-white">
                        About Us
                    </button>

                    <button onClick = {loginButton} class = "text-white bg-gray-600 pt-1 pb-1 pl-3 pr-3 rounded">
                        Log in
                    </button>
                </div>
            </div>

            {/* Body */}
            <div class = "text-white font-sans">
                <div class = "flex pl-4 pr-4 pt-4 pb-4 justify-between w-full h-[90vh] min-h-[450px] gap-4 border-b">
                    <div class = "flex items-center justify-left p-10 bg-custom-dark3 w-2/3 h-full rounded">
                        <div class = "flex-col">
                            <div class = "font-extrabold font-inter text-8xl">
                                <div class = "cream-text-shadow text-orange-100 drop-shadow-2xl">Think it</div>
                                <div class = "yellow-text-shadow text-yellow-100">Speak it</div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <div class = "white-text-shadow font-semibold font-inter text-xl">
                                Speak your mind, share the moment
                            </div>
                        </div>
                    </div>
                    <div class = "flex items-center justify-center bg-custom-cream w-1/3 h-full rounded">
                        <div class = "flex flex-col font-inter items-center font-inter">
                            <div class = "text-2xl font-extrabold text-black text-center">
                            Join our community today
                            </div>
                            <br/>
                            <button onClick = {signupButton} class = "bg-black pt-2 pb-2 pl-4 pr-4 rounded">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class = "pl-2 text-white">
                2025 Freeform. All rights reserved.
            </div>
        </div>
    );
}
export default Home;