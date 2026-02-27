import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions, MdVideoLibrary, MdHistory } from "react-icons/md";

const Sidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

    if (!isMenuOpen) return null;

    const menuItems = [
        { icon: <TiHome />, name: "Home", path: "/" },
        { icon: <SiYoutubeshorts />, name: "Shorts", path: "/" },
        { icon: <MdSubscriptions />, name: "Subscriptions", path: "/" },
        { icon: <MdVideoLibrary />, name: "Library", path: "/" },
        { icon: <MdHistory />, name: "History", path: "/history" },
    ];

    return (
        <div className="p-2 shadow-lg w-48 h-[calc(100vh-4rem)] sticky top-16 bg-white overflow-y-auto shrink-0">
            <ul className="flex flex-col gap-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
