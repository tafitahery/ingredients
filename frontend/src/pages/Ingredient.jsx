import { useState, useEffect } from 'react';
import axios from 'axios';
import TableIn from '../components/TableIn';
import FormIn from '../components/FormIn';
import FormStock from '../components/FormStock';

function Ingredient() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [idToEdited, setIdToEdited] = useState('');

  // comportement
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:4000/ingredients')
      .then(({ data }) => setIngredients(data));
  };

  const getIngredient = (id) => {
    return ingredients.find(
      (ingredient) => ingredient.id.toString() === id.toString()
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Voulez vous supprimer cet ingredient ?')) {
      axios
        .delete('http://localhost:4000/ingredients/' + id)
        .then(() => getData());
    }
  };

  const handleEdit = (id) => {
    setIdToEdited(id);
  };

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
      <FormIn getData={getData} getIngredient={getIngredient} id={idToEdited} />
      <h2>Gestion du stock</h2>
      <FormStock
        ingredients={ingredients}
        getData={getData}
        getIngredient={getIngredient}
      />
    </div>
  );
}

export default Ingredient;
