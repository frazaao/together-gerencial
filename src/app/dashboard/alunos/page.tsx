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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { MdAdd } from "react-icons/md";
import { AddNewStudent } from "./AddNewStudent";

async function getStudents(params: any) {
    const { data } = await api.get("/aluno", {
        params,
    });

    const students = data.data.map((student: any) => ({
        ...student,
        created_date: new Date(
            Date.parse(student.created_at)
        ).toLocaleDateString("pt-BR", { minute: "2-digit", hour: "2-digit" }),
    }));

    return { ...data, data: students };
}

export default function Alunos() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { state: pagination, dispatch } = usePagination();

    function setPage(payload: number) {
        dispatch({ type: "setPage", payload });
    }

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["getStudents", pagination],
        queryFn: () => getStudents(pagination),
        initialData: { data: [], links: [] },
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <AddNewStudent
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
            />

            <Card w="100%" h="100%">
                <CardHeader display="flex" justifyContent="space-between">
                    <Heading>Alunos</Heading>
                    <Button colorScheme="green" gap="2" onClick={onOpen}>
                        <Icon as={MdAdd} /> Novo aluno
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
                                        <Th>Nome</Th>
                                        <Th>Turma</Th>
                                        <Th>Criado em</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.data.map((student: any) => (
                                        <Tr key={student.id}>
                                            <Td>{student.id}</Td>
                                            <Td>{student.nome}</Td>
                                            <Td>{student.turma[0].titulo}</Td>
                                            <Td>{student.created_date}</Td>
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
