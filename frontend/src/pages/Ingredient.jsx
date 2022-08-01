import { useState, useEffect } from 'react';
import axios from 'axios';
import List from '../components/List';
import Form from '../components/Form';

function Ingredient() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = (id) => {
    setIsEditing(true);
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
            <List
              key={ingredient.id}
              ingredient={ingredient}
              isEditing={isEditing}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
      <h2>Nouvel ingredient</h2>
      <Form getData={getData} />
    </div>
  );
}

export default Ingredient;
