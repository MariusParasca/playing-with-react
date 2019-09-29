import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    // console.log('RENDERING INGREDIENTS', ingredients);
  }, [ingredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = ingredient => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-81587.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' });
        return response.json();
      })
      .then(responseDate => {
        // setIngredients(prevIngredients => [...prevIngredients, { id: responseDate.name, ...ingredient }]);
        dispatch({ type: 'ADD', ingredient: { id: responseDate.name, ...ingredient } });
      });
  };

  const removeIngredientHandler = id => {
    dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-81587.firebaseio.com/ingredients.json/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatchHttp({ type: 'RESPONSE' });
        // setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
        dispatch({ type: 'DELETE', id });
      })
      .catch(fetchError => {
        dispatchHttp({ type: 'ERROR', errorMessage: fetchError });
      });
  };

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>error</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
