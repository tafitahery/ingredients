import { useState, useEffect } from 'react';
import axios from 'axios';

function Ingredient() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  // comportement
  useEffect(() => {
    axios
      .get('http://localhost:4000/ingredients')
      .then(({ data }) => setIngredients(data));
  }, [newIngredient]);

  const handleChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: newIngredient,
      quantity: 0,
    };
    axios
      .post('http://localhost:4000/ingredients', data)
      .then(() => setNewIngredient(''));
  };

  // affichage (render)
  return (
    <div>
      <h1>Nouvel ingredient</h1>
      <h2>Liste des ingredients</h2>
      <table>
        <thead>
          <tr>
            <th>Nom ingredient</th>
            <th>Unité(s)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
              <td>
                <button>Modifier</button>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Nouvel ingredient</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ajoutez un nouvel ingredient ..."
          value={newIngredient}
          onChange={handleChange}
        />{' '}
        <button>Ajouter</button>
      </form>
    </div>
  );
}

export default Ingredient;
