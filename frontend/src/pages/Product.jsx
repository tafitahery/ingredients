import { useState, useEffect } from 'react';
import axios from 'axios';
import FormProduct from '../components/FormProduct';
import ListProduct from '../components/ListProduct';

function Product() {
  // state
  const [products, setProducts] = useState([]);
  // comportement
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:4000/api/products')
      .then(({ data }) => setProducts(data));
  };

  const handleDelete = (id) => {
    if (window.confirm('Voulez vous supprimer ce produit ?')) {
      axios
        .delete('http://localhost:4000/api/products/' + id)
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
          <h2>Gestion du stock</h2>
          <FormProduct products={products} getData={getData} />
        </div>
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
              {products.map((product) => (
                <ListProduct
                  key={product._id}
                  product={product}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
