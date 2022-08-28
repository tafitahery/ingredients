export default function ListUser({ user, handleEdit, handleDelete }) {
  // state

  // comportement

  // affichage (render)
  return (
    <tr>
      <td>{user.userName}</td>
      <td>
        <button onClick={() => handleEdit(user._id)}>Modifier</button>{' '}
        <button onClick={() => handleDelete(user._id)}>Supprimer</button>
      </td>
    </tr>
  );
}
