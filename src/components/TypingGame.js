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
import { Flex, createStandaloneToast, Button, Text } from "@chakra-ui/react";
import Instructions from "./Instructions";
import LeaderBoard from "./Leaderboard";

const { toast } = createStandaloneToast();

const TypingGame = () => {
    const totalTiming = 10;
    const characterIncrease = 1;
    const [score, setScore] = useState(0);
    const [typingString, setTypingString] = useState("wasd");
    const [highScore, setHighScore] = useState(
        sessionStorage.getItem("highScore")
    );
    const [leaderboardUpdate, setLeaderboardUpdate] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [counter, setCounter] = useState(totalTiming);
    let {
        states: { chars, charsState, length, currIndex, phase, errorChar },
        actions: { insertTyping, resetTyping, deleteTyping },
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
                } else {
                    resetTyping();
                    toast({
                        title: "End",
                        description: "Click the arrows to retry",
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                    });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

    useEffect(() => {
        if (counter === 0) {
            if (score > highScore) {
                sessionStorage.setItem("highScore", score);
                setHighScore(sessionStorage.getItem("highScore"));
                setLeaderboardUpdate(true);
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
    }, [counter, currIndex, highScore, length, score, startTimer]);

    return (
        <Flex
            bg="brand.background"
            height="100vh"
            flexDirection="column"
            justifyContent="space-between"
            alignItems={"space-around"}
        >
            <Flex flexDirection={"row"} width="100vw" justifyContent={"center"}>
                <Flex width={"33.3vw"}>
                    <Text
                        fontSize="2xl"
                        color={"brand.header"}
                        data-cy="highScore"
                    >
                        High Score: {highScore}
                    </Text>
                </Flex>
                <Flex width={"33.3vw"} justifyContent={"center"}>
                    <Text fontSize="5xl" color={"brand.header"} data-cy="score">
                        {score}
                    </Text>
                </Flex>
                <Flex width={"33.3vw"} justifyContent={"flex-end"}>
                    <LeaderBoard highScore={highScore} />
                    {/* {leaderboardUpdate ? (
                        <LeaderBoard update={leaderboardUpdate} />
                    ) : null} */}
                </Flex>
            </Flex>
            <Flex justifyContent={"space-around"} width={"100vw"}>
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
                    data-cy="character"
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
                            <Flex
                                key={char + index}
                                color={color}
                                flexWrap={"nowrap"}
                                display={"inline-block"}
                                fontSize={"100px"}
                                margin={"5px"}
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
                        );
                    })}
                </div>
                {/* <Text fontSize="5xl" color={"brand.header"}>
                    <span data-cy="counter">{counter}</span>
                </Text> */}
            </Flex>
            <Flex
                flexDirection={"row"}
                width="100%"
                justifyContent={"space-between"}
            >
                <Instructions />
                <Flex
                    alignSelf={"center"}
                    flexDirection={"column"}
                    width="50vw"
                    alignItems={"start"}
                >
                    <Text fontSize="5xl" color={"brand.header"}>
                        <span data-cy="counter">{counter}</span>
                    </Text>
                    <Button onClick={restartGame} data-cy="reset">
                        Restart Game
                    </Button>
                </Flex>
            </Flex>
            {/* {phase === PhaseType.Started ? { counter } : null} */}
        </Flex>
    );
};

export default TypingGame;
