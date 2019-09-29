import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  const { ingredients, onRemoveItem } = props;
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map(ig => (
          <li key={ig.id} role="presentation" onClick={onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
