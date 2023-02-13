"use client";

import { api } from "@/services/axios";
import { DMSans, finalTheme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { parseCookies } from "nookies";

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token } = parseCookies();

    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    return (
        <html lang="pt-BR">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <QueryClientProvider client={queryClient}>
                    <ChakraProvider theme={finalTheme}>
                        <main className={DMSans.className}>{children}</main>
                    </ChakraProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
