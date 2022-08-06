import { useState, useEffect } from 'react';
import axios from 'axios';
import OptionStock from './OptionStock';
import InputStock from './InputStock';
import ListIngredient from './ListIngredient';

export default function FormProduct({ getData }) {
  // state
  const [productName, setProductName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientSelected, setIngredientSelected] = useState('');
  const [ingredientProduct, setIngredientProduct] = useState([]);
  const [quantity, setQuantity] = useState(0.0);

  // comportement
  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    axios
      .get('http://localhost:4000/ingredients')
      .then(({ data }) => setIngredients(data));
  };

  const getIngredient = (id) => {
    return ingredients.find(
      (ingredient) => ingredient.id.toString() === id.toString()
    );
  };

  const handleName = (event) => {
    setProductName(event.target.value);
  };

  const handleSelect = (event) => {
    setIngredientSelected(event.target.value);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleDelete = (id) => {
    const copyIngredient = [...ingredientProduct];
    const fileterdIngredient = copyIngredient.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredientProduct(fileterdIngredient);
  };

  const ingredient = getIngredient(ingredientSelected);

  const handleAdd = () => {
    if (!ingredientSelected) return;

    const copyIngredient = [...ingredientProduct];

    const id = ingredientSelected;
    const name = ingredient.name;
    const qty = parseFloat(quantity);

    const newIngredient = {
      id,
      name,
      qty,
    };

    const currentIngredientAdded = copyIngredient.find(
      (ingredient) => ingredient.id === id
    );

    if (currentIngredientAdded) {
      const filteredIngredients = copyIngredient.filter(
        (ingredient) => ingredient.id !== id
      );
      setIngredientProduct([
        ...filteredIngredients,
        {
          id,
          name,
          qty: qty + currentIngredientAdded.qty,
        },
      ]);
    } else {
      setIngredientProduct([...copyIngredient, newIngredient]);
    }

    setIngredientSelected('');
    setQuantity(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!productName) {
      alert('Vous devez remplir le champ nom');
      return;
    }

    const data = {
      name: productName,
      ingredients: ingredientProduct,
    };

    axios.post('http://localhost:4000/products', data).then(() => {
      getData();
      setProductName('');
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
          placeholder="Nom du nouveau produit"
          value={productName}
          onChange={handleName}
        />
      </div>

      <div className="ingredient-container">
        <div className="ingredient-in">
          <label htmlFor="ingredient">Ingredient</label>
          <select
            id="ingredient"
            value={ingredientSelected}
            onChange={handleSelect}
          >
            <option value=""> --- </option>
            {ingredients.map((ingredient) => (
              <OptionStock key={ingredient.id} ingredient={ingredient} />
            ))}
          </select>
        </div>

        <div className="ingredient-in">
          <label htmlFor="quantity">Quantité</label>
          <InputStock
            id="quantity"
            value={quantity}
            onChange={handleQuantity}
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
              key={ingredient.id}
              ingredient={ingredient}
              onClick={() => handleDelete(ingredient.id)}
            />
          ))}
        </ul>
      </div>
      <button>Valider</button>
    </form>
  );
}
