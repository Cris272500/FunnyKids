const API_LOGIN_URL = "http://127.0.0.1:8000/api/login/";

export async function fetchLogin(username, password) {
    try {
        const response = await axios.post(API_LOGIN_URL, {
            username,
            password
        });

        return response.data;
    } catch (error) {
        console.error("Error de login:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "Error de conexión");
    }
}