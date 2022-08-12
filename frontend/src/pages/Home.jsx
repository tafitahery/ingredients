import axios from 'axios';
import { useState, useEffect } from 'react';
import InputStock from '../components/InputStock';
import TableIn from '../components/TableIn';

function Home() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState('');
  const [quantity, setQuantity] = useState(0);

  // comportement
  useEffect(() => {
    getAllElement('http://localhost:4000/ingredients', setIngredients);
  }, []);

  useEffect(() => {
    getAllElement('http://localhost:4000/products', setProducts);
  }, []);

  const getAllElement = (url, setter) => {
    axios.get(url).then(({ data }) => setter(data));
  };

  const getOneElement = (all, id) => {
    return all.find((one) => one.id.toString() === id.toString());
  };

  const handleProduct = (event) => {
    setProductSelected(event.target.value);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = getOneElement(products, productSelected);

    product.ingredients.map((ingredient) => {
      const currentIngredient = getOneElement(ingredients, ingredient.id);
      const data = {
        name: currentIngredient.name,
        quantity:
          currentIngredient.quantity - ingredient.qty * parseFloat(quantity),
        stockMin: currentIngredient.stockMin,
      };
      return axios.put(
        'http://localhost:4000/ingredients/' + ingredient.id,
        data
      );
    });
  };

  // affichage (render)
  return (
    <div>
      <h1>Sortie</h1>
      <div className="container">
        <div className="item">
          <h2>Sortie de produit</h2>
          <form onSubmit={handleSubmit}>
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

export default Home;
