import axios from 'axios';
import { useState, useEffect } from 'react';
import TableIn from '../components/TableIn';

function Out() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);

  // comportement
  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getIngredients = () => {
    axios
      .get('http://localhost:4000/ingredients')
      .then(({ data }) => setIngredients(data));
  };

  const getProducts = () => {
    axios
      .get('http://localhost:4000/products')
      .then(({ data }) => setProducts(data));
  };

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
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <TableIn key={ingredient.id} ingredient={ingredient} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Out;
