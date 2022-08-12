import axios from 'axios';
import { useState, useEffect } from 'react';
import FormHome from '../components/FormHome';
import TableIn from '../components/TableIn';

function Home() {
  // state
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);

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

  // affichage (render)
  return (
    <div>
      <h1>Sortie</h1>
      <div className="container">
        <div className="item">
          <h2>Sortie de produit</h2>
          <FormHome
            products={products}
            ingredients={ingredients}
            setIngredients={setIngredients}
            getOneElement={getOneElement}
            getAllElement={getAllElement}
          />
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
