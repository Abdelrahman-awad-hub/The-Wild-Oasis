import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useCabins() {
    const queryClient = useQueryClient();
    const [searcgParams] = useSearchParams();

    // FILTER
    const filterValue = searcgParams.get("discount");

    let filter;

    if (!filterValue || filterValue === "all") filter = null;
    if (filterValue === "no-discount") filter = { field: "discount", value: 0 };
    if (filterValue === "with-discount")
        filter = { field: "discount", value: 0, method: "gt" };

    // SORTING
    const sortByRaw = searcgParams.get("sortBy") || "name-asc";

    const [field, direction] = sortByRaw.split("-");

    const sortBy = { field, direction };

    // PAGENTAION
    const page = !searcgParams.get("page") ? 1 : Number(searcgParams.get("page"));

    const {
        data: { data: cabins, count } = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cabins", filter, sortBy, page],
        queryFn: () => getCabins({ filter, sortBy, page }),
    });

    // PRE-FECHING
    const numberOfPages = Math.ceil(count / PAGE_SIZE);

    // For next page
    if (page < numberOfPages)
        queryClient.prefetchQuery({
            queryKey: ["cabins", filter, sortBy, page + 1],
            queryFn: () => getCabins({ filter, sortBy, page: page + 1 }),
        });

    // For next previuse page
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["cabins", filter, sortBy, page - 1],
            queryFn: () => getCabins({ filter, sortBy, page: page - 1 }),
        });

    return { cabins, count, isLoading, error };
}
