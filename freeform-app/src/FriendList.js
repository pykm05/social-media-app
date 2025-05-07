import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";

function FriendList() {
    const navigate = useNavigate();

    const freeformButton = () => {
        navigate("/feed");
    };

    return (
        <div className="flex h-screen font-inter text-white bg-custom-dark">
            {/* Sidebar */}
            <div className="flex flex-col justify-between w-[250px] min-w-[200px] bg-custom-dark3 border-r-2">
                <div>
                    <button
                        onClick={freeformButton}
                        className="text-2xl font-extrabold border-b w-full py-4 px-4"
                    >
                        Freeform
                    </button>

                    <div className="flex flex-col p-4 gap-3">
                        <button className="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Username</button>
                        <div className="font-bold underline text-center pb-2">Profile</div>
                        <button className="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend List</button>
                        <button className="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend Requests</button>
                    </div>
                </div>

                <div>
                    <button className="text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex-grow p-8 bg-custom-dark p-6">
                <div className="flex flex-col items-center text-center bg-custom-dark2 p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
                    {/* Username Placeholder */}
                    <div className="text-4xl font-bold text-white mb-4">FRIEND LIST FRIEND LIST</div>

                    {/* Posts */}
                    <div className="w-full mb-6">
                        <div className="font-semibold text-xl text-white mb-2">Recent Posts</div>
                        <div className="bg-custom-dark4 rounded-lg p-4 mb-2">
                            <div className="text-white">This is a placeholder for a post.</div>
                        </div>
                        <div className="bg-custom-dark4 rounded-lg p-4 mb-2">
                            <div className="text-white">Here's another placeholder for a post!</div>
                        </div>
                    </div>

                    {/* Friends Section */}
                    <div className="w-full mb-4">
                        <div className="font-semibold text-xl text-white mb-2">Friends</div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">
                                A
                            </div>
                            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">
                                B
                            </div>
                            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">
                                C
                            </div>
                            {/* Add more friend circles as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default FriendList;