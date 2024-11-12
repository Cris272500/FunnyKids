export async function fetchRegister(username, email, password, rol) {
    try {
        const response = await axios.post(API_URL, {
            username,
            email,
            password,
            rol
        });

        return response.data;
    } catch (error) {
        console.error("Error en el registro:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "Username o email ya existen");
    }
}