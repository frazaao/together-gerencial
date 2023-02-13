"use client";

import { Grid, Box, Flex } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";

export default function Home() {
    return (
        <Grid gridTemplateColumns="1fr 1fr">
            <Box
                as="img"
                src="images/loginBg.png"
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
