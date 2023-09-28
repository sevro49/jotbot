import React from 'react';
import submissions from "./bot-submissions.json";

const ApiResponse = (props) => {

    // Array to store data seperately as question, answer and tag
    let bestMatchIndex = -1;
    let botAnswer = "";


    let responseArray = [];
    let tagArray = [];
    const lastMessage = props.lastMessage;

    // Store json value into an array
    responseArray = submissions;

    // Array of tags
    tagArray = responseArray.map(responseArray => responseArray.Tag.toLowerCase());

    // Array of array of tags
    let newTag = tagArray?.map(innerArray => innerArray.split(" "));
    const lastMessageArr = lastMessage?.split(" ");

    // Find best match according to last Message inside newTag Array
    function findBestMatch(newTag, lastMessageArr) {
        let bestMatch = [];
        let highestCount = 0;

        newTag.forEach((tagArray, index) => {
            const tagCounts = {};

            tagArray.forEach(tag => {
                const count = lastMessageArr?.filter(word => word === tag).length;
                tagCounts[tag] = count;
            });

            const totalMatches = Object.values(tagCounts).reduce((a, b) => a + b, 0);

            if (totalMatches > highestCount) {
                bestMatch = tagArray;
                highestCount = totalMatches;
                bestMatchIndex = index;
            }
        });

        if (bestMatch.length === 0) {
            bestMatchIndex = responseArray.length;
            return;
        }
    }
    findBestMatch(newTag, lastMessageArr);

    botAnswer = responseArray[bestMatchIndex]?.Answer;
    const passBotMessage = () => {
        props.botLastMessage(botAnswer);
    }

    const returnLastMessage = () => {
        props.returnLastMessageFromBot(lastMessage);
    }

    passBotMessage();
    returnLastMessage();

    return (
        <div></div>
    )
}

export default ApiResponse