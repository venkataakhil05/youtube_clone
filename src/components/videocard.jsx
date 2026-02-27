import React from 'react';


function VideoCard({ video }) {
    if (!video) return null;
    const thumbnail = video?.snippet?.thumbnails?.medium?.url || video?.snippet?.thumbnails?.default?.url;

    return (
        <div className="w-72 m-2 cursor-pointer">
            <div className="w-full relative">
                <img
                    src={thumbnail}
                    alt={video?.snippet?.title}
                    onError={(e) => {
                        console.warn("Thumbnail load failed, using fallback:", thumbnail);
                        e.target.src = "https://via.placeholder.com/320x180?text=No+Thumbnail";
                    }}
                    className="w-full rounded-xl hover:rounded-none transition-all duration-300"
                />
            </div>

            <div className="flex mt-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 mr-2">
                    {/* Channel Icon Placeholder */}
                </div>
                <div>
                    <h3 className="font-bold text-sm line-clamp-2 text-black leading-tight">
                        {video.snippet.title}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                        {video.snippet.channelTitle}
                    </p>
                    <div className="flex text-gray-600 text-xs">
                        <span>{video.statistics ? formatViewCount(video.statistics.viewCount) : "N/A"} views</span>
                        <span className="mx-1">•</span>
                        <span>{timeAgo(video.snippet.publishedAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper functions for formatting
const formatViewCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count;
};

const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    return "just now";
};

export default VideoCard;