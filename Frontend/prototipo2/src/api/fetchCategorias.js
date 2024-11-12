const API_CATEGORIES_URL = "http://127.0.0.1:8000/api/categorias/";

export async function fetchCategorias() {
    try {
        const response = await axios.get(API_CATEGORIES_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : "Error de conexión");
    }
}
