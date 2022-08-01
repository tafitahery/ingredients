import { useState } from 'react';
import axios from 'axios';

export default function Form({ getData }) {
  // state
  const [newIngredient, setNewIngredient] = useState('');

  // comportement
  const handleChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: newIngredient,
      quantity: 0,
    };

    axios.post('http://localhost:4000/ingredients', data).then(() => {
      getData();
      setNewIngredient('');
    });
  };

  // affichage (render)
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ajoutez un ingredient ..."
        value={newIngredient}
        onChange={handleChange}
      />{' '}
      <button>Ajouter +</button>
    </form>
  );
}
