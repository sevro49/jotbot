import React from 'react'

const Greetings = () => {
    return (
        <div className="flex align-center justify-start mb-1 transition delay-300 ">
            <div className="flex flex-col">
                <div className="max-w-52 ml-2 radius-sm h-auto mt-1"
                    style={{
                        width: "fit-content",
                        backgroundColor: "var(--text-box__bot)",
                    }}>
                    <p className="color-white p-1 break-word">
                        👋 Hello there! Welcome to our chatbot service. How can I assist you today?
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Greetings