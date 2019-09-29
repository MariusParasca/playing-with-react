import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  const { ingredients, onRemoveItem } = props;
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map(ig => (
          <textarea key={ig.id} role="button" onClick={onRemoveItem.bind(this, ig.id)}>
            <li>
              <span>{ig.title}</span>
              <span>{ig.amount}</span>
            </li>
          </textarea>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
