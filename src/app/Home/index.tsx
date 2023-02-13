"use client";

import { Grid, Box, Flex } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";
import LoginBg from '../../../public/images/LoginBg.png'
import Image from "next/image";

export default function Home() {
    return (
        <Grid gridTemplateColumns="1fr 1fr">
            <Box
                as={Image}
                src={LoginBg}
                alt="Imagem de fundo de login"
                width="100%"
                objectFit="cover"
                maxH="100vh"
            />
            <Flex w="100%" align="center" justify="center">
                <LoginForm />
            </Flex>
        </Grid>
    );
}
