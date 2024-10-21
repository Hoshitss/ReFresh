// Modal.js
import React from 'react';
import './Modal.sass'; // Import modal styles

function Modal({ recipe, onClose, onThumbsUp, onThumbsDown }) {
    if (!recipe) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} className="modal-image" />
                <h3>Ingredients:</h3>
                <p>{recipe.ingredients}</p>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
                <div className="thumbs-container">
                    <button className="thumbs-button" onClick={onThumbsUp}>👍</button>
                    <button className="thumbs-button" onClick={onThumbsDown}>👎</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
