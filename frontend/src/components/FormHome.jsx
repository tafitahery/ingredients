import axios from 'axios';
import { useState } from 'react';

import InputStock from '../components/InputStock';

export default function FormHome({
  products,
  ingredients,
  setIngredients,
  getOneElement,
  getAllElement,
}) {
  // state
  const [productSelected, setProductSelected] = useState('');
  const [quantity, setQuantity] = useState(0);

  // comportement
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

    axios
      .put('http://localhost:4000/products/' + product.id, {
        name: product.name,
        quantity: product.quantity + parseFloat(quantity),
        ingredients: product.ingredients,
      })
      .then(() => {
        getAllElement('http://localhost:4000/ingredients', setIngredients);
        setProductSelected('');
        setQuantity(0);
      });
  };

  // affichage (render)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom</label>
        <select id="name" value={productSelected} onChange={handleProduct}>
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
        <InputStock id="quantity" value={quantity} onChange={handleQuantity} />
      </div>
      <div>
        <button>Valider</button>
      </div>
    </form>
  );
}
