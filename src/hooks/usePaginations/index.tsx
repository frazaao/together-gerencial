import { useReducer } from "react";

type PaginationState = {
    page: number;
    per_page: number;
    search: string;
};

export function usePagination() {
    const initialState: PaginationState = {
        page: 1,
        per_page: 10,
        search: "",
    };

    const [state, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case "setPage":
                return {
                    ...state,
                    page: action.payload,
                };

            case "setNextPage":
                return {
                    ...state,
                    page: state.page + 1,
                };

            case "setPreviousPage":
                if (state.page > 1)
                    return {
                        ...state,
                        page: state.page - 1,
                    };
                else {
                    return state;
                }

            default:
                return state;
        }
    }, initialState);

    return {
        state,
        dispatch,
    };
}
