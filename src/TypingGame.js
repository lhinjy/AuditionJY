import React, { useState, useEffect, useCallback } from "react";
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
import "./typingGame.css";
import { Card, Flex, createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer, toast } = createStandaloneToast();

const TypingGame = () => {
    const typingString = "wasd";
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
    const updateString = useCallback(() => {
        console.log("df");
    }, [totalScore, phase]);
    useEffect(() => {
        // console.log(phase);
        if (currIndex === length - 1) {
            if (errorChar === 0) {
                setTotalScore((prev) => prev + 1);
            } else if (errorChar > 0) {
                resetTyping();
                toast({
                    title: "Failed",
                    description: "Click the arrows to retry",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
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
                    // if (currIndex >= length) {
                    //     phase = PhaseType.Ended;
                    // }
                    // } else if (currIndex === length - 1) {
                    //     if (errorChar > 1) {
                    //         setScore(0);
                    //         console.log(score);
                    //     }
                    // }
                    return (
                        <>
                            <Flex
                                key={char + index}
                                style={{ color }}
                                flexDirection={"row"}
                                flexWrap={"nowrap"}
                                display={"inline-block"}
                                fontSize={"3vw"}
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
                            </Flex>
                        </>
                    );
                })}
                {updateString}
            </h1>
        </div>
    );
};

export default TypingGame;
