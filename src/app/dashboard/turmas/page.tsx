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
import { AddNewClass } from "./AddNewClass";

async function getClasses(params: any) {
    const { data } = await api.get("/turma", {
        params,
    });

    const classes = data.data.map((c: any) => ({
        ...c,
        created_date: new Date(Date.parse(c.created_at)).toLocaleDateString(
            "pt-BR",
            { minute: "2-digit", hour: "2-digit" }
        ),
    }));

    return { ...data, data: classes };
}

export default function Comentarios() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { state: pagination, dispatch } = usePagination();

    function setPage(payload: number) {
        dispatch({ type: "setPage", payload });
    }

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["getClasses", pagination],
        queryFn: () => getClasses(pagination),
        initialData: { data: [], links: [] },
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <AddNewClass isOpen={isOpen} onClose={onClose} refetch={refetch} />

            <Card w="100%" h="100%">
                <CardHeader display="flex" justifyContent="space-between">
                    <Heading>Turmas</Heading>
                    <Button colorScheme="green" gap="2" onClick={onOpen}>
                        <Icon as={MdAdd} /> Nova turma
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
                                        <Th>Título</Th>
                                        <Th>Disciplinas</Th>
                                        <Th>Criado em</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.data.map((comment: any) => (
                                        <Tr key={comment.id}>
                                            <Td>{comment.id}</Td>
                                            <Td>{comment.titulo}</Td>
                                            <Td>
                                                {comment.disciplina.map(
                                                    (d: any) => `${d.titulo}, `
                                                )}
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
