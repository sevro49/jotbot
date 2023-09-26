import React from 'react'
import botIcon from "../assets/png/Jotbot.png"

const BotIcon = (props) => {

    return (
        <div className='h-full w-full relative '>
            <a href="#" className='absolute right-3 bottom-3 hover:scale-110' onClick={() => {
                props.onButtonClick();
            }}>
                <img src={botIcon} alt="" className='w-16 m-2 rounded-full hover:scale-110 duration-300' />
            </a>
        </div>
    )
}

export default BotIcon

