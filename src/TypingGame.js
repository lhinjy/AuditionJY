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
import {
    Card,
    Flex,
    createStandaloneToast,
    Button,
    Box,
    Text,
} from "@chakra-ui/react";
const { toast } = createStandaloneToast();

const TypingGame = () => {
    const [typingString, setTypingString] = useState("wasd");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        sessionStorage.getItem("highScore")
    );
    const [startTimer, setStartTimer] = useState(false);
    const totalTiming = 2;
    const characterIncrease = 1;
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
        actions: { insertTyping, resetTyping, deleteTyping, endTyping },
    } = useTypingGame(typingString);

    const getNextLevelString = () => {
        const availableCharacters = ["w", "a", "s", "d"];
        const nextLength = typingString.length + characterIncrease;
        let randomString = "";
        for (let i = 0; i < nextLength; i++) {
            const randomCharacter =
                availableCharacters[
                    Math.floor(Math.random() * availableCharacters.length)
                ];
            randomString = randomString + randomCharacter;
        }
        setTypingString(randomString);
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

    const restartGame = () => {
        setTypingString("wasd");
        setScore(0);
        setStartTimer(false);
        setCounter(totalTiming);
    };

    useEffect(() => {
        if (phase === PhaseType.Started && !startTimer) {
            setStartTimer(true);
        }
        if (phase === PhaseType.Ended && counter !== 0) {
            // proceed to next stage: counter is still running
            if (currIndex === length - 1) {
                if (errorChar === 0) {
                    setScore((prev) => prev + 1);
                    getNextLevelString();
                    toast({
                        title: "Success",
                        description: "Moving to the next stage",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    phase = PhaseType.Started;
                } else {
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

            //counter is zero

            // if (errorChar === 0 && currIndex === length - 1) {
            //     // console.log(currIndex);
            //     // console.log(length)
            //     setScore((prev) => prev + 1);
            //     getNextLevelString();
            //     toast({
            //         title: "Success",
            //         description: "Moving to the next stage",
            //         status: "success",
            //         duration: 1000,
            //         isClosable: true,
            //     });
            //     phase = PhaseType.Started;
            // } else if (errorChar > 0) {
            //     resetTyping();
            //     toast({
            //         title: "Failed",
            //         description: "Click the arrows to retry",
            //         status: "error",
            //         duration: 1000,
            //         isClosable: true,
            //     });
            // } else {
            //     resetTyping();
            //     toast({
            //         title: "Failed",
            //         description: "Time out",
            //         status: "error",
            //         duration: 1000,
            //         isClosable: true,
            //     });
            // }
        }
        // if (counter === 0) {
        //     toast({
        //         title: "Failed",
        //         description: "Time out",
        //         status: "error",
        //         duration: 1000,
        //         isClosable: true,
        //     });
        // }
    }, [phase]);

    useEffect(() => {
        if (counter === 0) {
            if (score > highScore) {
                sessionStorage.setItem("highScore", score);
                setHighScore(sessionStorage.getItem("highScore"));
            }
            if (currIndex < length - 1) {
                toast({
                    title: "Failed",
                    description: "Time out",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            // timer will go into negative without this return
            return;
        }
        if (startTimer) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
    }, [counter, startTimer]);

    return (
        <div bg="brand.background">
            <Flex flexDirection={"column"} width="100vw" height="90vh">
                <div>
                    <Flex>
                        <Text
                            fontSize="2xl"
                            color={"brand.header"}
                            padding={"10px"}
                        >
                            High Score: {highScore}
                        </Text>
                    </Flex>
                    <Text fontSize="5xl" color={"brand.header"}>
                        {score}
                    </Text>
                </div>
                <Flex
                    flexDirection={"column"}
                    height="100%"
                    justifyContent={"center"}
                >
                    <div style={{ margin: "50px" }}>
                        <div
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
                                        ? "brand.base"
                                        : state === CharStateType.Correct
                                        ? "brand.green"
                                        : "brand.red";
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
                                            color={color}
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
                        </div>
                    </div>
                    <Text fontSize="5xl" color={"brand.header"}>
                        {counter}
                    </Text>
                </Flex>
            </Flex>
            <Button onClick={restartGame}>Restart Game</Button>
            {/* {phase === PhaseType.Started ? { counter } : null} */}
        </div>
    );
};

export default TypingGame;
