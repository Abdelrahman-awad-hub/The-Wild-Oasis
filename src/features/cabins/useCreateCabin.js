import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: createUpdateCabin,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            toast.success("new cabin added sucssfully");
        },

        onError: (err) => toast.error(err.message),
    });

    return { createCabin, isCreating };
}
