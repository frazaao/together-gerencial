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

interface AddNewCommentProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewCommentForm {
    conteudo: string;
    aluno: SelectOptions;
}

async function getStudents() {
    const { data } = await api.get("/aluno");

    return data;
}

export function AddNewComment({
    isOpen = false,
    onClose,
    refetch,
}: AddNewCommentProps) {
    const toast = useToast();

    const { data: studentsData } = useQuery({
        queryKey: ["getStudents"],
        queryFn: getStudents,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const formInitialState: AddNewCommentForm = {
        conteudo: "",
        aluno: "",
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewCommentForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("conteudo", "");
        setValue("aluno", "");
    }

    async function createNewComment(values: any) {
        const id_aluno = studentsData.find(
            (c: any) => c.nome === values.aluno
        ).id;

        const comentario = {
            ...values,
            id_aluno,
        };

        try {
            await api.post("/comentario", comentario);

            toast({
                title: "Comentário criado com sucesso!",
                description:
                    "Dados do comentário salvos em nossa base de dados",
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

    const students = studentsData.map((c: any) => ({
        label: c.nome,
        value: c.nome,
    }));

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading>Adicionar novo comentário</Heading>
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing="8">
                        <MultiSelect
                            value={watch("aluno")}
                            onChange={(value) => setValue("aluno", value)}
                            options={students}
                            label="Aluno"
                            single
                        />

                        <FormControl>
                            <FormLabel mb="0.5">Conteúdo</FormLabel>
                            <Textarea
                                {...register("conteudo")}
                                resize="none"
                                rows={6}
                            />
                        </FormControl>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                    <Flex gap="4">
                        <Button
                            colorScheme="green"
                            onClick={handleSubmit(createNewComment)}
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
