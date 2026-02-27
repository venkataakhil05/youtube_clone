import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { YOUTUBE_VIDEOS_API } from "../utils/constants"; // Fallback only
import VideoCard from "./videocard";
import Shimmer from "./Shimmer";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const searchQuery = searchParams.get("search_query");

    useEffect(() => {
        getSearchVideos();
    }, [searchQuery]);

    const getSearchVideos = async () => {
        setVideos([]); // Reset to show shimmer on new search
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        if (!apiKey) {
            console.error("No API Key found");
            return;
        }

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${apiKey}&type=video`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            setVideos(json.items);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    if (!videos || videos.length === 0) return <Shimmer />;

    return (
        <div className="flex flex-col w-full p-4">
            <h2 className="text-xl font-bold mb-4 ml-8">Results for "{searchQuery}"</h2>
            <div className="flex flex-wrap justify-center">
                {videos.map((video) => (
                    <Link key={video.id.videoId} to={"/watch/" + video.id.videoId}>
                        <VideoCard video={video} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
