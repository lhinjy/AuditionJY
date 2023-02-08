import React from "react";
import {
    FaArrowAltCircleDown,
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight,
    FaArrowAltCircleUp,
} from "react-icons/fa";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
const Instructions = () => {
    return (
        <div>
            <TableContainer width="20vw">
                <Table size="sm" variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>Key</Th>
                            <Th>Meaning</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>w</Td>
                            <Td>
                                <FaArrowAltCircleUp />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>a</Td>
                            <Td>
                                <FaArrowAltCircleLeft />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>s</Td>
                            <Td>
                                <FaArrowAltCircleDown />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>d</Td>
                            <Td>
                                <FaArrowAltCircleRight />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>q</Td>
                            <Td>Reset stage</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Instructions;
