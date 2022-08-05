import { useState, useEffect } from 'react';
import axios from 'axios';
import TableIn from '../components/TableIn';
import FormProduct from '../components/FormProduct';

function Product() {
  // state
  const [products, setProducts] = useState([]);
  // comportement
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:4000/products')
      .then(({ data }) => setProducts(data));
  };

  const handleDelete = (id) => {
    if (window.confirm('Voulez vous supprimer ce produit ?')) {
      axios
        .delete('http://localhost:4000/products/' + id)
        .then(() => getData());
    }
  };

  const handleEdit = (id) => {};

  // affichage (render)
  return (
    <div className="page">
      <h1>Produit</h1>
      <div className="container">
        <div className="item">
          <h2>Liste des produit</h2>
          <table className="tableIn">
            <thead>
              <tr>
                <th>Nom produit</th>
                <th>Liste des ingredients</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((ingredient) => (
                <TableIn
                  key={ingredient.id}
                  ingredient={ingredient}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="item">
          <h2>Gestion du stock</h2>
          <FormProduct products={products} getData={getData} />
        </div>
      </div>
    </div>
  );
}

export default Product;
