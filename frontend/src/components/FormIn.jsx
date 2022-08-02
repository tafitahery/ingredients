import { useState } from 'react';
import axios from 'axios';

export default function FormIn({ getData, getIngredient, id }) {
  // state
  const [newIngredient, setNewIngredient] = useState('');

  // comportement
  const ingredient = getIngredient(id);

  const handleChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: newIngredient,
      quantity: ingredient ? ingredient.quantity : 0,
      stockMin: ingredient ? ingredient.stockMin : 0,
    };

    if (ingredient) {
      axios.put('http://localhost:4000/ingredients/' + id, data).then(() => {
        getData();
        setNewIngredient('');
      });
    } else {
      axios.post('http://localhost:4000/ingredients', data).then(() => {
        getData();
        setNewIngredient('');
      });
    }
  };

  // affichage (render)
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ajoutez un ingredient ..."
        defaultValue={ingredient ? ingredient.name : newIngredient}
        onChange={handleChange}
      />{' '}
      <button>{ingredient ? 'Mettre à jour' : 'Ajouter +'}</button>
    </form>
  );
}
