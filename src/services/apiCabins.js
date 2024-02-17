import { PAGE_SIZE } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ filter, sortBy, page }) {
    let query = supabase.from("cabins").select("*", { count: "exact" });

    // Filter
    if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

    // Sort
    if (sortBy)
        query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

    // pagination
    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return { data, count };
}

export async function createUpdateCabin(cabin = {}, id) {
    const { id: editId } = cabin;

    const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}_${cabin?.image.name}`.replaceAll("/", "");

    const imagePath = hasImagePath
        ? cabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Create/Update Cabin
    let query = supabase.from("cabins");

    // 1- Create a cabin
    if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

    // 1- Update cabin

    if (id) {
        query = query.update({ ...cabin, image: imagePath }).eq("id", editId);
    }

    const { data, error } = await query.select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // upload the cabin image
    if (hasImagePath) return data;

    const { error: storageErorr } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin.image);

    if (storageErorr) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageErorr);
        throw new Error(`Cabin image could not be uploaded and cabin was not be created`);
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error(`Cabin with ID: '${id}' could not be deleted`);
    }

    return data;
}
