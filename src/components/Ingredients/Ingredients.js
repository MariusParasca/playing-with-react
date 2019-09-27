import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', ingredients);
  }, [ingredients]);

  const filteredIngredientsHandler = useCallback((filtredIngredients) => {
    setIngredients(filtredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch('https://react-hooks-81587.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseDate) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseDate.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(`https://react-hooks-81587.firebaseio.com/ingredients.json/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        setIsLoading(false);
        setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id));
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>error</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

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
