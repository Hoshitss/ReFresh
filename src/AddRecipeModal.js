// AddRecipeModal.js
import React, { useState } from 'react';
import './AddRecipeModal.sass'; // Ensure correct path

const AddRecipeModal = ({ onClose, onAddRecipe }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [image, setImage] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            id: Date.now(),
            title,
            ingredients,
            image,
            instructions,
        };
        onAddRecipe(newRecipe);
        onClose(); // Close modal after adding recipe
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Add New Recipe</h2>
                <form onSubmit={handleSubmit} className="recipe-form">
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Ingredients:</label>
                        <input 
                            type="text" 
                            value={ingredients} 
                            onChange={(e) => setIngredients(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input 
                            type="text" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Instructions:</label>
                        <textarea 
                            value={instructions} 
                            onChange={(e) => setInstructions(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeModal;
