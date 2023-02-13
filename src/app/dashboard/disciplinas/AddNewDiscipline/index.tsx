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

interface AddNewDisciplineProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewDisciplineForm {
    titulo: string;
    turma: SelectOptions;
}

async function getClasses() {
    const { data } = await api.get("/turma");

    return data;
}

export function AddNewDiscipline({
    isOpen = false,
    onClose,
    refetch,
}: AddNewDisciplineProps) {
    const toast = useToast();

    const { data: classesData } = useQuery({
        queryKey: ["getClasses"],
        queryFn: getClasses,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const formInitialState: AddNewDisciplineForm = {
        titulo: "",
        turma: [],
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewDisciplineForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("titulo", "");
        setValue("turma", []);
    }

    async function createNewComment(values: any) {
        const id_turma = classesData
            .filter((c: any) => values.turma.includes(c.titulo))
            .map((c: any) => c.id);

        const disciplina = {
            ...values,
            id_turma,
        };

        try {
            await api.post("/disciplina", disciplina);

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

    const classes = classesData.map((c: any) => ({
        label: c.titulo,
        value: c.titulo,
    }));

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading>Adicionar nova disciplina</Heading>
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing="8">
                        <MultiSelect
                            value={watch("turma")}
                            onChange={(value) => setValue("turma", value)}
                            options={classes}
                            label="Turmas"
                        />

                        <FormControl>
                            <FormLabel mb="0.5">Título</FormLabel>
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
