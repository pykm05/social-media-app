import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const freeformButton = () => {
        navigate("/feed");
    }

    return (
        <div class = "bg-custom-dark min-w-[750px] min-h-[500px] w-full h-[100vh]">
            <div>
                <title>Feed</title>
            </div>

            <div class = "flex flex-row">
                <div class = "flex flex-col fixed gap-4 w-1/5 min-w-[150px] h-[100vh] bg-custom-dark3 border-r-2 font-inter text-white justify-between text-xl">
                    <div class = "gap-4 pt-4 border-b">
                        <button onClick={freeformButton} class="text-2xl font-extrabold border-b w-full pb-4">Freeform</button>
                        <div class = "flex flex-col justify-between p-4 items-center gap-1">
                            <div class = "pb-4 font-bold underline">Username</div>
                            <button class = "w-full hover:bg-custom-dark4 rounded transition-colors pt-3 pb-3">Profile</button>
                            <button class = "w-full hover:bg-custom-dark4 rounded transition-colors pt-3 pb-3">Friend List</button>
                            <button class = "w-full hover:bg-custom-dark4 rounded transition-colors pt-3 pb-3">Friend Requests</button>
                        </div>
                    </div>

                    <div>
                        <button class="text-xl p-4 border-t w-full text-red-300 hover:bg-red-400 hover:text-white transition-colors">Logout</button>
                    </div>
                </div>
                <div class = "ml-[20%] p-5 text-white font-inter x-1/5 w-4/5 overflow-y-auto bg-custom-dark">
                <p>Item 1</p>
                <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 4</p>
      <p>Item 5</p>
      <p>Item 6</p>
      <p>Item 7</p>
      <p>Item 8</p>
      <p>Item 9</p>
      <p>Item 10</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 4</p>
      <p>Item 5</p>
      <p>Item 6</p>
      <p>Item 7</p>
      <p>Item 8</p>
      <p>Item 9</p>
      <p>Item 10</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 4</p>
      <p>Item 5</p>
      <p>Item 6</p>
      <p>Item 7</p>
      <p>Item 8</p>
      <p>Item 9</p>
      <p>Item 10</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 4</p>
      <p>Item 5</p>
      <p>Item 6</p>
      <p>Item 7</p>
      <p>Item 8</p>
      <p>Item 9</p>
      <p>Item 10</p>
                </div>
            </div>
        </div>
    );
}
export default Home;