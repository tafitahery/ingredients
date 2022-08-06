export default function ListIngredient({ ingredient, onClick }) {
  // state

  // comportement

  // affichage (render)
  return (
    <li key={ingredient.id}>
      {ingredient.name} ({ingredient.qty}){' '}
      <button type="button" className="delete" onClick={onClick}>
        X
      </button>
    </li>
  );
}
