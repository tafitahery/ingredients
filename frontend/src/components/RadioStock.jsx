export default function RadioStock({ action, handleRadio, value }) {
  // state

  // comportements

  // affichage (render)
  return (
    <input
      type="radio"
      name="action"
      id={value}
      onChange={handleRadio}
      checked={action === value}
    />
  );
}
