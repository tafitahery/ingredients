import { useState } from 'react';
import axios from 'axios';
import RadioStock from './RadioStock';
import OptionStock from './OptionStock';
import InputStock from './InputStock';

export default function FormStock({ ingredients, getData, getIngredient }) {
  // state
  const [stock, setStock] = useState({
    ingredientSelected: '',
    quantity: 0,
    minStock: 10,
  });

  const [action, setAction] = useState('in');

  // comportement
  const handleAction = (event) => {
    setAction(event.target.id);
  };

  const handleChange = (event) => {
    setStock((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const ingredient = getIngredient(stock.ingredientSelected);

  const newQuantity = ingredient
    ? action === 'init'
      ? parseFloat(stock.quantity)
      : action === 'in'
      ? parseFloat(stock.quantity) + ingredient.quantity
      : ingredient.quantity - parseFloat(stock.quantity)
    : 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!stock.ingredientSelected) {
      alert('Vous devez remplir le champ nom');
      return;
    }

    const data = {
      ...ingredient,
      quantity: newQuantity ? newQuantity : ingredient.quantity,
      stockMin: parseFloat(stock.minStock),
    };

    axios
      .put(
        'http://localhost:4000/api/ingredients/' + stock.ingredientSelected,
        data
      )
      .then(() => {
        getData();
        setStock((prev) => ({
          ...prev,
          ingredientSelected: '',
          quantity: 0,
          minStock: 10,
        }));
      });
  };

  // affichage (render)
  return (
    <form onSubmit={handleSubmit}>
      <div className="action">
        <RadioStock action={action} handleRadio={handleAction} value="init" />
        <label htmlFor="init">Initial</label>
        <RadioStock action={action} handleRadio={handleAction} value="in" />
        <label htmlFor="in">Entrée</label>
        <RadioStock action={action} handleRadio={handleAction} value="out" />
        <label htmlFor="out">Sortie</label>
      </div>
      <div>
        <label htmlFor="name">Nom</label>
        <select
          id="name"
          name="ingredientSelected"
          value={stock.ingredientSelected}
          onChange={handleChange}
        >
          <option value=""> --- </option>
          {ingredients.map((ingredient) => (
            <OptionStock key={ingredient._id} ingredient={ingredient} />
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity">
          Quantité (
          {stock.quantity ? newQuantity : ingredient ? ingredient.quantity : 0})
        </label>
        <InputStock
          id="quantity"
          name="quantity"
          value={stock.quantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="minStock">Stock minimum</label>
        <InputStock
          id="minStock"
          name="minStock"
          value={stock.minStock}
          onChange={handleChange}
        />
      </div>
      <button>Valider</button>
    </form>
  );
}
