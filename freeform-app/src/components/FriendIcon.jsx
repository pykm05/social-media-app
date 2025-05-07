export function FriendIcon({ username }) {
    return (
        <div className="flex flex-col items-center w-[150px] h-[150px] p-2">
            <div className="w-16 h-16 bg-gray-500 rounded-full text-white flex items-center justify-center">{username[0].toUpperCase()}</div>
            <div className="w-[125px] h-16 text-white flex items-center justify-center">{username.length > 12 ? (
                username.slice(0, 12) + "..."
            ) : (username)}</div>
        </div>
    );
}
