export function FriendRequest({ username }) {
    return (
        <div className="w-full border-2 p-5 rounded-lg">
            <div className="flex justify-between">
                <div className="font-semibold text-xl mb-5 max-w-[500px]">{username.length > 30 ? (
                    username.slice(0, 30) + "..."
                ) : (username)}</div>
                <div className="flex items-center gap-3 text-black flex-shrink-0">
                    <button className="p-2 pl-5 pr-5 rounded bg-green-500 hover:bg-green-600">Accept</button>
                    <button className="p-2 pl-5 pr-5 rounded bg-red-500 hover:bg-red-600">Decline</button>
                </div>
            </div>
        </div>
    );
}
