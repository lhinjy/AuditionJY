import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { supabase } from "../api/client";

const LeaderBoard = (props) => {
    const [scores, setScores] = useState([]);
    // const [score, setScore] = useState(0);
    const [name, setName] = useState("");
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
        console.log(props.highScore);
        const { data } = await supabase
            .from("scores")
            .insert({ highScore: props.highScore, name: name });
        fetchPosts();
    }
    const onChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };
    return (
        <div>
            <Text>Leaderboard</Text>
            <Input
                placeholder="name"
                size="lg"
                value={name}
                onChange={onChange}
            />
            <Button onClick={createPost}>sad</Button>
            <TableContainer width="20vw">
                <Table size="sm" variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>HighScore</Th>

                            <Th>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {scores.map((score) => {
                            console.log(score);
                            return (
                                <Tr>
                                    <Td>{score.highScore}</Td>
                                    <Td>{score.name} </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LeaderBoard;
