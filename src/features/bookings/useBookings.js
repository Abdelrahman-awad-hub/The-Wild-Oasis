import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searcgParams] = useSearchParams();

    // FILTER
    const filterValue = searcgParams.get("status");

    let filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    // SORTING
    const sortByRaw = searcgParams.get("sortBy") || "startDate-asc";

    const [field, direction] = sortByRaw.split("-");

    const sortBy = { field, direction };

    const page = !searcgParams.get("page") ? 1 : Number(searcgParams.get("page"));

    const {
        data: { data: bookings, count } = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
        retry: false,
    });

    // PAGENTAION

    // PRE-FECHING
    const numberOfPages = Math.ceil(count / PAGE_SIZE);

    // For next page
    if (page < numberOfPages)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
            retry: false,
        });

    // For next previuse page
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
            retry: false,
        });

    return { bookings, count, isLoading, error };
}
