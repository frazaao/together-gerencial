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
import { AddNewPresence } from "./AddNewPresence";

async function getPresences(params: any) {
    const { data } = await api.get("/presenca", {
        params,
    });

    const presences = data.data.map((presence: any) => ({
        ...presence,
        created_date: new Date(
            Date.parse(presence.created_at)
        ).toLocaleDateString("pt-BR"),
    }));

    return { ...data, data: presences };
}

export default function Disciplinas() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { state: pagination, dispatch } = usePagination();

    function setPage(payload: number) {
        dispatch({ type: "setPage", payload });
    }

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["getPresences", pagination],
        queryFn: () => getPresences(pagination),
        initialData: { data: [], links: [] },
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <AddNewPresence
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
            />

            <Card w="100%" h="100%">
                <CardHeader display="flex" justifyContent="space-between">
                    <Heading>Presenças</Heading>
                    <Button colorScheme="green" gap="2" onClick={onOpen}>
                        <Icon as={MdAdd} /> Fazer chamada de presenças
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
                                        <Th>Dia da chamada</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.data.map((presence: any) => (
                                        <Tr key={presence.id}>
                                            <Td>{presence.id}</Td>
                                            <Td>{presence.aluno.nome}</Td>
                                            <Td fontFamily="monospace">
                                                {presence.created_date}
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
