"use client";

import { Logo } from "@/app/Global/components/logo";
import { api } from "@/services/axios";
import {
    Button,
    Input,
    Stack,
    Text,
    Heading,
    Flex,
    InputGroup,
    InputLeftElement,
    Icon,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdPerson, MdPersonAdd } from "react-icons/md";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const { register, handleSubmit, formState } = useForm();

    const toast = useToast();

    const router = useRouter();

    async function login(values: any) {
        try {
            const { data } = await api.post("/login", values);

            setCookie(undefined, "token", data.token, {
                maxAge: 60 * 60 * 12,
            });

            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

            toast({
                title: "Login efetuado com sucesso!",
                description:
                    "Aguarde somente um momento e você será redirecionado para a nossa aplicação",
                status: "success",
                position: "top-right",
                isClosable: true,
                duration: 6000,
            });

            router.push("/dashboard");
        } catch {
            toast({
                title: "Usuário ou senha errada!",
                description:
                    "Caso não lembre a senha, entre em contato com o suporte",
                status: "error",
                position: "top-right",
                isClosable: true,
                duration: 6000,
            });
        }
    }

    return (
        <Stack alignItems="center">
            <Logo size={200} />
            <Heading as="h1" fontWeight="bold" fontSize="8xl">
                Together
            </Heading>
            <Text as="p" fontWeight="bold" color="pink.300" mt="4">
                JUNTOS PELA EDUCAÇÃO
            </Text>

            <Stack
                as="form"
                onSubmit={handleSubmit(login)}
                w="100%"
                spacing="2"
            >
                <InputGroup>
                    <InputLeftElement>
                        <Icon as={MdEmail} color="gray.300" />
                    </InputLeftElement>
                    <Input {...register("email")} placeholder="Email" />
                </InputGroup>

                <InputGroup>
                    <InputLeftElement>
                        <Icon as={MdLock} color="gray.300" />
                    </InputLeftElement>
                    <Input {...register("senha")} placeholder="Senha" />
                </InputGroup>

                <Flex align="center" justify="center" gap="2" pt="8">
                    <Button
                        color="white"
                        bg="pink.300"
                        px="8"
                        gap="2"
                        colorScheme="pink"
                        type="submit"
                        w="100%"
                        isLoading={formState.isSubmitting}
                    >
                        <MdPerson />
                        Entrar
                    </Button>
                </Flex>
            </Stack>
        </Stack>
    );
}
