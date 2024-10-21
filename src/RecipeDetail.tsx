// src/RecipeDetail.tsx
import React from 'react';

interface RecipeDetailProps {
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl: string;
    onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ title, ingredients, instructions, imageUrl, onClose }) => {
    return (
        <div className="recipe-detail-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{title}</h2>
                {imageUrl && <img src={imageUrl} alt={title} className="recipe-image" />}
                <p><strong>Ingredients:</strong> {ingredients}</p>
                <p><strong>Instructions:</strong> {instructions}</p>
            </div>
        </div>
    );
};

export default RecipeDetail;
