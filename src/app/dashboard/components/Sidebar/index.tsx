import { Logo } from "@/app/Global/components/logo";
import { Card, Flex, Heading, Stack } from "@chakra-ui/react";
import {
    MdCalendarToday,
    MdCircle,
    MdGroups,
    MdHome,
    MdManageAccounts,
    MdMenuBook,
    MdOutlineArticle,
    MdOutlineSettings,
    MdPerson,
    MdQuestionAnswer,
    MdSchool,
} from "react-icons/md";
import SidebarMenuItem from "../SidebarMenuItem";

export default function Sidebar() {
    return (
        <Stack h="100vh" w="360px" spacing="8" px="4" py="2" shadow="md">
            <Flex align="center" gap="4">
                <Logo size={50} />
                <Heading>Together</Heading>
            </Flex>

            <Stack>
                <SidebarMenuItem icon={MdHome} href="/dashboard">
                    Dashboard
                </SidebarMenuItem>
                {/* <SidebarMenuItem icon={MdCircle} href="/dashboard/relatorios">
                    Relatórios
                </SidebarMenuItem> */}
            </Stack>

            <Stack>
                <Heading as="h4">Menu</Heading>
                <SidebarMenuItem
                    icon={MdQuestionAnswer}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/comentarios"
                >
                    Comentários
                </SidebarMenuItem>

                <SidebarMenuItem
                    icon={MdCalendarToday}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/presencas"
                >
                    Presenças
                </SidebarMenuItem>

                <SidebarMenuItem
                    icon={MdOutlineArticle}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/notas"
                >
                    Notas
                </SidebarMenuItem>

                <SidebarMenuItem
                    icon={MdMenuBook}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/disciplinas"
                >
                    Disciplinas
                </SidebarMenuItem>

                <SidebarMenuItem
                    icon={MdGroups}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/turmas"
                >
                    Turmas
                </SidebarMenuItem>

                {/* <SidebarMenuItem
                    icon={MdManageAccounts}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/perfis"
                >
                    Perfis
                </SidebarMenuItem>

                <SidebarMenuItem
                    icon={MdOutlineSettings}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/regras"
                >
                    Regras
                </SidebarMenuItem> */}

                <SidebarMenuItem
                    icon={MdSchool}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/alunos"
                >
                    Alunos
                </SidebarMenuItem>

                <SidebarMenuItem
                    icon={MdPerson}
                    variant="ghost"
                    justifyContent="flex-start"
                    href="/dashboard/usuarios"
                >
                    Usuários
                </SidebarMenuItem>
            </Stack>
        </Stack>
    );
}
