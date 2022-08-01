export default function TableIn({ ingredient, handleEdit, handleDelete }) {
  // state

  // comportement

  // affichage (render)
  return (
    <tr>
      <td>{ingredient.name}</td>
      <td>{ingredient.quantity}</td>
      <td>
        <button onClick={() => handleEdit(ingredient.id)}>Modifier</button>
        <button onClick={() => handleDelete(ingredient.id)}>Supprimer</button>
      </td>
    </tr>
  );
}
