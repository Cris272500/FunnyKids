// MyFlashcards.js
export default class MyFlashcards {
    getElement() {
        const element = document.createElement('div');
        element.classList.add('my-flashcards-container');
        
        element.innerHTML = `
            <h2>Mis Flashcards</h2>
            <div class="flashcards-container">
                <!-- Aquí cargarías las flashcards del usuario -->
            </div>
        `;
        
        return element;
    }
}
