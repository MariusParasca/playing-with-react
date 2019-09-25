import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredients);
  }, [ingredients]);

  const filteredIngredientsHandler = useCallback(filtredIngredients => {
    setIngredients(filtredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch("https://react-hooks-81587.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(responseDate => {
        setIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseDate.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = id => {
    setIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
