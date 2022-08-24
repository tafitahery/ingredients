export default function InputStock({ id, name, value, onChange }) {
  // state

  // comportements

  // affichage (render)
  return (
    <input
      type="number"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
}
