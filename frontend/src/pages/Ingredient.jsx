import { useState, useEffect } from 'react';
import axios from 'axios';
import TableIn from '../components/TableIn';
import FormIn from '../components/FormIn';

function Ingredient() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [action, setAction] = useState('in');
  const [ingredientSelected, setIngredientSelected] = useState('');
  const [quantity, setQuantity] = useState(0.0);
  const [minStock, setMinStock] = useState(0.0);

  // comportement
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:4000/ingredients')
      .then(({ data }) => setIngredients(data));
  };

  const handleDelete = (id) => {
    if (window.confirm('Voulez vous supprimer cet ingredient ?')) {
      axios
        .delete('http://localhost:4000/ingredients/' + id)
        .then(() => getData());
    }
  };

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

  const handleEdit = (id) => {};

  // affichage (render)
  return (
    <div>
      <h1>INGREDIENT</h1>
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
            <TableIn
              key={ingredient.id}
              ingredient={ingredient}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <h2>Nouvel ingredient</h2>
      <FormIn getData={getData} />
      <h2>Gestion du stock</h2>
      <form action="">
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
    </div>
  );
}

export default Ingredient;
