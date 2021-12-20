import React, { useContext, useState } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
    const { handleRecipeAdd }=useContext(RecipeContext);
    const [searchText, setSearchText] = useState();

    function handleRecipeSearch(usrInput){
        setSearchText(usrInput);
    }
    const filteredRecipes=searchText != null ? recipes.filter(r => r.name.toLowerCase().includes(searchText.toLowerCase())) : recipes;
    return (
        <div className='recipe-list'>
            <div className="search-box__container">
                <label className='search-box__label' htmlFor="search">Search a recipe</label>
                <input className='search-box__input'  type="text" name="search" placeholder="Search for a recipe..." onChange={(e) => handleRecipeSearch(e.target.value)}/>
            </div>
            <div>
                {filteredRecipes.map((recipe)=>{
                    return <Recipe key={recipe.id} {...recipe}/>
                })}
            </div>
            <div className='recipe-list__add-recipe-btn-container'>
                <button className='btn btn--primary' onClick={handleRecipeAdd}>Add Recipe</button>
            </div>
        </div>
    )
}
