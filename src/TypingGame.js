import React, { useState, useEffect } from "react";
import useTypingGame from "react-typing-game-hook";
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
    const [value, setValue] = useState({ data: [] });
    const [index, setIndex] = useState(0);
    const {
        states: { chars, charsState },
        actions: { insertTyping, resetTyping, deleteTyping },
    } = useTypingGame(typingString);

    useEffect(() => {
        let dataValue = value["data"];
        typingString.split("").map((character) => {
            console.log(charsState);
            switch (character) {
                case "w":
                    dataValue.push(<FaArrowAltCircleUp />);
                    break;
                case "a":
                    dataValue.push(<FaArrowAltCircleLeft />);
                    break;
                case "s":
                    dataValue.push(<FaArrowAltCircleDown />);
                    break;
                case "d":
                    dataValue.push(<FaArrowAltCircleRight />);
                    break;
                default:
                    break;
            }
        });
        setValue({ data: dataValue });
        console.log(value);
    }, []);

    // const onClick = (index, character) => {
    //     console.log(index);
    //     console.log(charsState);
    //     console.log(charsState[index]);
    //     // const color = charsState[index] === 0 ? "green" : "red";
    //     // value["data"][index] = <FaArrowAltCircleDown color={color} />;
    // };
    // Capture and display!
    return (
        <h1
            onKeyDown={(e) => {
                setIndex((index) => index + 1);
                const key = e.key;
                if (key === "Escape") {
                    resetTyping();
                } else if (key === "Backspace") {
                    deleteTyping(false);
                } else if (key.length === 1) {
                    insertTyping(key);
                }
                e.preventDefault();
                // onClick(index);
            }}
            tabIndex={0}
        >
            {chars.split("").map((char, index) => {
                let state = charsState[index];
                let color =
                    state === 0 ? "black" : state === 1 ? "green" : "red";
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
    );
};

export default TypingGame;
