import React, { useState, useEffect } from "react";

import variables from "../css/variables.css";
import style from "../css/style.css";
import SearchInput from "./SearchInput";
import Themes from "./Themes";
import themes from "../theme/themes.js"
import Greetings from "./Greetings";

import { IconXmark, IconPaperPlaneFilled, IconPaintbrushFilled } from "@jotforminc/svg-icons";

const BotBody = (props) => {

    const [messageList, setMessageList] = useState([]);
    const [showThemes, setShowThemes] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("dark");
    const [isTyping, setIsTyping] = useState(false);
    const themeColor = themes[currentTheme];
    let timeoutId;
    let inputValue = "";

    // console.log("props.botMessage TOP OF BOTBODY: ", props.botMessage)
    console.log("props.botMessage TYPE OF TOP OF BOTBODY: ", typeof props.botMessage)

    // const lastMessage = messageList[messageList.length]?.message

    const passLastMessage = () => {
        props.sendLastMessage(inputValue);
        // console.log("input (BotBody.jsx):" + inputValue);
    }

    const toggleTheme = (newTheme) => {
        setCurrentTheme(newTheme);
    };

    const getBotMessage = () => {
        const botAnswer = {
            id: messageList.length,
            sender: "bot",
            message: props.botMessage,
        };

        if (botAnswer.message === undefined) {
            if (messageList.length < 1) {
                botAnswer.message = "👋 Hello there! Welcome to our chatbot service. How can I assist you today?"
                setMessageList(messageList => [...messageList, botAnswer]);
                console.log("THIS İS UNDEFINED")
            } else if (messageList.length >= 1) {
                botAnswer.message = "I couldn't understand what you meant, please be more explanatory."
                setMessageList(messageList => [...messageList, botAnswer]);
                console.log("THIS İS UNDEFINEDDDDD")
            }
        } else {
            // console.log("newMessage.message", props.botMessage)
            setMessageList(messageList => [...messageList, botAnswer]);
        }

    }

    // Send new message
    const sendMessage = () => {
        const input = document.querySelector("input");
        const newMessage = {
            id: messageList.length,
            sender: "user",
            message: input.value,
        };

        if (input.value !== "") {
            setMessageList(messageList => [...messageList, newMessage])
            inputValue = input.value;
            // console.log(inputValue)
            input.value = "";
            input.focus();
        }
    };

    console.log("messageList:", messageList)

    useEffect(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(getBotMessage, 2000)

        setIsTyping(true);
        const typingTimeout = setTimeout(() => {
            setIsTyping(false);
        }, 2000)

        return () => clearTimeout(typingTimeout);
    }, [props.returnMessage])

    // open themes popup
    const toggleThemes = event => {
        setShowThemes(current => !current)
    }

    // update css variables on hover according to theme
    const updateCSSVariables = (themeColor) => {
        const style = document.documentElement.style;
        style.setProperty("--search-area__btn-hover", themeColor.headerCloseColor)
        style.setProperty("--search-area__btn__bg-hover", themeColor.headerCloseBgHoverColor)
    }

    // Load message list 
    useEffect(() => {
        const storedMessages = localStorage.getItem("messageList");
        if (storedMessages) {
            setMessageList(JSON.parse(storedMessages));
        }
    }, [props.returnMessage]);

    // Save new messages
    useEffect(() => {
        localStorage.setItem("messageList", JSON.stringify(messageList));
    }, [messageList]);

    // Clear chat history on refresh page
    useEffect(() => {
        const clearLocalStorage = () => {
            localStorage.clear();
        };

        window.addEventListener("beforeunload", clearLocalStorage);
    }, []);

    // updated css variables according to theme
    useEffect(() => {
        updateCSSVariables(themeColor);
    }, [themeColor])

    return (
        <div className="w-100vw h-100vh relative" style={props.style}>
            <div className="absolute right-2 bottom-2 w-84 ">

                {/* Header */}
                <div className="flex justify-between items-end py-2 px-3 h-14 radius-t-lg border-b-2"
                    style={{
                        backgroundColor: themeColor.headerBgColor,
                        borderColor: themeColor.textAreaBorderColor,
                    }}>
                    <h1 className="text-4xl font-bold"
                        style={{
                            color: themeColor.headerTitleColor,
                        }}>Jotbot</h1>

                    <button onClick={() => {
                        props.onButtonClick();
                    }} className="group"
                        style={{
                            color: themeColor.headerCloseColor,
                        }}>
                        <IconXmark className="icon-wrapper w-8 duration-300 radius-lg"
                        />
                    </button>
                </div>

                {/* Body */}
                <div className="p-2 h-96 overflow-auto"
                    style={{
                        backgroundColor: themeColor.textAreaBgColor,
                    }}
                >
                    <div className="mt-1 chatArea">

                        {/* Default Bot message */}
                        {/* <Greetings /> */}

                        {/* Message List  */}
                        {messageList.map(item => (
                            item.sender === "bot"

                                // Bot Message
                                ? <div className="flex align-center justify-start mb-1" key={item.id}>
                                    <div className="flex flex-col">
                                        <div className="max-w-52 ml-2 radius-sm h-auto mt-1"
                                            style={{
                                                width: "fit-content",
                                                backgroundColor: themeColor.textBoxBotColor,
                                            }}>
                                            <p className="color-white p-1 break-word">
                                                {item.message}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                // User Message
                                : <div className="flex align-center justify-end" key={item.id}>
                                    <div className="max-w-52 ml-2 radius-sm h-auto bg-yellow-400"
                                        style={{
                                            width: "fit-content",
                                            backgroundColor: themeColor.textBoxUserColor,

                                        }}>
                                        <p className="color-white p-1 break-word">
                                            {item.message}
                                        </p>
                                    </div>
                                </div>
                        ))}

                       {isTyping && <p className="absolute ml-2 radius-sm h-auto mt-1 p-1 color-white" style={{
                            width: "fit-content",
                            backgroundColor: themeColor.textBoxBotColor,
                        }}>typing...</p>}
                    </div>
                </div>

                {/* Search */}
                <div className="flex justify-between items-center py-2 px-3 max-h-14 radius-b-lg border-t-2"
                    style={{
                        backgroundColor: themeColor.textAreaBgColor,
                        borderColor: themeColor.textAreaBorderColor,
                    }}>
                    <SearchInput sendMessage={sendMessage} currentTheme={currentTheme} passLastMessage={passLastMessage} />

                    <button onClick={e => { sendMessage(); passLastMessage() }} >
                        <IconPaperPlaneFilled className="icon-wrapper w-8 h-8 radius-lg p-1 duration-300 color-approvals-light"
                        />
                    </button>
                    <button onClick={toggleThemes} className="relative">
                        <IconPaintbrushFilled className="icon-wrapper w-8 h-8 radius-lg p-1 duration-300 color-approvals-light"
                        />
                    </button>

                    {showThemes && <Themes toggleTheme={toggleTheme} />}
                </div>
            </div>
        </div>
    );

};

export default BotBody;
