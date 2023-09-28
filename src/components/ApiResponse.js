import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx";
import submissions from "./bot-submissions.json";

const ApiResponse = (props) => {

    const [responseData, setResponseData] = useState("");
    // Array to store data seperately as question, answer and tag
    let bestMatchIndex = -1;
    let botAnswer = "";

    const [data, setData] = useState([]);

    // const [bestMatchIndex, setBestMatchIndex] = useState(-1)
    let responseArray = [];
    let tagArray = [];
    const lastMessage = props.lastMessage;
    console.log("LAST MESSAGE", lastMessage)
    console.log("props.lastMessage", props.lastMessage)

    // Fetch the submissions through jotform api
    // useEffect(async () => {
    //     const response = await fetch(`https://e-guler.jotform.dev/API/form/232422239086050/submissions?limit=100apiKey=64a3080e2fad61debe03f79350fe21e2`);
    //     const data = await response.json();
    //     setResponseData(data);
    //     // console.log("typeof: " + typeof data)
    //     // console.log("DATA:" + data.content)

    //     //     data.content.forEach((item, index) => {
    //     //     responseArray[index] = {
    //     //         question: item.answers[3]?.answer,
    //     //         answer: item.answers[4]?.answer,
    //     //         tag: item.answers[5]?.answer,
    //     //     };
    //     // })
    // }, []);

    console.log("JSON FILE", submissions)
    console.log("JSON FILE", submissions[0].Answer)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://e-guler.jotform.dev/API/form/232422239086050/submissions?limit=100apiKey=64a3080e2fad61debe03f79350fe21e2');
            const data = await response.json();
            // console.log(data.content[0].answers[3]?.answer)
            setResponseData(data);

            // data.content.forEach((item, index) => {
            //     responseArray[index] = {
            //         question: item.answers[3]?.answer,
            //         answer: item.answers[4]?.answer,
            //         tag: item.answers[5]?.answer,
            //     };
            // })

        }
    }, []);

    // submissions?.content?.forEach((item, index) => {
    //     responseArray[index] = {
    //         question: submissions[item].Question,
    //         answer: submissions[item].Answer,
    //         tag: submissions[item].Tag,
    //     };
        
    // });

    responseArray = submissions;

    console.log("responseData content",responseArray)
    // console.log(responseData?.content?.[0].answers[3]?.answer)
    // console.log(responseData?.content?.[0].answers[4]?.answer)
    // console.log(responseData?.content?.[0].answers[5]?.answer)
    // console.log(responseArray[0]?.answer)
    // console.log(responseArray[0]?.tag)
    // console.log("lastMessage (apiResponse.js): " + lastMessage);

    // to make toLowerCase each tag
    // responseArray.forEach((item, index) => {
    //     tagArray[index] = [
    //         item?.tag.toLowerCase()
    //     ]
    // })

    // tagArray.forEach((item, index) => {

    // })

    tagArray = responseArray.map(responseArray => responseArray.Tag.toLowerCase());
    console.log("TAG ARRAY", tagArray)

    // to print all tags lowerCase
    // tagArray.forEach((item) => {
    //     console.log("TAG:" ,item[0])
    //     console.log("TAG-item:" ,item)
    // })

    // console.log(tagArray?.[tagArray.length - 1]?.tag)
    // console.log(typeof tagArray?.[tagArray.length - 1]?.tag)

    let newTag = tagArray?.map(innerArray => innerArray.split(" "));
    console.log("LAST MESSAGE:", lastMessage)
    console.log("new TAG: ", newTag)

    // console.log("new TAG: ", newTag?.[0]);
    // console.log("new TAG: ", newTag?.[0]?.[0]);
    // console.log("new TAG: ", newTag?.[0]?.[1]);

    const lastMessageArr = lastMessage?.split(" ");
    console.log(lastMessageArr)
    // console.log(lastMessageArr?.[0])
    // console.log(lastMessageArr?.[1])

    // lastMessageArr?.[0] === newTag?.[0]?.[0] ? console.log(" lastMessageArr?.[0]: ", lastMessageArr?.[0], "newTag?.[0] ", newTag?.[0]?.[0]) : console.log("THEY'RE NOT MATCH!! ", lastMessageArr?.[0],newTag?.[0]?.[0]);
    // newTag = newTag?.split(" ");
    // console.log("new TAG: ", newTag?.[1]);


    // function findBestMatch(newTag, lastMessageArr) {
    //     let bestMatch = [];
    //     let highestCount = 0;
    //     let bestMatchIndex = -1;

    //     newTag.forEach((tagArray, index) => {
    //       const tagCounts = {};

    //       tagArray.forEach(tag => {
    //         const count = lastMessageArr.filter(word => word === tag).length;
    //         tagCounts[tag] = count;
    //       });

    //       const totalMatches = Object.values(tagCounts).reduce((a, b) => a + b, 0);

    //       if (totalMatches > highestCount) {
    //         bestMatch = tagArray;
    //         highestCount = totalMatches;
    //         bestMatchIndex = index;
    //       }
    //     });

    //     if (bestMatch.length === 0) {
    //       console.log("No matches found.");
    //       return;
    //     }

    //     console.log(`The best match is [${bestMatch}] with a count of ${highestCount}.`);
    //     console.log(`The index of best match is ${bestMatchIndex}.`);
    //   }

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
            console.log("No matches found.");
            bestMatchIndex = responseArray.length;
            return;
        }

        console.log(`The best match is [${bestMatch}] with a count of ${highestCount}.`);
        console.log(`The index of best match is ${bestMatchIndex}.`);
        // setBestMatchIndex(bestMatchIndex);

    }
    findBestMatch(newTag, lastMessageArr);


    //   console.log("BEST MATCH INDEX: ", bestMatchIndex)
    //   console.log(responseArray[bestMatchIndex]?.answer)
    // console.log("BOT ANSWERSSSSS", botAnswer)

    botAnswer = responseArray[bestMatchIndex]?.Answer;
    console.log("botanswer", botAnswer)
    const passBotMessage = () => {
        props.botLastMessage(botAnswer);
        console.log("BOT ANSWER", botAnswer)
    }

    const returnLastMessage = () => {
        props.returnLastMessageFromBot(lastMessage);
    }

    passBotMessage();
    returnLastMessage();

    // useEffect(() => {
    // botAnswer = responseArray[bestMatchIndex]?.answer;
    // passBotMessage();

    // }, [responseArray, lastMessage, responseArray.length]);

    return (
        <div></div>
    )
}

export default ApiResponse