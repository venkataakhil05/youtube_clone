import React from 'react';

const Shimmer = () => {
    return (
        <div className="flex flex-wrap justify-center">
            {Array(10).fill("").map((e, index) => (
                <div key={index} className="w-72 m-2">
                    {/* Thumbnail Shimmer */}
                    <div className="w-full h-40 bg-gray-200 rounded-xl animate-pulse"></div>

                    {/* Details Shimmer */}
                    <div className="flex mt-2">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 mr-2 animate-pulse"></div>
                        <div className="w-full">
                            {/* Title */}
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            {/* Channel Name */}
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Shimmer;
