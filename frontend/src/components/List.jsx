export default function List({
  ingredient,
  isEditing,
  handleEdit,
  handleDelete,
}) {
  // state

  // comportement

  // affichage (render)
  return (
    <tr>
      <td>{ingredient.name}</td>
      <td>{ingredient.quantity}</td>
      <td>
        {isEditing ? (
          <button>Valider</button>
        ) : (
          <button onClick={() => handleEdit(ingredient.id)}>Modifier</button>
        )}
        <button onClick={() => handleDelete(ingredient.id)}>Supprimer</button>
      </td>
    </tr>
  );
}
