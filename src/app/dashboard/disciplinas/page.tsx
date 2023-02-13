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
import { AddNewDiscipline } from "./AddNewDiscipline";

async function getDisciplines(params: any) {
    const { data } = await api.get("/disciplina", {
        params,
    });

    const disciplines = data.data.map((discipline: any) => ({
        ...discipline,
        created_date: new Date(
            Date.parse(discipline.created_at)
        ).toLocaleDateString("pt-BR", { minute: "2-digit", hour: "2-digit" }),
    }));

    return { ...data, data: disciplines };
}

export default function Disciplinas() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { state: pagination, dispatch } = usePagination();

    function setPage(payload: number) {
        dispatch({ type: "setPage", payload });
    }

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["getDisciplines", pagination],
        queryFn: () => getDisciplines(pagination),
        initialData: { data: [], links: [] },
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <AddNewDiscipline
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
            />

            <Card w="100%" h="100%">
                <CardHeader display="flex" justifyContent="space-between">
                    <Heading>Disciplinas</Heading>
                    <Button colorScheme="green" gap="2" onClick={onOpen}>
                        <Icon as={MdAdd} /> Nova disciplina
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
                                        <Th>Titulo</Th>
                                        <Th>Turmas</Th>
                                        <Th>Criado em</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.data.map((discipline: any) => (
                                        <Tr key={discipline.id}>
                                            <Td>{discipline.id}</Td>
                                            <Td>{discipline.titulo}</Td>
                                            <Td>
                                                {discipline.turma.map(
                                                    (t: any) => `${t.titulo}, `
                                                )}
                                            </Td>
                                            <Td fontFamily="monospace">
                                                {discipline.created_date}
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
