import { ButtonGroup } from "@chakra-ui/react";
import { PaginationShape } from "@/@types/pagination/PaginationShape";
import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
    pagination: PaginationShape<any>;
    setPage: Function;
}

export function Pagination({ pagination, setPage }: PaginationProps) {
    function handlePagination(value: string) {
        if (value.includes("Next")) {
            setPage(pagination.current_page + 1);
            return;
        }

        if (value.includes("Previous")) {
            if (pagination.current_page > 1)
                setPage(pagination.current_page - 1);
            return;
        }

        setPage(value);
    }
    return (
        <ButtonGroup isAttached>
            {pagination.links.map((link) => (
                <PaginationButton
                    onClick={() => handlePagination(link.label)}
                    href={link.url || ""}
                    isActive={link.active}
                    key={link.label}
                    isLoading={pagination.isLoading}
                >
                    {link.label}
                </PaginationButton>
            ))}
        </ButtonGroup>
    );
}
