import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./videocard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const VideoContainer = () => {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const mainContent = document.getElementById('main-content');
            if (!mainContent) return;

            if (mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 100) {
                if (!loading && nextPageToken) {
                    getVideos(nextPageToken);
                }
            }
        };

        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (mainContent) {
                mainContent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [nextPageToken, loading]);

    const getVideos = async (token = "") => {
        if (loading) return;
        setLoading(true);
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

        let url = apiKey ?
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${apiKey}`
            : YOUTUBE_VIDEOS_API;

        if (token) {
            url += `&pageToken=${token}`;
        }

        try {
            const data = await fetch(url);

            if (!data.ok) {
                console.error("Fetch failed:", await data.text());
                setLoading(false);
                return;
            }

            const json = await data.json();
            setNextPageToken(json.nextPageToken);

            if (token) {
                setVideos((prev) => [...prev, ...json.items]);
            } else {
                setVideos(json.items);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
        setLoading(false);
    };

    if (videos.length === 0 && !loading) return <Shimmer />;

    return (
        <div className="flex flex-wrap justify-center">
            {videos.map((video, index) => (
                <Link key={video.id + index} to={"/watch/" + video.id}>
                    <VideoCard video={video} />
                </Link>
            ))}
            {loading && <Shimmer />}
        </div>
    );
};

export default VideoContainer;
