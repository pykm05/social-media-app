import { useNavigate } from "react-router-dom";
import { Post } from "./components/Post";

function Home() {
    const navigate = useNavigate();

    const freeformButton = () => {
        navigate("/feed");
    };

    return (
        <div className="flex h-screen font-inter text-white bg-custom-dark">
            {/* Sidebar */}
            <aside className="flex flex-col justify-between w-[250px] min-w-[200px] bg-custom-dark3 border-r-2">
                <div>
                    <button
                        onClick={freeformButton}
                        className="text-2xl font-extrabold border-b w-full py-4 px-4"
                    >
                        Freeform
                    </button>

                    <div className="flex flex-col p-4 gap-3">
                        <div className="font-bold underline text-center pb-2">Username</div>
                        <button className="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Profile</button>
                        <button className="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend List</button>
                        <button className="w-full hover:bg-custom-dark4 rounded py-3 transition-colors">Friend Requests</button>
                    </div>
                </div>

                <div>
                    <button className="text-xl p-4 w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors border-t">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-[250px] max-w-[1000px] overflow-y-auto p-6 bg-custom-dark text-black gap-4">
                <Post
                    username="J Pork"
                    postDate="Sep 21"
                    postTitle="TITLE OF POST"
                    postContent="banana"
                />
                <Post
                    username="Another User"
                    postDate="Sep 22"
                    postTitle="Another Post"
                    postContent="This is another example post contentasd;lfkj;alsdfj.
                    his is another example post contentasd;lfkj;alsdfj
                    his is another example post contentasd;lfkj;alsdfj
                    his is another example post contentasd;lfkj;alsdfj
                    his is another example post contentasd;lfkj;alsdfj
                    his is another example post contentasd;lfkj;alsdfj
                    his is another example post contentasd;lfkj;alsdfj
                    his is another example post contentasd;lfkj;alsdfj
                    "
                    
                />
            </main>
        </div>
    );
}

export default Home;
