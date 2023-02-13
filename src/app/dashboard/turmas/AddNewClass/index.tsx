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

interface AddNewClassProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewClassForm {
    titulo: string;
}

async function getStudents() {
    const { data } = await api.get("/aluno");

    return data;
}

export function AddNewClass({
    isOpen = false,
    onClose,
    refetch,
}: AddNewClassProps) {
    const toast = useToast();

    const { data: studentsData } = useQuery({
        queryKey: ["getStudents"],
        queryFn: getStudents,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const formInitialState: AddNewClassForm = {
        titulo: "",
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewClassForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("titulo", "");
    }

    async function createNewComment(values: any) {
        const turma = {
            ...values,
        };

        try {
            await api.post("/turma", turma);

            toast({
                title: "Turma criada com sucesso!",
                description: "Dados da turma salvos em nossa base de dados",
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

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading>Adicionar nova turma</Heading>
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing="8">
                        <FormControl>
                            <FormLabel mb="0.5">Titulo</FormLabel>
                            <Input {...register("titulo")} />
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
