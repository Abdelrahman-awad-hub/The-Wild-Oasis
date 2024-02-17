import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
    const {
        data: setting,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["setting"],
        queryFn: getSettings,
    });

    return {
        setting,
        isLoading,
        error,
    };
}
