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
    const [typingString, setTypingString] = useState("wasd");
    const [totalScore, setTotalScore] = useState(0);
    const totalTiming = 30;
    const characterIncrease = 2;
    const [counter, setCounter] = useState(totalTiming);
    let {
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

    const getRandomString = () => {
        const availableCharacters = ["w", "a", "s", "d"];
        const nextStringLength = typingString.length + characterIncrease;
        let randomString = "";
        console.log(nextStringLength);
        for (let i = 0; i < nextStringLength; i++) {
            const randomCharacter =
                availableCharacters[
                    Math.floor(Math.random() * availableCharacters.length)
                ];
            randomString = randomString + randomCharacter;
            console.log(randomString);
            setTypingString(randomString);
        }
        // console.log(typingString);
        return randomString;
    };
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
        if (phase === PhaseType.Ended) {
            if (errorChar === 0) {
                setTotalScore((prev) => prev + 1);
                setTypingString(getRandomString());
                toast({
                    title: "Success",
                    description: "Moving to the next stage",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                });
                phase = PhaseType.Started;
            } else if (errorChar > 0) {
                resetTyping();
                toast({
                    title: "Failed",
                    description: "Click the arrows to retry",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
            }
        }
    }, [phase]);

    useEffect(() => {
        if (counter === 0) {
            return;
        }
        if (phase === PhaseType.Started) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
    }, [phase, counter]);
    return (
        <div>
            <div style={{ fontSize: "50px" }}>{totalScore}</div>
            <h1
                onKeyDown={(e) => {
                    const key = e.key;
                    if (key === "q") {
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
            </h1>
            {counter}
            {/* {phase === PhaseType.Started ? { counter } : null} */}
        </div>
    );
};

export default TypingGame;
