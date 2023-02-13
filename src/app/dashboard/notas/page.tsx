"use client";

import { Pagination } from "@/app/Global/components/Pagination";
import { usePagination } from "@/hooks/usePaginations";
import { api } from "@/services/axios";
import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Icon,
    useDisclosure,
    Spinner,
    Flex,
    CardFooter,
    Badge,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { MdAdd } from "react-icons/md";
import { AddNewScore } from "./AddNewScore";

async function getScores(params: any) {
    const { data } = await api.get("/nota", {
        params,
    });

    const scores = data.data.map((score: any) => ({
        ...score,
        created_date: new Date(Date.parse(score.created_at)).toLocaleDateString(
            "pt-BR",
            { minute: "2-digit", hour: "2-digit" }
        ),
    }));

    return { ...data, data: scores };
}

export default function Notas() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { state: pagination, dispatch } = usePagination();

    function setPage(payload: number) {
        dispatch({ type: "setPage", payload });
    }

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["getScores", pagination],
        queryFn: () => getScores(pagination),
        initialData: { data: [], links: [] },
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <AddNewScore isOpen={isOpen} onClose={onClose} refetch={refetch} />

            <Card w="100%" h="100%">
                <CardHeader display="flex" justifyContent="space-between">
                    <Heading>Notas</Heading>
                    <Button colorScheme="green" gap="2" onClick={onOpen}>
                        <Icon as={MdAdd} /> Novo lançamento de nota
                    </Button>
                </CardHeader>

                <CardBody>
                    {isFetching ? (
                        <Flex w="100%" h="100%" align="center" justify="center">
                            <Spinner />
                        </Flex>
                    ) : (
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Registro</Th>
                                        <Th>Valor</Th>
                                        <Th>Aluno</Th>
                                        <Th>Turma</Th>
                                        <Th>Disciplina</Th>
                                        <Th>Trimestre</Th>
                                        <Th>Criado em</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.data.map((comment: any) => (
                                        <Tr key={comment.id}>
                                            <Td>{comment.id}</Td>
                                            <Td fontFamily="monospace">
                                                <Badge
                                                    colorScheme={
                                                        comment.valor < 12
                                                            ? "red"
                                                            : comment.valor < 17
                                                            ? "yellow"
                                                            : "green"
                                                    }
                                                >
                                                    {comment.valor}
                                                </Badge>
                                            </Td>
                                            <Td>{comment.aluno.nome}</Td>
                                            <Td>{comment.turma.titulo}</Td>
                                            <Td>{comment.disciplina.titulo}</Td>
                                            <Td>
                                                <Badge colorScheme="pink">
                                                    {comment.trimestre}
                                                </Badge>
                                            </Td>
                                            <Td fontFamily="monospace">
                                                {comment.created_date}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}
                </CardBody>
                <CardFooter>
                    <Pagination pagination={data} setPage={setPage} />
                </CardFooter>
            </Card>
        </>
    );
}
