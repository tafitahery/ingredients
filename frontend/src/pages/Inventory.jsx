import axios from 'axios';
import { useState, useEffect } from 'react';
import TableIn from '../components/TableIn';

function Inventory() {
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

  // affichage (render)
  return (
    <div className="item">
      <h1>Inventaire</h1>
      <table className="tableIn">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantite</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <TableIn key={ingredient.id} ingredient={ingredient} />
          ))}
        </tbody>
      </table>
      <button className="valid-btn">Exporter</button>
    </div>
  );
}

export default Inventory;