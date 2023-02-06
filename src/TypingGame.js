import React, { useState, useEffect } from "react";
import useTypingGame, {
    CharStateType,
    PhaseType,
} from "react-typing-game-hook";
import {
    FaArrowAltCircleDown,
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight,
    FaArrowAltCircleUp,
} from "react-icons/fa";
// import { Box, Container } from "@chakra-ui/react";
import "./typingGame.css";

const TypingGame = () => {
    const typingString = "wasd";
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    // const [value, setValue] = useState({ data: [] });
    // const [index, setIndex] = useState(0);
    const {
        states: {
            chars,
            charsState,
            length,
            currIndex,
            currChar,
            correctChar,
            phase,
            errorChar,
        },
        actions: { insertTyping, resetTyping, deleteTyping },
    } = useTypingGame(typingString);

    // useEffect(() => {
    //     let dataValue = value["data"];
    //     typingString.split("").map((character) => {
    //         console.log(charsState);
    //         switch (character) {
    //             case "w":
    //                 dataValue.push(<FaArrowAltCircleUp />);
    //                 break;
    //             case "a":
    //                 dataValue.push(<FaArrowAltCircleLeft />);
    //                 break;
    //             case "s":
    //                 dataValue.push(<FaArrowAltCircleDown />);
    //                 break;
    //             case "d":
    //                 dataValue.push(<FaArrowAltCircleRight />);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    //     setValue({ data: dataValue });
    //     console.log(value);
    // }, []);

    useEffect(() => {
        if (currIndex === length - 1) {
            if (errorChar === 0) {
                setTotalScore((prev) => prev + 1);
            }
        }
    }, [phase]);
    return (
        <div>
            <div style={{ fontSize: "50px" }}>{totalScore}</div>
            <h1
                onKeyDown={(e) => {
                    const key = e.key;
                    if (key === "Escape") {
                        resetTyping();
                    } else if (key === "Backspace") {
                        deleteTyping(false);
                    } else if (key.length === 1) {
                        insertTyping(key);
                    }
                    e.preventDefault();
                }}
                tabIndex={0}
            >
                {chars.split("").map((char, index) => {
                    let state = charsState[index];
                    let color =
                        state === CharStateType.Incomplete
                            ? "black"
                            : state === CharStateType.Correct
                            ? "green"
                            : "red";
                    if (currIndex >= length) {
                        phase = PhaseType.Ended;
                    }
                    // } else if (currIndex === length - 1) {
                    //     if (errorChar > 1) {
                    //         setScore(0);
                    //         console.log(score);
                    //     }
                    // }
                    return (
                        <>
                            <div
                                key={char + index}
                                style={{ color }}
                                className="row flex"
                            >
                                {char === "w" ? (
                                    <FaArrowAltCircleUp />
                                ) : char === "a" ? (
                                    <FaArrowAltCircleLeft />
                                ) : char === "s" ? (
                                    <FaArrowAltCircleDown />
                                ) : char === "d" ? (
                                    <FaArrowAltCircleRight />
                                ) : null}
                            </div>
                        </>
                    );
                })}
                {/* {value["data"].map((x) => x)} */}
            </h1>
        </div>
    );
};

export default TypingGame;
