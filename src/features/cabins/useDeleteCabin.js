import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            toast.success("Cabin Successfully Deleted");
        },
        onError: (err) => toast.err(err.message),
    });

    return { deleteCabin, isDeleting };
}
