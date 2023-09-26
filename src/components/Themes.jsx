import React from "react";

import lightTheme from "../assets/png/light-theme.png";
import darkTheme from "../assets/png/dark-theme.png";


const Themes = ({ toggleTheme }) => {

    return (
        <div className="absolute bg-gray-200 radius-lg bottom-14 right-1">
            <button className="w-8 h-8 p-1 hover:scale-110 transform duration-100"
                onClick={() => toggleTheme("dark")}>
                <img src={darkTheme} className="radius-lg" alt="dark-theme"/>
            </button>
            <button className="w-8 h-8 p-1 hover:scale-110 transform duration-100"
             onClick={() => toggleTheme("light")}>
                <img src={lightTheme} className="radius-lg" alt="light-theme"/>
            </button>
        </div>
    )
}

export default Themes