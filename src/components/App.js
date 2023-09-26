import React, { useState, useEffect, useRef } from 'react';
// import '@jotforminc/jotform.css'

// import BotBody from "./BotBody";
import BotIcon from "./BotIcon";
import ApiResponse from "./ApiResponse.js";
import "../css/variables.css";
import "../css/style.css";
import SearchInput from "./SearchInput";
import Themes from "./Themes";
import themes from "../theme/themes.js"
import Greetings from "./Greetings";
import jotformBG from "../assets/png/jotform-bg.png"

import {AiOutlineClose} from 'react-icons/ai';
import {BsFillBrushFill} from 'react-icons/bs';
import {BiSolidSend} from 'react-icons/bi';

function App() {

  const [showIcon, setshowIcon] = useState(true);
  const [showBody, setShowBody] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [returnMessage, setReturnMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showThemes, setShowThemes] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [isTyping, setIsTyping] = useState(true);
  const themeColor = themes[currentTheme];
  const input = document.querySelector("input");
  let timeoutId;
  let inputValue = "";
  // const apiKey = process.env.API_KEY;

  const toggleIcon = () => {
    setshowIcon(false);
    setShowBody(true);
    // setBotMessage("")
  };

  const toggleBody = () => {
    setshowIcon(true);
    setShowBody(false);
  };

  const passLastMessage = (e) => {

    console.log(e?.target?.value)
  }

  const passBotMessage = (botMessage) => {
    setBotMessage(botMessage)
    // console.log("BOT MESSAGE AAAAAAAAAAAAAAAAAAAAAAAAA: ", botMessage)
  }

  const returnLastMessage = (returnMessage) => {
    setReturnMessage(returnMessage);
  }

  // // console.log("props.botMessage TOP OF BOTBODY: ", props.botMessage)
  // console.log("props.botMessage TYPE OF TOP OF BOTBODY: ", typeof {botMessage})

  // // const lastMessage = messageList[messageList.length]?.message

  const toggleTheme = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  const getBotMessage = () => {
    const botAnswer = {
      id: messageList.length,
      sender: "bot",
      message: botMessage,
    };


    if (botAnswer.message === "" && messageList.length < 1) {
      botAnswer.message = "👋 Hello there! Welcome to our chatbot service. How can I assist you today?"
      setMessageList(messageList => [...messageList, botAnswer]);
      console.log("THIS İS UNDEFINED")
    } else if (botAnswer.message === undefined && messageList.length >= 1) {
      botAnswer.message = "I couldn't understand what you meant, please be more explanatory."
      setMessageList(messageList => [...messageList, botAnswer]);
      console.log("THIS İS UNDEFINEDDDDD")
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
      message: input?.value,
    };
    setLastMessage(newMessage.message);

    if (input?.value !== "") {
      setMessageList(messageList => [...messageList, newMessage])
      inputValue = input?.value;
      // console.log(inputValue)
      if (input.value) {
        input.value = "";
      }

      input?.focus();
    }
  };

  // const emptyValue = () => {
  //   setEmptyInput("");
  // }

  // console.log("messageList:", messageList)

  useEffect(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(getBotMessage, 2000)

    setIsTyping(true);
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000)

    return () => clearTimeout(typingTimeout);
  }, [returnMessage])

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

  const messagesEndRef = useRef(null);
  const scrolToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  // Load message list 
  useEffect(() => {
    const storedMessages = localStorage.getItem("messageList");
    if (storedMessages) {
      setMessageList(JSON.parse(storedMessages));
    }
  }, [returnMessage]);

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

  useEffect(() => {
    scrolToBottom();
  }, [messageList, showBody]);

  return (
    <div className='bg-gradient-to-b from-white via-white to-black bg-opacity-50 w-full h-screen' style={{
      background: `url(${jotformBG})`,
      backgroundSize: "cover",
      backdropFilter: "blur(4px)",
    }}>
      {showIcon && <BotIcon onButtonClick={toggleIcon} className="w-full h-full"/>}
      {/* {showBody && <BotBody onButtonClick={toggleBody} sendLastMessage={passLastMessage} botMessage={botMessage} returnMessage={returnMessage} />} */}

      {showBody && <div className="w-full h-full relative">
        <div className="absolute right-2 bottom-2 w-96 ">

          {/* Header */}
          <div className="flex justify-between items-center py-2 px-3 h-14 rounded-t-lg border-b-2"
            style={{
              backgroundColor: themeColor.headerBgColor,
              borderColor: themeColor.textAreaBorderColor,
            }}>
            <h1 className="title text-4xl font-bold relative top-1"
              style={{
                color: themeColor.headerTitleColor,
              }}>Jotbot</h1>

            <button onClick={toggleBody} className="group relative "
              style={{
                color: themeColor.headerCloseColor,
              }}>
              <AiOutlineClose className="icon-wrapper w-8 h-8 p-1 duration-300 m-1 rounded-sm"
              />

            </button>
          </div>

          {/* Body */}
          <div className="p-2 h-96 overflow-auto"
            style={{
              backgroundColor: themeColor.textAreaBgColor,
            }}
          >
            <div className="mt-1 chatArea relative">

              {/* Default Bot message */}
              {/* <Greetings /> */}

              {/* Message List  */}
              {messageList.map(item => (
                item.sender === "bot"

                  // Bot Message
                  ? <div className="flex align-center justify-start mb-1" key={item.id}>
                    <div className="flex flex-col">
                      <div className="ml-2 rounded-sm h-auto"
                        style={{
                          width: "fit-content",
                          maxWidth: "16rem",
                          backgroundColor: themeColor.textBoxBotColor,
                        }}>
                        <p className="text-white p-1 break-word">
                          {item.message}
                        </p>
                      </div>

                    </div>
                  </div>

                  // User Message
                  : <div className="flex align-center justify-end mb-1" key={item.id}>
                    <div className=" ml-2 rounded-sm h-auto bg-yellow-400"
                      style={{
                        width: "fit-content",
                        maxWidth: "16rem",
                        backgroundColor: themeColor.textBoxUserColor,

                      }}>
                      <p className="text-white p-1 break-word">
                        {item.message}
                      </p>
                    </div>
                  </div>
              ))}

              {isTyping && <p className="absolute ml-2 radius-sm h-auto mt-1 p-1 text-white" style={{
                width: "fit-content",
                backgroundColor: themeColor.textBoxBotColor,
              }}>typing...</p>}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Search */}
          <div className="flex justify-between items-center py-2 px-3 max-h-14 rounded-b-lg border-t-2"
            style={{
              backgroundColor: themeColor.textAreaBgColor,
              borderColor: themeColor.textAreaBorderColor,
            }}>
            <SearchInput sendMessage={sendMessage} currentTheme={currentTheme} passLastMessage={passLastMessage} />

            <button onClick={e => { sendMessage(); passLastMessage() }} >
              <BiSolidSend className="icon-wrapper search-icons w-8 h-8 radius-lg p-1 duration-300 rounded-sm" style={{
              }}
              />
            </button>
            <button onClick={toggleThemes} className="relative">
              <BsFillBrushFill className="icon-wrapper search-icons w-8 h-8 radius-lg p-1 duration-300 rounded-sm" style={{
              }}
              />
            </button>

            {showThemes && <Themes toggleTheme={toggleTheme} />}
          </div>
        </div>
      </div>}      

      <ApiResponse lastMessage={lastMessage} botLastMessage={passBotMessage} returnLastMessageFromBot={returnLastMessage} />
    </div>

    
  );
}



export default App;
