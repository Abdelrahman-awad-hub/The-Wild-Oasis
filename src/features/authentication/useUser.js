import { useQuery } from "@tanstack/react-query";
import { getCuurentUser } from "../../services/apiAuth";

export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryFn: getCuurentUser,
        queryKey: ["user"],
    });

    return { user, isLoading, isAuth: user?.role === "authenticated" };
}
