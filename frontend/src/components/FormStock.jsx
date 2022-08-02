import { useState } from 'react';
import axios from 'axios';
import RadioStock from './RadioStock';
import OptionStock from './OptionStock';
import InputStock from './InputStock';

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

  const newQuantity = ingredient
    ? action === 'init'
      ? parseFloat(quantity)
      : action === 'in'
      ? parseFloat(quantity) + ingredient.quantity
      : ingredient.quantity - parseFloat(quantity)
    : 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ingredientSelected) {
      alert('Vous devez remplir le champ nom');
      return;
    }

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
        <RadioStock action={action} handleRadio={handleRadio} value="init" />
        <label htmlFor="init">Initial</label>
        <RadioStock action={action} handleRadio={handleRadio} value="in" />
        <label htmlFor="in">Entrée</label>
        <RadioStock action={action} handleRadio={handleRadio} value="out" />
        <label htmlFor="out">Sortie</label>
      </div>
      <div>
        <label htmlFor="name">Nom</label>
        <select id="name" value={ingredientSelected} onChange={handleSelect}>
          <option value=""> --- </option>
          {ingredients.map((ingredient) => (
            <OptionStock key={ingredient.id} ingredient={ingredient} />
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity">Quantité</label>
        <InputStock id="quantity" value={quantity} onChange={handleQuantity} />
        <span>
          Stock :{' '}
          {quantity ? newQuantity : ingredient ? ingredient.quantity : 0}{' '}
        </span>
      </div>
      <div>
        <label htmlFor="minStock">Stock minimum</label>
        <InputStock id="minStock" value={minStock} onChange={handleMinStock} />
      </div>
      <button>Valider</button>
    </form>
  );
}
