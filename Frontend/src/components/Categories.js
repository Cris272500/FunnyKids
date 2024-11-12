// Categories.js
export default class Categories {
    getElement() {
        const element = document.createElement('div');
        element.classList.add('categories-container');
        
        element.innerHTML = `
            <h2>Categorías</h2>
            <div class="categories-list">
                <!-- Aquí mostrarías la lista de categorías -->
            </div>
        `;
        
        return element;
    }
}
