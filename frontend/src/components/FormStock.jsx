import { useState } from 'react';
import axios from 'axios';

export default function FormStock({ ingredients, getData }) {
  // state
  const [action, setAction] = useState('in');
  const [ingredientSelected, setIngredientSelected] = useState('');
  const [quantity, setQuantity] = useState(0.0);
  const [minStock, setMinStock] = useState(10);

  // comportement
  const handleRadio = (event) => {
    setAction(event.target.id);
  };

  const handleSelect = (event) => {
    setIngredientSelected(event.target.value);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleMinStock = (event) => {
    setMinStock(event.target.value);
  };

  const ingredient = ingredients.find(
    (ingredient) => ingredient.id.toString() === ingredientSelected
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ingredientSelected) {
      alert('Vous devez remplir le champ nom');
      return;
    }

    const newQuantity =
      action === 'init'
        ? parseFloat(quantity)
        : action === 'in'
        ? parseFloat(quantity) + ingredient.quantity
        : ingredient.quantity - parseFloat(quantity);
    const data = {
      name: ingredient.name,
      quantity: newQuantity ? newQuantity : ingredient.quantity,
      stockMin: parseFloat(minStock),
    };

    axios
      .put('http://localhost:4000/ingredients/' + ingredientSelected, data)
      .then(() => {
        getData();
        setQuantity(0.0);
        setMinStock(10);
      });
  };

  // affichage (render)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="radio"
          name="action"
          id="init"
          onChange={handleRadio}
          checked={action === 'init'}
        />
        <label htmlFor="init">Initial</label>
        <input
          type="radio"
          name="action"
          id="in"
          checked={action === 'in'}
          onChange={handleRadio}
        />
        <label htmlFor="in">Entrée</label>
        <input
          type="radio"
          name="action"
          id="out"
          onChange={handleRadio}
          checked={action === 'out'}
        />
        <label htmlFor="out">Sortie</label>
      </div>
      <div>
        <label htmlFor="name">Nom</label>
        <select id="name" value={ingredientSelected} onChange={handleSelect}>
          <option value=""> --- </option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity">Quantité</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantity}
        />
      </div>
      <div>
        <label htmlFor="minStock">Stock minimum</label>
        <input
          type="number"
          id="minStock"
          value={minStock}
          onChange={handleMinStock}
        />
      </div>
      <button>Valider</button>
    </form>
  );
}
