import axios from 'axios';
import { useState, useEffect } from 'react';
import TableIn from '../components/TableIn';

function Out() {
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
      <h1>Sortie</h1>
      <div className="container">
        <div className="item">
          <h2>Sortie de produit</h2>
        </div>
        <div className="item">
          <h2>Stocks des ingredients</h2>
          <table className="tableIn">
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
        </div>
      </div>
    </div>
  );
}

export default Out;
