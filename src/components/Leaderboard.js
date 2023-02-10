import React, { useState, useEffect } from "react";
import { Text, Input } from "@chakra-ui/react";
import { supabase } from "../api/client";

const LeaderBoard = () => {
    const [scores, setScores] = useState([]);
    const [score, setScore] = useState({ highScore: "", name: "" });
    const { highScore, name } = score;

    useEffect(() => {
        console.log("df");
        fetchPosts();
    }, []);
    async function fetchPosts() {
        const { data } = await supabase.from("scores").select();
        setScores(data);
    }
    async function createPost() {
        console.log(score);
        await supabase
            .from("scores")
            .insert([{ highScore: highScore, name: name }])
            .single();
        fetchPosts();
    }
    const onChange = () => {
        setScore({ ...score, highScore: "5" });
        createPost();
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
        </div>
    );
};

export default LeaderBoard;
