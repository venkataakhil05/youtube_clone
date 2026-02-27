import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearHistory } from "../utils/historySlice";
import VideoCard from "./videocard";

const HistoryPage = () => {
    const history = useSelector((store) => store.history.videos);
    const dispatch = useDispatch();

    const handleClearHistory = () => {
        dispatch(clearHistory());
    };

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Watch History is empty</h1>
                <p>Videos you watch will appear here.</p>
                <Link to="/" className="text-blue-500 hover:underline mt-4">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex justify-between items-center mb-4 ml-8 mr-8">
                <h2 className="text-xl font-bold">Watch History</h2>
                <button
                    onClick={handleClearHistory}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Clear History
                </button>
            </div>
            <div className="flex flex-wrap justify-center">
                {history.map((video, index) => (
                    <Link key={video.id + index} to={"/watch/" + video.id}>
                        <VideoCard video={video} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;
