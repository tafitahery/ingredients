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
      .get('http://localhost:4000/api/ingredients')
      .then(({ data }) => setIngredients(data));
  };

  // affichage (render)
  return (
    <div>
      <h1>Inventaire</h1>
      <div className="item">
        <table className="tableIn">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantite</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <TableIn key={ingredient._id} ingredient={ingredient} />
            ))}
          </tbody>
        </table>
        <button className="valid-btn">Exporter</button>
      </div>
    </div>
  );
}

export default Inventory;
