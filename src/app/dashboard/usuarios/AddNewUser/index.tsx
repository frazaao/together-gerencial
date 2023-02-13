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
import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface AddNewUserProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewUserForm {
    nome: string;
    perfil: SelectOptions;
    email: string;
    telefone: string;
    senha: string;
    registro: string;
}

async function getProfiles() {
    const { data } = await api.get("/perfil");

    return data;
}

export function AddNewUser({
    isOpen = false,
    onClose,
    refetch,
}: AddNewUserProps) {
    const toast = useToast();

    const { data: profileData } = useQuery({
        queryKey: ["getClassList"],
        queryFn: getProfiles,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const formInitialState: AddNewUserForm = {
        nome: "",
        perfil: "",
        email: "",
        telefone: "",
        senha: "",
        registro: "",
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewUserForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("nome", "");
        setValue("perfil", "");
        setValue("email", "");
        setValue("telefone", "");
        setValue("senha", "");
        setValue("registro", "");
    }

    async function createNewUser(values: any) {
        const id_perfil = profileData.find(
            (c: any) => c.titulo === values.perfil
        ).id;

        const usuario = {
            ...values,
            id_perfil,
        };

        try {
            await api.post("/usuario", usuario);

            toast({
                title: "Usuário criado com sucesso!",
                description: "Dados do usuário salvos em nossa base de dados",
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

    const profiles = profileData.map((c: any) => ({
        label: c.titulo,
        value: c.titulo,
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

                        <FormControl>
                            <FormLabel mb="0.5">Email</FormLabel>
                            <Input {...register("email")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel mb="0.5">Registro</FormLabel>
                            <Input {...register("registro")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel mb="0.5">Senha</FormLabel>
                            <Input {...register("senha")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel mb="0.5">Telefone</FormLabel>
                            <Input {...register("telefone")} />
                        </FormControl>

                        <MultiSelect
                            value={watch("perfil")}
                            onChange={(value) => setValue("perfil", value)}
                            options={profiles}
                            label="Perfil"
                            single
                        />
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                    <Flex gap="4">
                        <Button
                            colorScheme="green"
                            onClick={handleSubmit(createNewUser)}
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
