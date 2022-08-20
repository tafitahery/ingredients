export default function ListProduct({ product, handleEdit, handleDelete }) {
  // state

  // comportement

  // affichage (render)
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        <ul>
          {product.ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.name}({ingredient.qty})
            </li>
          ))}
        </ul>
      </td>
      <td>
        <button onClick={() => handleEdit(product._id)}>Modifier</button>
        <button onClick={() => handleDelete(product._id)}>Supprimer</button>
      </td>
    </tr>
  );
}
