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
    Checkbox,
    Box,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import { useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface AddNewPresenceProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

type SelectOptions = string | number | (string | number)[];

interface AddNewPresenceForm {
    turma: SelectOptions;
    aluno: {
        id: number,
        nome: string,
        presenca: boolean
    }[]
}

async function getStudents(idTurma: number) {
    if(idTurma === 0) {
        return []
    }
    const { data } = await api.get(`/aluno?turma=${idTurma}`);

    return data;
}

async function getClasses() {
    const { data } = await api.get("/turma");

    return data;
}

export function AddNewPresence({
    isOpen = false,
    onClose,
    refetch,
}: AddNewPresenceProps) {
    const toast = useToast();

    const { data: classesData } = useQuery({
        queryKey: ["getClasses"],
        queryFn: getClasses,
        initialData: [],
        refetchOnWindowFocus: true,
    });

    const formInitialState: AddNewPresenceForm = {
        turma: "",
        aluno: []
    };

    const { register, formState, handleSubmit, setValue, watch } =
        useForm<AddNewPresenceForm>({
            defaultValues: formInitialState,
        });

    function resetForm() {
        setValue("turma", "");
        setValue("aluno", []);
    }

    const {data: studentsData} = useQuery({
        queryFn: () => getStudents(classesData.find((c:any) => c.titulo === watch("turma"))?.id || 0),
        queryKey: ['getStudents', watch("turma")],
        initialData: [],
        refetchOnWindowFocus: false
    })

    async function createNewComment(values: any) {

        const presencas = values.aluno
            .map((a:any, index: number) => ({
                id_aluno: index,
                presenca: !!a.presenca
            }))
            .filter((a:any) => a !== null)

        try {
            await api.post("/presenca/multiplo", {presencas});

            toast({
                title: "Presenças criadas com sucesso!",
                description:
                    "Dados das presenças salvas em nossa base de dados",
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
                    <Heading>Adicionar nova chamada</Heading>
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing="8">
                        <MultiSelect
                            value={watch("turma")}
                            onChange={(value) => setValue("turma", value)}
                            options={classes}
                            label="Turmas"
                            single
                        />

                        <FormControl>
                            {studentsData.map((s:any) => (
                                <Box key={s.id}>
                                    <Checkbox value={s.id} {...register(`aluno.${s.id}.presenca`)}>{s.nome}</Checkbox>
                                </Box>
                            ))}
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
