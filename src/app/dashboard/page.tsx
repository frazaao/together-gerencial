"use client";

import { api } from "@/services/axios";
import {
    Text,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Input,
    InputGroup,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import vegaEmbedModule from "vega-embed";

export default function Dashboard() {
    const inputRef = useRef<HTMLInputElement>(null);
    const vegaRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    async function createVegaFromSchema(schema: any) {
        await vegaEmbedModule(vegaRef.current!, {...schema, width: 500, height: 500});
    }

    async function fetchData(question: string) {
        setErrorMessage("");
        try {
            const {
                data: { values, config },
            } = await api.post("/relatorio", {
                question,
            });

            config.data = {
                values,
            };

            createVegaFromSchema(config);
        } catch {
            setErrorMessage(
                "Algo deu errado durante a busca, por favor tente novamente!"
            );
        }
    }

    return (
        <>
            <Card height="90vh">
                <CardHeader>
                    <Heading>Dashboard</Heading>
                    <Flex>
                        <InputGroup my="3">
                            <Input
                                ref={inputRef}
                                name="relatorio"
                                id="relatorio"
                            />
                            <Button
                                onClick={() =>
                                    fetchData(inputRef.current?.value || "")
                                }
                            >
                                Gerar relatório
                            </Button>
                        </InputGroup>
                    </Flex>
                    {!!errorMessage ? (
                        <Text color="red.500">{errorMessage}</Text>
                    ) : (
                        <Text>
                            Digite como deseja visualizar os dados em forma
                            gráfica, lembre-se, o quanto mais claro for, melhor
                            será o resultado. Os dados disponíveis para
                            construção do gráfico são: Turma, aluno, disciplina,
                            nota e presença .
                        </Text>
                    )}
                </CardHeader>

                <CardBody>
                    <Box id="vega" ref={vegaRef}></Box>
                </CardBody>
            </Card>
        </>
    );
}
