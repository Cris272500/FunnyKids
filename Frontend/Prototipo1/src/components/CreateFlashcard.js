// CreateFlashcard.js
export default class CreateFlashcard {
    getElement() {
        const element = document.createElement('div');
        element.classList.add('create-flashcard-container');
        
        element.innerHTML = `
            <h2>Crear Nueva Flashcard</h2>
            <form>
                <!-- Formulario para crear flashcard -->
            </form>
        `;
        
        return element;
    }
}
