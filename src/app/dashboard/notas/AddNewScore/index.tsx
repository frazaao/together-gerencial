"use client";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Heading,
    Input,
    Stack,
    FormControl,
    FormLabel,
    Button,
    Flex,
    useToast,
    Textarea,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import { useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface AddNewScoreProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewScoreForm {
    aluno: SelectOptions;
    disciplina: SelectOptions;
    turma: SelectOptions;
    trimestre: string;
    valor: number;
}

async function getStudents() {
    const { data } = await api.get("/aluno");

    return data;
}

async function getClassListAndDisciplines() {
    const { data } = await api.get("/turma");

    return data;
}

export function AddNewScore({
    isOpen = false,
    onClose,
    refetch,
}: AddNewScoreProps) {
    const toast = useToast();

    const { data: studentsData } = useQuery({
        queryKey: ["getStudents"],
        queryFn: getStudents,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const { data: classesData } = useQuery({
        queryKey: ["getClassesAndDisciplines"],
        queryFn: getClassListAndDisciplines,
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const formInitialState: AddNewScoreForm = {
        aluno: "",
        disciplina: "",
        turma: "",
        trimestre: "Primeiro",
        valor: 0,
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewScoreForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("aluno", "");
        setValue("disciplina", "");
        setValue("turma", "");
        setValue("trimestre", "Primeiro");
        setValue("valor", 0);
    }

    async function createNewScore(values: any) {
        const id_aluno = studentsData.find(
            (c: any) => c.nome === values.aluno
        ).id;

        const id_turma = classesData.find(
            (t: any) => t.titulo === values.turma
        ).id;

        const id_disciplina = classesData
            .find((t: any) => t.titulo === values.turma)
            ?.disciplina.find((d: any) => d.titulo === values.disciplina).id;

        const nota = {
            ...values,
            id_aluno,
            id_disciplina,
            id_turma,
            trimestre: values.trimestre.toLowerCase(),
        };

        try {
            await api.post("/nota", nota);

            toast({
                title: "Nota criada com sucesso!",
                description:
                    "Dados da comentária salvos em nossa base de dados",
                status: "success",
                position: "top-right",
                isClosable: true,
                duration: 6000,
            });
            refetch();
            setValue("aluno", "");
            setValue("valor", 0);
        } catch {
            toast({
                title: "Ocorreu um erro ao salvar os dados!",
                description:
                    "Caso o erro persista, entre em contato com a equipe de suporte",
                status: "error",
                position: "top-right",
                isClosable: true,
                duration: 6000,
            });
        }
    }

    const students = studentsData.map((c: any) => ({
        label: c.nome,
        value: c.nome,
    }));

    const classes = classesData.map((c: any) => ({
        label: c.titulo,
        value: c.titulo,
    }));

    const disciplines =
        classesData
            .find((c: any) => c.titulo === watch("turma"))
            ?.disciplina.map((d: any) => ({
                label: d.titulo,
                value: d.titulo,
            })) || [];

    const trimester = [
        { label: "Primeiro", value: "Primeiro" },
        { label: "Segundo", value: "Segundo" },
        { label: "Terceiro", value: "Terceiro" },
        { label: "Quarto", value: "Quarto" },
    ];

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading>Adicionar nova nota</Heading>
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing="8">
                        <MultiSelect
                            value={watch("turma")}
                            onChange={(value) => setValue("turma", value)}
                            options={classes}
                            label="Turma"
                            single
                        />

                        <MultiSelect
                            value={watch("disciplina")}
                            onChange={(value) => setValue("disciplina", value)}
                            options={disciplines}
                            label="Disciplina"
                            single
                        />

                        <MultiSelect
                            value={watch("trimestre")}
                            onChange={(value) =>
                                setValue("trimestre", value as string)
                            }
                            options={trimester}
                            label="Bimestre"
                            single
                        />

                        <MultiSelect
                            value={watch("aluno")}
                            onChange={(value) => setValue("aluno", value)}
                            options={students}
                            label="Aluno"
                            single
                        />

                        <FormControl>
                            <FormLabel mb="0.5">Valor</FormLabel>
                            <Input type="number" {...register("valor")} />
                        </FormControl>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                    <Flex gap="4">
                        <Button
                            colorScheme="green"
                            onClick={handleSubmit(createNewScore)}
                            isLoading={formState.isSubmitting}
                        >
                            Salvar
                        </Button>
                        <Button colorScheme="red" onClick={resetForm}>
                            Cancelar
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
