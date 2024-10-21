import React, { useState } from 'react';
import './App.sass';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl: string; // New property for the image URL
}

const RecipeApp: React.FC = () => {
    // State to manage recipes with three static vegetable recipes
    const [recipes, setRecipes] = useState<Recipe[]>([
        {
            title: "Tomato Soup",
            ingredients: "Crushed tomatoes, Butter, Yellow onion, 2 cloves garlic, sugar, salt, pepper, basil.",
            instructions: "heat a non-reactive pot over medium heat. Melt in 4 Tbsp butter then sautee onions until softened and golden (10-12 min). Add minced garlic and saute another minute. stir in two 28 oz cans of crushed tomatoes with their juice, your chicken stock, chopped basil, sugar and black pepper. Bring to a boil then reduce heat, partially cover and simmer 10 minutes. stir in the heavy cream and shredded parmesan. Return to a simmer and season to taste if needed.",
            imageUrl: "./2.png"
        },
        {
            title: "Garlic Sautéed Eggplant",
            ingredients: "2 Tablespoons olive oil, 1 large eggplant, ½ teaspoon onion powder, Salt and pepper, 2-3 cloves garlic, ½ teaspoon dried oregano.",
            instructions: "Once the oil is hot, add the diced eggplant and season with onion powder, salt and pepper. Toss to coat. Cook the eggplant, stirring occasionally, for about 10 minutes or until the eggplant is soft and lightly browned. Add the garlic and oregano to the skillet and stir to combine. Cook until garlic is fragrant, about 2 minutes.",
            imageUrl: "./1.png" 
        },
        {
            title: "Fabulous Fried Cabbage",
            ingredients: "2 teaspoons butter, 1 (15 ounce) can chicken broth, 1 head cabbage, cored and coarsely chopped, 1 pinch salt and ground black pepper.",
            instructions: "Bring chicken broth and butter to a boil in a large skillet. Reduce heat to low and add cabbage. Cover and cook over low heat, stirring frequently, until cabbage is tender and sweet, about 45 minutes. Season with salt and pepper and serve.",
            imageUrl: "./3.png" 
        }
    ]);
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipeImage, setRecipeImage] = useState<File | null>(null); // State to manage image file
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // State for the selected recipe

    // Function to close add recipe modal
    const closeAddRecipeModal = () => {
        const addRecipeModal = document.getElementById('add-recipe-modal');
        if (addRecipeModal) {
            addRecipeModal.style.display = 'none';
        }
        // Clear input fields
        setRecipeTitle('');
        setRecipeIngredients('');
        setRecipeInstructions('');
        setRecipeImage(null); // Clear the image file
    };

    // Function to open add recipe modal
    const openAddRecipeModal = () => {
        const addRecipeModal = document.getElementById('add-recipe-modal');
        if (addRecipeModal) {
            addRecipeModal.style.display = 'block';
        }
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page refresh

        // Create a URL for the uploaded image
        const imageUrl = recipeImage ? URL.createObjectURL(recipeImage) : '';

        const newRecipe: Recipe = {
            title: recipeTitle,
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
            imageUrl, // Add the image URL to the new recipe
        };
        
        setRecipes([...recipes, newRecipe]); // Add new recipe to the list
        closeAddRecipeModal(); // Close the modal after submission
    };

    // Function to open recipe details popup
    const openRecipeDetails = (recipe: Recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe
    };

    // Function to close recipe details popup
    const closeRecipeDetails = () => {
        setSelectedRecipe(null); // Clear the selected recipe
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img className="logooo" src="./Logo.png" alt="Logo" />
                    ReFresh!
                </div>
                <div className="nav-links">
                    <a href="/Home">Home</a>
                    <a href="/">Recipes</a>
                    
                </div>
            </nav>

            <div className="search-container">
                <input type="text" placeholder="Search for recipes..." className="search-input" />
                <button className="add-recipe-button" onClick={openAddRecipeModal}>Add Recipe</button>
            </div>

            <div className="title">
                <h1>Top Vegetable Delicacies</h1>
            </div>

            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card" onClick={() => openRecipeDetails(recipe)}>
                        <h2>{recipe.title}</h2>
                        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />}
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    </div>
                ))}
            </div>

            {/* Add Recipe Modal */}
            <div id="add-recipe-modal" className="modal" style={{ display: 'none' }}>
                <div className="modal-content">
                    <span className="close" onClick={closeAddRecipeModal}>&times;</span>
                    <h2>Add a New Recipe</h2>
                    <form id="add-recipe-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Recipe Title"
                            value={recipeTitle}
                            onChange={(e) => setRecipeTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Ingredients"
                            value={recipeIngredients}
                            onChange={(e) => setRecipeIngredients(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Instructions"
                            value={recipeInstructions}
                            onChange={(e) => setRecipeInstructions(e.target.value)}
                            required
                        />
                        <input
                            type="file" // File input for image
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setRecipeImage(file); // Update the image file state
                            }}
                        />
                        <button type="submit">Add Recipe</button>
                    </form>
                </div>
            </div>

            {/* Recipe Detail Popup */}
            {selectedRecipe && (
                <div className="recipe-detail-popup">
                    <div className="popup-content">
                        <span className="close" onClick={closeRecipeDetails}>&times;</span>
                        <h2>{selectedRecipe.title}</h2>
                        {selectedRecipe.imageUrl && <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="recipe-image" />}
                        <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeApp;