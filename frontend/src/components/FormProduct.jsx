import { useState, useEffect } from 'react';
import axios from 'axios';
import OptionStock from './OptionStock';
import InputStock from './InputStock';

export default function FormProduct({ products, getData }) {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [ingredientSelected, setIngredientSelected] = useState('');
  const [ingredientProduct, setIngredientProduct] = useState([]);
  const [quantity, setQuantity] = useState(0.0);
  const [minStock, setMinStock] = useState(10);

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

  const handleSelect = (event) => {
    setIngredientSelected(event.target.value);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const ingredient = getIngredient(ingredientSelected);

  const handleAdd = () => {
    const copyIngredient = [...ingredientProduct];

    const idIngredient = ingredientSelected;
    const nameIngredient = ingredient.name;
    const ingredientQuantity = parseFloat(quantity);

    const newIngredient = {
      idIngredient,
      nameIngredient,
      ingredientQuantity,
    };

    const currentIngredientAdded = copyIngredient.find(
      (ingredient) => ingredient.idIngredient === idIngredient
    );

    if (currentIngredientAdded) {
      const filteredIngredients = copyIngredient.filter(
        (ingredient) => ingredient.idIngredient !== idIngredient
      );
      setIngredientProduct([
        ...filteredIngredients,
        {
          idIngredient,
          nameIngredient,
          ingredientQuantity:
            ingredientQuantity + currentIngredientAdded.ingredientQuantity,
        },
      ]);
    } else {
      setIngredientProduct([...copyIngredient, newIngredient]);
    }

    setIngredientSelected('');
    setQuantity(0);
  };

  const newQuantity = ingredient;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ingredientSelected) {
      alert('Vous devez remplir le champ nom');
      return;
    }

    const data = {
      name: ingredient.name,
      quantity: newQuantity ? newQuantity : ingredient.quantity,
      stockMin: parseFloat(minStock),
    };

    axios
      .put('http://localhost:4000/ingredients/' + ingredientSelected, data)
      .then(() => {
        getData();
        setIngredientSelected('');
        setQuantity(0.0);
        setMinStock(10);
      });
  };

  // affichage (render)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom du produit</label>
        <input type="text" id="name" placeholder="Nom du nouveau produit" />
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
          {ingredientProduct.map((elt) => (
            <li key={elt.idIngredient}>
              {elt.nameIngredient} ({elt.ingredientQuantity}) <button>X</button>
            </li>
          ))}
        </ul>
      </div>
      <button>Valider</button>
    </form>
  );
}
