import React from 'react'
import themes from "../theme/themes.js"

const SearchInput = (props) => {
  const themeColor = themes[props.currentTheme];

  document.addEventListener('DOMContentLoaded', () => {
    // console.log("Input value",input?.value);
  });

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      props.sendMessage();
      props.passLastMessage();
      console.log("FUNCTION RUN ")
    }
  }

  return (
    <input type="text" placeholder='Search for answers...' onKeyDown={handleKeyPress}
      className='input w-64 h-8 rounded-lg pl-2 border-2 text-sm'
      style={{
        borderColor: themeColor.searchAreaInputOutlineColor,
        color: themeColor.searchAreaInputColor,
        backgroundColor: themeColor.searchAreaInputBgColor,
        outlineColor: themeColor.searchAreaInputOutlineColor,
      }} />
  )
}

export default SearchInput