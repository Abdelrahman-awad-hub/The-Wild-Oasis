import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
        mutationFn: ({ cabin, id }) => createUpdateCabin(cabin, id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            toast.success("cabin successfully updated");
        },

        onError: (err) => toast.error(err.message),
    });

    return { updateCabin, isUpdating };
}
