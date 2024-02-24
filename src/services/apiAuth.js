import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCuurentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}

export async function updateUserData({ fullName, password, avatar }) {
    let updatedData;
    //1- update the password or name

    if (password) updatedData = { password };
    if (fullName) updatedData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(updatedData);

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    //2- upload the avatar

    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageErorr } = supabase.storage.from("avatars").upload(fileName, avatar);

    if (storageErorr) {
        console.error(storageErorr.message);
    }

    //3- update the avatar
    const path = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

    const { data: updatedUser, error2 } = await supabase.auth.updateUser({
        data: { avatar: path },
    });

    if (error2) throw new Error(error2.message);

    return updatedUser;
}
