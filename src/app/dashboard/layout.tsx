"use client";

import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Flex>
      <Sidebar />
      <Box p="4" w="100%">
        {children}
      </Box>
    </Flex>
  );
}
