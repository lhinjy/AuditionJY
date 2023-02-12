import React, { useState, useEffect, useCallback } from "react";
import {
    Text,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { supabase } from "../api/client";

const LeaderBoard = (props) => {
    const [scores, setScores] = useState([]);
    const [name, setName] = useState("");
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const getTopLeaderboardScores = 3;
    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        const { data } = await supabase
            .from("scores")
            .select()
            .limit(getTopLeaderboardScores)
            .order("highScore", { ascending: false });
        setScores(data);
        console.log(data);
    }

    async function createPost() {
        await supabase
            .from("scores")
            .insert({ highScore: props.highScore, name: name });
        fetchPosts();
        setName("");
    }

    const updateLeaderboard = useCallback(() => {
        return scores.map((score) => {
            return (
                <Tr>
                    <Td>{score.highScore}</Td>
                    <Td>{score.name} </Td>
                </Tr>
            );
        });
    }, [scores]);

    const onChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };
    const inputHighScore = () => {
        // just index things
        const lowestLeaderboardHighscore =
            scores[getTopLeaderboardScores - 1].highScore;

        if (props.highScore > lowestLeaderboardHighscore) {
            return (
                <div>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Enter your name</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input
                                    placeholder="name"
                                    size="lg"
                                    value={name}
                                    onChange={onChange}
                                />
                                <div onClick={onClose}>
                                    <Button onClick={createPost}>
                                        To the leaderboard!
                                    </Button>
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </div>
            );
        }
    };

    return (
        <div>
            <Text>Leaderboard</Text>
            {props.leaderboardUpdate ? inputHighScore() : null}
            <TableContainer width="20vw">
                <Table size="sm" variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>HighScore</Th>
                            <Th>Name</Th>
                        </Tr>
                        {updateLeaderboard()}
                    </Thead>
                    <Tbody></Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LeaderBoard;
