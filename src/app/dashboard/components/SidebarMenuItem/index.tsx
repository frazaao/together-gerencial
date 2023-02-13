import { As, Button, ButtonProps, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarMenuItemProps extends ButtonProps {
  icon: As;
  href?: string;
}

export default function SidebarMenuItem({
  children,
  icon,
  justifyContent = "center",
  href = "#",
  ...rest
}: SidebarMenuItemProps) {
  const path = usePathname();

  const isActive = path === href;

  return (
    <Button
      {...rest}
      as={Link}
      href={href}
      colorScheme={isActive ? "pink" : "gray"}
      justifyContent={justifyContent}
      gap="4"
    >
      <Icon as={icon} />
      <Text>{children}</Text>
    </Button>
  );
}
