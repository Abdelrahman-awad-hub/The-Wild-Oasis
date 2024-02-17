import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: updateUserData,
        onSuccess: ({ user }) => {
            queryClient.setQueriesData(["user"], user);
            toast.success("user data successfully updated");
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isLoading };
}
