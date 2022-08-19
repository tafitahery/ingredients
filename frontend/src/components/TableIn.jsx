export default function TableIn({ ingredient, handleEdit, handleDelete }) {
  // state

  // comportement

  // affichage (render)
  return (
    <tr>
      <td>{ingredient.name}</td>
      <td>{ingredient.quantity}</td>
      {handleDelete && handleEdit && (
        <td>
          <button onClick={() => handleEdit(ingredient._id)}>Modifier</button>
          <button onClick={() => handleDelete(ingredient._id)}>
            Supprimer
          </button>
        </td>
      )}
    </tr>
  );
}
