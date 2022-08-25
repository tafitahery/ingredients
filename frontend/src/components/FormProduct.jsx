import { useState, useEffect } from 'react';
import axios from 'axios';
import OptionStock from './OptionStock';
import InputStock from './InputStock';
import ListIngredient from './ListIngredient';

export default function FormProduct({ getData }) {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [ingredientProduct, setIngredientProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    ingredientSelected: '',
    quantity: 0,
  });

  // comportement
  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    axios
      .get('http://localhost:4000/api/ingredients')
      .then(({ data }) => setIngredients(data));
  };

  const getIngredient = (id) => {
    return ingredients.find(
      (ingredient) => ingredient._id.toString() === id?.toString()
    );
  };

  const handleChange = (event) => {
    setNewProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDelete = (id) => {
    const copyIngredient = [...ingredientProduct];
    const fileterdIngredient = copyIngredient.filter(
      (ingredient) => ingredient._id !== id
    );
    setIngredientProduct(fileterdIngredient);
  };

  const ingredient = getIngredient(newProduct.ingredientSelected);

  const handleAdd = () => {
    if (!newProduct.ingredientSelected) return;

    const copyIngredient = [...ingredientProduct];

    const _id = newProduct.ingredientSelected;
    const name = ingredient.name;
    const qty = parseFloat(newProduct.quantity);

    const newIngredient = {
      _id,
      name,
      qty,
    };

    const currentIngredientAdded = copyIngredient.find(
      (ingredient) => ingredient._id === _id
    );

    if (currentIngredientAdded) {
      const filteredIngredients = copyIngredient.filter(
        (ingredient) => ingredient._id !== _id
      );
      setIngredientProduct([
        ...filteredIngredients,
        {
          _id,
          name,
          qty: qty + currentIngredientAdded.qty,
        },
      ]);
    } else {
      setIngredientProduct([...copyIngredient, newIngredient]);
    }

    setNewProduct((prev) => ({ ...prev, ingredientSelected: '', quantity: 0 }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newProduct.productName) {
      alert('Vous devez remplir le champ nom');
      return;
    }

    const data = {
      name: newProduct.productName,
      quantity: 0,
      ingredients: ingredientProduct,
    };

    axios.post('http://localhost:4000/api/products', data).then(() => {
      getData();
      setNewProduct((prev) => ({ ...prev, productName: '' }));
      setIngredientProduct([]);
    });
  };

  // affichage (render)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom du produit</label>
        <input
          type="text"
          id="name"
          name="productName"
          placeholder="Nom du nouveau produit"
          value={newProduct.productName}
          onChange={handleChange}
        />
      </div>

      <div className="ingredient-container">
        <div className="ingredient-in">
          <label htmlFor="ingredient">Ingredient</label>
          <select
            id="ingredient"
            name="ingredientSelected"
            value={newProduct.ingredientSelected}
            onChange={handleChange}
          >
            <option value=""> --- </option>
            {ingredients.map((ingredient) => (
              <OptionStock key={ingredient._id} ingredient={ingredient} />
            ))}
          </select>
        </div>

        <div className="ingredient-in">
          <label htmlFor="quantity">Quantité</label>
          <InputStock
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="add">Ajouter</label> <br />
          <button type="button" onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
      <div>
        <ul>
          {ingredientProduct.map((ingredient) => (
            <ListIngredient
              key={ingredient._id}
              ingredient={ingredient}
              onClick={() => handleDelete(ingredient._id)}
            />
          ))}
        </ul>
      </div>
      <button>Valider</button>
    </form>
  );
}
