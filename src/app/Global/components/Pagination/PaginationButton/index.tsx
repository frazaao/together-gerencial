import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginationButtonProps extends ButtonProps {
    children?: React.ReactNode;
    href: string;
    isActive?: boolean;
}

export function PaginationButton({
    children,
    href,
    isActive,
    ...rest
}: PaginationButtonProps) {
    const active = isActive ? { colorScheme: "pink" } : {};

    function verifyTypeOfButtonByChildren(value: string | undefined) {
        if (value === "&laquo; Previous") {
            return <Icon as={MdChevronLeft} />;
        }

        if (value === "Next &raquo;") {
            return <Icon as={MdChevronRight} />;
        }

        return null;
    }

    return (
        <Button
            {...rest}
            {...active}
            disabled={href === "" || rest.isLoading}
            isLoading={false}
        >
            {verifyTypeOfButtonByChildren(children?.toString()) ?? children}
        </Button>
    );
}
