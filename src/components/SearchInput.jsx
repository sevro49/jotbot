import React from 'react'
import themes from "../theme/themes.js"

const SearchInput = (props) => {
  const themeColor = themes[props.currentTheme];

  document.addEventListener('DOMContentLoaded', () => {
    // console.log("Input value",input?.value);
  });

  const handleKeyPress = e => {
    if(e.keyCode === 13){     
      props.sendMessage();
      props.passLastMessage();    
      console.log("FUNCTION RUN ")
    }
  }

  return (
    <input type="text" placeholder='Search for answers...' onKeyDown={handleKeyPress} 
      className='input w-56 h-8 radius-lg pl-2 focus:outline-navy-500 focus:outline-opacity-20 outline-2 outline-transparent text-sm' 
      style={{
        
        color: themeColor.searchAreaInputColor,
        backgroundColor: themeColor.searchAreaInputBgColor,
        outlineColor: themeColor.searchAreaInputOutlineColor,
    }}/>
  )
}

export default SearchInput