import React from 'react'
import botIcon from "../assets/png/Jotbot.png"

const BotIcon = (props) => {

    return (
        <div className='h-full w-full relative'>
            <a href="#" className='absolute right-2 bottom-2 hover:scale-130' onClick={() => {
                props.onButtonClick();
            }}>
                <img src={botIcon} alt="" className='w-16 m-2 radius-full hover:scale-130 transform duration-300' />
            </a>
        </div>
    )
}

export default BotIcon

