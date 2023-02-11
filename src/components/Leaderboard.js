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
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react";
import { supabase } from "../api/client";

const LeaderBoard = (props) => {
    const [scores, setScores] = useState([]);
    // const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        const { data } = await supabase
            .from("scores")
            .select()
            .limit(3)
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
        return (
            <div>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="name"
                                size="lg"
                                value={name}
                                onChange={onChange}
                            />
                            <div onClick={onClose}>
                                <Button onClick={createPost}>Go!</Button>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        );
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
