import { useState, useEffect } from 'react';
import axios from 'axios';
import List from '../components/List';
import FormIn from '../components/FormIn';

function Ingredient() {
  // state
  const [ingredients, setIngredients] = useState([]);

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
            <List
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
          <label htmlFor="action">Action</label>
          <select id="action">
            <option value="in">Entrée</option>
            <option value="init">Stock initial</option>
            <option value="out">Sortie</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Nom</label>
          <select id="name">
            <option value=""> --- </option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id}>{ingredient.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantité</label>
          <input type="number" id="quantity" />
        </div>
        <div>
          <label htmlFor="minStock">Stock minimum</label>
          <input type="number" id="minStock" />
        </div>
        <button>Valider</button>
      </form>
    </div>
  );
}

export default Ingredient;
