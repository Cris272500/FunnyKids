const API_URL = "http://127.0.0.1:8000/api/categorias/";

export async function fetchCategorias() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener categorias");
        }
        const categories = await response.json();

        return categories;


    } catch (error) {
        throw new Error(error.message || "Error de conexion");
    }
}