import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import '../css/app.css'
import {v4 as uuidv4} from 'uuid';

export const RecipeContext=React.createContext();
const LOCAL_STORAGE_KEY='CookingWithReact.recipes';

function App() {
  const [selectedRecipeId, setSelectRecipeId]=useState();
  const [recipes, setRecipes]=useState(sampleRecipes);
  const selectedRecipe=recipes.find(recipe => recipe.id===selectedRecipeId);
  
  useEffect(() => {
    const recipeJSON=localStorage.getItem(LOCAL_STORAGE_KEY);
    if(recipeJSON!=null){
      setRecipes(JSON.parse(recipeJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue={ handleRecipeDelete, handleRecipeAdd, handleRecipeSelect, handleRecipeChange };
  
  function handleRecipeSelect(id){
    setSelectRecipeId(id);
  }

  function handleRecipeAdd(){
    const newRecipe={
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {
          id: uuidv4(),
          name: '',
          amount: ''
        }
      ]
    }
    setSelectRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, recipe){
    const newRecipes=[...recipes];
    const index=newRecipes.findIndex(r => r.id===id);
    newRecipes[index]=recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id){
    if(selectedRecipeId!=null && selectedRecipeId===id){
      setSelectRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id!==id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes=[
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put Salt On Chicken.\n2. Put Chicken in Oven.\n3. Eat Chicken.",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },{
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },{
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put Peprika On Pork.\n2. Put Pork in Oven.\n3. Eat Pork.",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },{
        id: 2,
        name: 'Peprika',
        amount: '2 Tbs'
      }
    ]
  }
];

export default App;
