import axios from 'axios';
import { useState, useEffect } from 'react';
import InputStock from '../components/InputStock';
import TableIn from '../components/TableIn';

function Out() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState('');
  const [quantity, setQuantity] = useState(0);

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

  const handleProduct = (event) => {
    setProductSelected(event.target.value);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  // affichage (render)
  return (
    <div>
      <h1>Sortie</h1>
      <div className="container">
        <div className="item">
          <h2>Sortie de produit</h2>
          <form action="">
            <div>
              <label htmlFor="name">Nom</label>
              <select
                id="name"
                value={productSelected}
                onChange={handleProduct}
              >
                <option value=""> --- </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity">Quantite</label>
              <InputStock
                id="quantity"
                value={quantity}
                onChange={handleQuantity}
              />
            </div>
            <div>
              <button>Valider</button>
            </div>
          </form>
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
