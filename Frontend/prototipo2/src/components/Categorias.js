import React from "react";
import './Categorias.css'

const Categorias = () => {
    const categories = [
        { name: "Animales", image: "https://th.bing.com/th/id/OIP.JVOc6hTxqhZlZRE0An2GsAHaGC?rs=1&pid=ImgDetMain" },
        { name: "Colores", image: "https://th.bing.com/th/id/R.b22045453cb980aec7627cdd4240f4d9?rik=3EI%2bkRzRjRNpuQ&riu=http%3a%2f%2fimg.clipartlook.com%2fcolours-clipart--1920.jpg&ehk=wiA%2boH%2br79PEfzstAIQ4zQF3kt7vgqTyfLH7Uz%2fG%2b1U%3d&risl=&pid=ImgRaw&r=0" },
        { name: "Números", image: "https://th.bing.com/th/id/OIP.woFC5tZjQjEkjgKvgZShzwAAAA?rs=1&pid=ImgDetMain" },
        { name: "Frutas", image: "https://th.bing.com/th/id/OIP.HTuk1VktKbBEPLSyFJIvSgHaFZ?rs=1&pid=ImgDetMain" },
      ];      
    return (
        <div>
            <section className="category-section">
                <h1>Categorias</h1>
                <div className="categories-grid">

                    {categories.map((category, index) => (
                        <div className="category-card" key={index}>
                            <img src={category.image} alt={category.name} />
                            <div className="category-overlay">
                                <h3>{category.name}</h3>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </div>
    )
}

export default Categorias;