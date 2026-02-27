import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsYoutube } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        dispatch(toggleMenu());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="flex justify-between items-center p-4 shadow-lg sticky top-0 bg-white z-50">
            {/* Left Section: Menu & Logo */}
            <div className="flex items-center gap-4">
                <RxHamburgerMenu
                    className="text-2xl cursor-pointer hover:bg-gray-200 rounded-full p-1 box-content"
                    onClick={toggleSidebar}
                />
                <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <BsYoutube className="text-3xl text-red-600" />
                    <span className="text-xl font-bold tracking-tighter">YouTube</span>
                </div>
            </div>

            {/* Middle Section: Search */}
            <form
                className="flex items-center w-1/2"
                onSubmit={handleSearch}
            >
                <input
                    className="w-full border border-gray-400 rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="border border-gray-400 border-l-0 bg-gray-100 rounded-r-full px-5 py-2 hover:bg-gray-200"
                >
                    <CiSearch className="text-xl" />
                </button>
            </form>

            {/* Right Section: User Icon */}
            <div>
                <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />
            </div>
        </div>
    );
};

export default Header;
