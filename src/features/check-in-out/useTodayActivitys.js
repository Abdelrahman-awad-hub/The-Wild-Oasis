import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivitys() {
    const { isLoading, data: activitys } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activitys"],
    });

    return { isLoading, activitys };
}
