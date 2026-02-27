import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import { addToHistory } from "../utils/historySlice";
import { FaUserCircle } from "react-icons/fa";
import { BiLike, BiDislike, BiShare, BiDownload } from "react-icons/bi";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";

export default function WatchPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeMenu());
        getVideoDetails();
    }, [id]);

    const getVideoDetails = async () => {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        if (!apiKey) return;

        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=${apiKey}`;

        try {
            const data = await fetch(url);
            const json = await data.json();

            if (json.items && json.items.length > 0) {
                dispatch(addToHistory(json.items[0]));
            }
        } catch (error) {
            console.error("Error fetching video details:", error);
        }
    };

    // Mock Comments Data
    const commentsData = [
        {
            name: "Akshay Saini",
            text: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [],
        },
        {
            name: "User 2",
            text: "Nice video!",
            replies: [
                {
                    name: "User 3",
                    text: "Agreed!",
                    replies: [],
                },
            ],
        },
    ];

    const Comment = ({ data }) => {
        const { name, text } = data;
        return (
            <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
                <FaUserCircle className="text-3xl" />
                <div className="px-3">
                    <p className="font-bold">{name}</p>
                    <p>{text}</p>
                </div>
            </div>
        );
    };

    const CommentsList = ({ comments }) => {
        return comments.map((comment, index) => (
            <div key={index}>
                <Comment data={comment} />
                <div className="pl-5 border-l-black ml-5">
                    <CommentsList comments={comment.replies} />
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col w-full p-4">
            <div className="px-5 flex w-full">
                <div className="flex-1">
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-xl font-bold">Video Title Placeholder</h1>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                                <FaUserCircle className="text-4xl text-gray-500" />
                                <div>
                                    <h2 className="font-bold">Channel Name</h2>
                                    <p className="text-sm text-gray-500">1M subscribers</p>
                                </div>
                                <button className="bg-black text-white px-4 py-2 rounded-full ml-4 font-bold hover:bg-gray-800">
                                    Subscribe
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center bg-gray-100 rounded-full">
                                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-l-full border-r border-gray-300">
                                        <BiLike className="text-xl" /> Like
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-r-full">
                                        <BiDislike className="text-xl" />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                                    <BiShare className="text-xl" /> Share
                                </button>
                                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                                    <BiDownload className="text-xl" /> Download
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 m-2">
                        <h1 className="text-2xl font-bold">Comments</h1>
                        <CommentsList comments={commentsData} />
                    </div>
                </div>

                {/* Live Chat or Recommendations could go here */}
                <div className="w-full md:w-[350px] pl-4 hidden lg:block">
                    <div className="bg-gray-100 w-full h-screen rounded-lg p-4">
                        Live Chat / Recommendations
                    </div>
                </div>
            </div>
        </div>
    );
}