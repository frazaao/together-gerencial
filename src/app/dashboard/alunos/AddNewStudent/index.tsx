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
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import { useForm } from "react-hook-form";
import { useRef, use } from "react";
import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface AddNewStudentProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewStudentForm {
    nome: string;
    turma: SelectOptions;
    usuario_responsavel: SelectOptions;
}

async function getClassListAndDisciplines() {
    const { data } = await api.get("/turma");

    return data;
}

async function getListOfUsers() {
    const { data } = await api.get("/usuario");

    return data;
}

export function AddNewStudent({
    isOpen = false,
    onClose,
    refetch,
}: AddNewStudentProps) {
    const toast = useToast();

    const { data: classesData } = useQuery({
        queryKey: ["getClassList"],
        queryFn: getClassListAndDisciplines,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const { data: usersData } = useQuery({
        queryKey: ["getListOfUsers"],
        queryFn: getListOfUsers,
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const formInitialState = {
        nome: "",
        turma: 0,
        usuario_responsavel: [],
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewStudentForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("usuario_responsavel", 0);
        setValue("turma", 0);
        setValue("nome", "");
    }

    async function createNewStudent(values: any) {
        const id_usuario_responsavel = usersData.find(
            (u: any) => u.nome === values.usuario_responsavel
        ).id;

        const id_turma = classesData.find(
            (c: any) => c.titulo === values.turma
        ).id;

        const aluno = {
            id_usuario_responsavel,
            nome: values.nome,
            id_turma,
        };

        try {
            await api.post("/aluno", aluno);

            toast({
                title: "Aluno criado com sucesso!",
                description: "Dados do aluno salvos em nossa base de dados",
                status: "success",
                position: "top-right",
                isClosable: true,
                duration: 6000,
            });
            refetch();
            resetForm();
            onClose();
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

    const classes = classesData.map((c: any) => ({
        label: c.titulo,
        value: c.titulo,
    }));

    const users = usersData.map((u: any) => ({
        label: u.nome,
        value: u.nome,
    }));

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading>Adicionar novo aluno</Heading>
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing="8">
                        <FormControl>
                            <FormLabel mb="0.5">Nome</FormLabel>
                            <Input {...register("nome")} />
                        </FormControl>

                        <MultiSelect
                            value={watch("turma")}
                            onChange={(value) => setValue("turma", value)}
                            options={classes}
                            label="Turma"
                            single
                        />

                        <MultiSelect
                            value={watch("usuario_responsavel")}
                            onChange={(value) =>
                                setValue("usuario_responsavel", value)
                            }
                            options={users}
                            label="Usuário responsável"
                            single
                        />
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                    <Flex gap="4">
                        <Button
                            colorScheme="green"
                            onClick={handleSubmit(createNewStudent)}
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
